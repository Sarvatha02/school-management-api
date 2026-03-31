# School Management API

## Overview
A RESTful API built with Node.js, Express.js, and MySQL that allows users to add schools and retrieve them sorted by proximity to a given location.

## Tech Stack
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MySQL | Database |
| express-validator | Input validation |

## API Endpoints

### 1. Add School
- **Endpoint:** POST /addSchool
- **Description:** Adds a new school to the database
- **Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurugram",
  "latitude": 28.4230,
  "longitude": 77.0454
}
```

### 2. List Schools
- **Endpoint:** GET /listSchools
- **Description:** Returns all schools sorted by distance from user location
- **Query Params:** latitude, longitude
- **Example:** `/listSchools?latitude=28.6139&longitude=77.2090`

## Live API
> Deployment link

## Postman Collection
Import `School_Management_API.postman_collection.json` to test all endpoints.
```


```
git add .
git commit -m "Update README"
git push