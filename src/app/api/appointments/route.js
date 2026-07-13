import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

const localFilePath = path.join(process.cwd(), 'data', 'appointments.json');

export async function GET() {
  try {
    const appointmentsCol = collection(db, 'appointments');
    const q = query(appointmentsCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const appointments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Failed to read appointments from Firestore, falling back to local file:", error);
    try {
      const localData = await fs.readFile(localFilePath, 'utf8');
      return NextResponse.json(JSON.parse(localData));
    } catch (localError) {
      console.error("Local file read failed:", localError);
      return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { patientName, email, phone, date, time, department } = body;
  if (!patientName || !email || !phone || !date || !time || !department) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newAppointment = {
    id: Date.now().toString(),
    patientName,
    email,
    phone,
    date,
    time,
    department,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  try {
    const appointmentsCol = collection(db, 'appointments');
    const docRef = await addDoc(appointmentsCol, newAppointment);
    newAppointment.id = docRef.id;
  } catch (error) {
    console.warn("Failed to save appointment to Firestore, executing local-only backup:", error);
  }

  // Always write to local JSON file as backup/fallback
  try {
    const localData = await fs.readFile(localFilePath, 'utf8');
    const appointments = JSON.parse(localData);
    appointments.unshift(newAppointment);
    await fs.writeFile(localFilePath, JSON.stringify(appointments, null, 2), 'utf8');
  } catch (localError) {
    console.error("Failed to write to local appointments file:", localError);
  }

  return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });
}
