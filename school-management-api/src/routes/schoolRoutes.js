const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');
const {
  validateAddSchool,
  validateListSchools,
  handleValidationErrors,
} = require('../middleware/validation');

/**
 * @route   POST /addSchool
 * @desc    Add a new school to the database
 * @access  Public
 * @body    { name, address, latitude, longitude }
 */
router.post('/addSchool', validateAddSchool, handleValidationErrors, addSchool);

/**
 * @route   GET /listSchools
 * @desc    Get all schools sorted by proximity to given coordinates
 * @access  Public
 * @query   latitude, longitude
 */
router.get('/listSchools', validateListSchools, handleValidationErrors, listSchools);

module.exports = router;
