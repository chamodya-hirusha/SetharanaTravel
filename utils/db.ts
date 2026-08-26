import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) throw new Error('MONGODB_URI missing');
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
