const { pool } = require('./database');

const initializeDatabase = async () => {
  try {
    // Create schools table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    await pool.execute(createTableQuery);
    console.log('✅ Schools table initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database tables:', error.message);
    throw error;
  }
};

module.exports = { initializeDatabase };
