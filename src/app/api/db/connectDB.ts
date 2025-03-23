import mongoose from "mongoose";


const dbURI = process.env.DB_URI

if (!dbURI) {
  throw new Error('Defina a URL da DB')
}

let cached = global.mongoose


if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const connectDB = async () => {
  if (cached.conn) {
    return cached.coon
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }
    
    cached.promise = mongoose.connect(dbURI, opts).then((mongoose) => {return mongoose})
  }

  cached.conn = await cached.promise
  return cached.conn
};

export default connectDB;
