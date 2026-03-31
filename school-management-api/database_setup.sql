-- ============================================================
--  School Management API - Database Setup Script
--  Run this script in your MySQL client to set up the database
-- ============================================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS school_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Step 2: Use the database
USE school_management;

-- Step 3: Create the schools table
CREATE TABLE IF NOT EXISTS schools (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT         NOT NULL,
  longitude   FLOAT         NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Step 4: (Optional) Seed some sample data for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School', 'Sector 45, Gurugram, Haryana', 28.4230, 77.0454),
  ('Kendriya Vidyalaya', 'Andrews Ganj, New Delhi', 28.5733, 77.2207),
  ('Ryan International School', 'Vasant Kunj, New Delhi', 28.5218, 77.1578),
  ('St. Columba School', 'Ashok Place, New Delhi', 28.6364, 77.2117),
  ('Modern School', 'Barakhamba Road, New Delhi', 28.6274, 77.2297);

-- Verify
SELECT * FROM schools;
