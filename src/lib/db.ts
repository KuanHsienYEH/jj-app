import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("Please define DB_URL in .env.local");
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions).then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance;
    }).catch((err) => {
      console.error("Connection error", err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;