// 1. Import Express
const express = require('express');

// 2. Create an Express Router
// A Router is like a "mini-app" that just handles routes
const router = express.Router();

// 3. Import the controller functions
const { 
  getAllProjects, 
  getProjectById 
} = require('../../controllers/projectController');

// --- 4. Define the Routes ---

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get a single project by its ID
// @access  Public
router.get('/:id', getProjectById);

// 5. Export the router
module.exports = router;