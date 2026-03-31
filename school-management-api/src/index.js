require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./config/init');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check Route ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Management API is running',
    version: '1.0.0',
    endpoints: {
      addSchool: 'POST /addSchool',
      listSchools: 'GET /listSchools?latitude={lat}&longitude={lon}',
    },
  });
});

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/', schoolRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
  try {
    await testConnection();
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📍 Local: http://localhost:${PORT}`);
      console.log(`\n📌 Available Endpoints:`);
      console.log(`   POST http://localhost:${PORT}/addSchool`);
      console.log(`   GET  http://localhost:${PORT}/listSchools?latitude=0&longitude=0\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
