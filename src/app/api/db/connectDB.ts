import mongoose from 'mongoose';

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Use a global variable to store the cached connection
const globalWithCached = global as typeof globalThis & { _mongooseCached?: Cached };

if (!globalWithCached._mongooseCached) {
  globalWithCached._mongooseCached = { conn: null, promise: null };
}

const cached = globalWithCached._mongooseCached;

const connectDB = async (dbURI: string) => {
  if (cached.conn) {
    return cached.conn; // Fixed typo here
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(dbURI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;