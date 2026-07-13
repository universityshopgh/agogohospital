import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

const localFilePath = path.join(process.cwd(), 'data', 'enquiries.json');

export async function GET() {
  try {
    const enquiriesCol = collection(db, 'enquiries');
    const q = query(enquiriesCol, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const enquiries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Failed to read enquiries from Firestore, falling back to local file:", error);
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

  const { name, email, phone, subject, department, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }

  const newEnquiry = {
    id: Date.now().toString(),
    name,
    email,
    phone: phone || 'N/A',
    subject: subject || 'General Enquiry',
    department: department || 'General Administration',
    message,
    createdAt: new Date().toISOString()
  };

  try {
    const enquiriesCol = collection(db, 'enquiries');
    const docRef = await addDoc(enquiriesCol, newEnquiry);
    newEnquiry.id = docRef.id;
  } catch (error) {
    console.warn("Failed to save enquiry to Firestore, executing local-only backup:", error);
  }

  // Always write to local JSON file as backup/fallback
  try {
    const localData = await fs.readFile(localFilePath, 'utf8');
    const enquiries = JSON.parse(localData);
    enquiries.unshift(newEnquiry);
    await fs.writeFile(localFilePath, JSON.stringify(enquiries, null, 2), 'utf8');
  } catch (localError) {
    console.error("Failed to write to local enquiries file:", localError);
  }

  return NextResponse.json({ success: true, enquiry: newEnquiry }, { status: 201 });
}
