import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';

const localFilePath = path.join(process.cwd(), 'data', 'blood-stock.json');

export async function GET() {
  try {
    const docRef = doc(db, 'blood_bank', 'inventory');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data().stocks);
    } else {
      // Fallback to local config data if Firestore document has not been initialized yet
      const localData = await fs.readFile(localFilePath, 'utf8');
      const stocks = JSON.parse(localData);
      
      try {
        // Try to initialize Firestore but don't crash if it fails
        await setDoc(docRef, { stocks });
      } catch (firestoreError) {
        console.warn("Failed to initialize Firestore stocks:", firestoreError);
      }
      return NextResponse.json(stocks);
    }
  } catch (error) {
    console.error("Failed to read blood stock from Firestore, falling back to local file:", error);
    try {
      const localData = await fs.readFile(localFilePath, 'utf8');
      return NextResponse.json(JSON.parse(localData));
    } catch (localError) {
      console.error("Local file read failed:", localError);
      return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data format, array expected" }, { status: 400 });
    }

    try {
      // Try to save to Firestore but don't block saving to local storage
      const docRef = doc(db, 'blood_bank', 'inventory');
      await setDoc(docRef, { stocks: body });
    } catch (firestoreError) {
      console.warn("Failed to write blood stock to Firestore:", firestoreError);
    }

    // Keep local json in sync as backup
    await fs.writeFile(localFilePath, JSON.stringify(body, null, 2), 'utf8');

    return NextResponse.json({ success: true, bloodStock: body }, { status: 200 });
  } catch (error) {
    console.error("Failed to save blood stock:", error);
    return NextResponse.json({ error: "Failed to save blood stock" }, { status: 500 });
  }
}
