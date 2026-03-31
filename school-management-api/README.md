# 🏫 School Management API

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. Supports adding schools and retrieving them sorted by proximity using the Haversine formula.

---

## 📋 Features

- ✅ Add new schools with name, address, latitude, and longitude
- ✅ List all schools sorted by proximity to a given location
- ✅ Input validation with detailed error messages
- ✅ Duplicate school detection
- ✅ Haversine formula for accurate geo-distance calculation
- ✅ Clean and consistent JSON API responses

---

## 🗂️ Project Structure

```
school-management-api/
├── src/
│   ├── config/
│   │   ├── database.js          # MySQL connection pool
│   │   └── init.js              # Table auto-creation on startup
│   ├── controllers/
│   │   └── schoolController.js  # Business logic for add/list
│   ├── middleware/
│   │   └── validation.js        # Input validation rules
│   ├── routes/
│   │   └── schoolRoutes.js      # Express route definitions
│   ├── utils/
│   │   └── distance.js          # Haversine distance formula
│   └── index.js                 # App entry point
├── database_setup.sql           # SQL script for DB setup
├── School_Management_API.postman_collection.json
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v14+
- MySQL 5.7+ or MySQL 8.0+
- npm

### 1. Clone & Install

```bash
# Navigate into the project
cd school-management-api

# Install dependencies
npm install
```

### 2. Set Up the Database

Run the provided SQL script in your MySQL client:

```sql
-- In MySQL Workbench, DBeaver, or mysql CLI:
source database_setup.sql
```

This will:
- Create the `school_management` database
- Create the `schools` table with the required schema
- Optionally seed sample data

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

### 4. Start the Server

```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

You should see:

```
✅ MySQL Database connected successfully
✅ Schools table initialized successfully

🚀 Server is running on port 3000
📍 Local: http://localhost:3000
```

---

## 📡 API Endpoints

### Base URL

```
http://localhost:3000
```

---

### `POST /addSchool`

Adds a new school to the database.

**Request Body (JSON):**

| Field     | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| name      | string | ✅       | School name (2-255 chars)      |
| address   | string | ✅       | Full address (5-500 chars)     |
| latitude  | float  | ✅       | Latitude (-90 to 90)           |
| longitude | float  | ✅       | Longitude (-180 to 180)        |

**Example Request:**

```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Delhi Public School",
    "address": "Sector 45, Gurugram, Haryana",
    "latitude": 28.4230,
    "longitude": 77.0454
  }'
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Gurugram, Haryana",
    "latitude": 28.423,
    "longitude": 77.0454
  }
}
```

**Validation Error (400):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "latitude", "message": "Latitude is required" }
  ]
}
```

---

### `GET /listSchools`

Returns all schools sorted by proximity to the given coordinates.

**Query Parameters:**

| Parameter | Type  | Required | Description              |
|-----------|-------|----------|--------------------------|
| latitude  | float | ✅       | User's latitude          |
| longitude | float | ✅       | User's longitude         |

**Example Request:**

```bash
curl "http://localhost:3000/listSchools?latitude=28.6139&longitude=77.2090"
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Schools retrieved and sorted by proximity",
  "user_location": {
    "latitude": 28.6139,
    "longitude": 77.209
  },
  "total": 2,
  "data": [
    {
      "id": 2,
      "name": "Kendriya Vidyalaya",
      "address": "Andrews Ganj, New Delhi",
      "latitude": 28.5733,
      "longitude": 77.2207,
      "distance_km": 4.49
    },
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Gurugram, Haryana",
      "latitude": 28.423,
      "longitude": 77.0454,
      "distance_km": 24.76
    }
  ]
}
```

---

## 📐 Distance Calculation

Schools are sorted using the **Haversine formula**, which calculates the great-circle distance between two points on Earth given their latitude/longitude. This gives accurate results accounting for Earth's curvature.

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
distance = R × c   (R = 6371 km)
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)  NOT NULL,
  address     VARCHAR(500)  NOT NULL,
  latitude    FLOAT         NOT NULL,
  longitude   FLOAT         NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🧪 Postman Collection

Import `School_Management_API.postman_collection.json` into Postman to test all endpoints with pre-built requests and documented expected responses.

**Steps:**
1. Open Postman → Import → Upload `School_Management_API.postman_collection.json`
2. Set the `base_url` variable to your server URL (default: `http://localhost:3000`)
3. Run the requests

---

## ☁️ Deployment

### Railway (Recommended — Free Tier Available)

1. Push to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Add a MySQL plugin
4. Set environment variables from `.env.example`
5. Deploy — Railway auto-detects Node.js

### Render

1. Push to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set `npm start` as the start command
4. Add MySQL via PlanetScale or Railway as external DB

### Environment Variables for Production

```env
PORT=3000
DB_HOST=<production-db-host>
DB_PORT=3306
DB_USER=<production-db-user>
DB_PASSWORD=<production-db-password>
DB_NAME=school_management
```

---

## 📦 Dependencies

| Package            | Purpose                        |
|--------------------|-------------------------------|
| express            | Web framework                  |
| mysql2             | MySQL driver with Promise API  |
| dotenv             | Environment variable loading   |
| express-validator  | Input validation               |
| cors               | Cross-Origin Resource Sharing  |
| nodemon (dev)      | Auto-restart during development|
