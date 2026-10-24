let connectDB = require('../config/db');
let app = require('../config/express');

/**
 * Vercel serverless entry point.
 *
 * The Express app is reused between invocations on a warm function, and
 * connectDB() caches the MongoDB connection instead of opening a new one
 * on every request.
 */
module.exports = async function (req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection failed:', error.message);

    // Vercel hands us raw Node req/res objects, not Express ones.
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        message: 'Database connection failed.',
      })
    );
    return;
  }

  return app(req, res);
};
