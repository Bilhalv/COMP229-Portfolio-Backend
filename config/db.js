let mongoose = require('mongoose');
require('dotenv').config({ quiet: true });

let connectionPromise = null;

/**
 * Connect to MongoDB once and reuse the connection.
 *
 * Safe to call on every request: warm serverless invocations reuse the open
 * connection, and concurrent cold starts share a single connect promise
 * instead of opening one connection per request.
 */
module.exports = async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectionPromise) {
    const uri = process.env.MONGODB_URI || process.env.ATLASDB;

    if (!uri) {
      throw new Error(
        'MongoDB connection string missing. Set MONGODB_URI (or ATLASDB) in your environment.'
      );
    }

    connectionPromise = mongoose
      .connect(uri)
      .then(function (instance) {
        console.log('You successfully connected to MongoDB!');
        return instance;
      })
      .catch(function (error) {
        // Do not cache a failed attempt so the next call can retry.
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};
