const { pool } = require('../config/database');
const { calculateDistance } = require('../utils/distance');

/**
 * POST /addSchool
 * Adds a new school to the database
 */
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Check for duplicate school name
    const [existing] = await pool.execute(
      'SELECT id FROM schools WHERE name = ?',
      [name.trim()]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'A school with this name already exists',
      });
    }

    // Insert new school
    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    return res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
  } catch (error) {
    console.error('Error in addSchool:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};

/**
 * GET /listSchools
 * Returns all schools sorted by proximity to the given coordinates
 */
const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    // Fetch all schools from DB
    const [schools] = await pool.execute(
      'SELECT id, name, address, latitude, longitude FROM schools'
    );

    if (schools.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No schools found in the database',
        data: [],
        total: 0,
      });
    }

    // Calculate distance for each school and attach it
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    // Sort by distance (nearest first)
    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: 'Schools retrieved and sorted by proximity',
      user_location: {
        latitude: userLat,
        longitude: userLon,
      },
      total: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error('Error in listSchools:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};

module.exports = { addSchool, listSchools };
