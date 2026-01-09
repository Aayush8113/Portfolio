const mongoose = require('mongoose');

// Vercel Serverless behavior: Define a global cache to prevent 
// connecting to the DB on every single request.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // 1. If we have a cached connection, use it.
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If no connection promise exists, create a new one.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering for faster serverless errors
    };

    // Strict Query prevents fields not in your schema from being saved silently
    mongoose.set('strictQuery', true);

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ New MongoDB Connection Established');
      return mongoose;
    });
  }

  // 3. Await the promise and save the connection
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;