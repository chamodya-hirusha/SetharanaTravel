import { NextResponse } from 'next/server';
import connectToDatabase from '../../../utils/db';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    const state = mongoose.connection.readyState;
    
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (state === 1) {
      return NextResponse.json({ status: 'success', message: 'Successfully connected to MongoDB!' }, { status: 200 });
    } else {
      return NextResponse.json({ status: 'warning', message: `MongoDB connection state: ${state}` }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: 'Failed to connect to MongoDB', error: error.message }, { status: 500 });
  }
}
