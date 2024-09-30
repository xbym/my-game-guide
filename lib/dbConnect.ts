import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: CachedConnection | undefined;
}

// 使用更具体的类型而不是 any
const cached: { mongooseConnection: CachedConnection } = global as unknown as { mongooseConnection: CachedConnection };

if (!cached.mongooseConnection) {
  cached.mongooseConnection = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.mongooseConnection.conn) {
    return cached.mongooseConnection.conn;
  }

  if (!cached.mongooseConnection.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.mongooseConnection.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      cached.mongooseConnection.conn = mongooseInstance;
      return mongooseInstance;
    });
  }

  try {
    const mongooseInstance = await cached.mongooseConnection.promise;
    if (!mongooseInstance) {
      throw new Error('Failed to connect to MongoDB');
    }
    return mongooseInstance;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;