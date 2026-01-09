const Project = require('../models/Project');
const mongoose = require('mongoose');

// --- 1. GET ALL PROJECTS (Optimized for List View) ---
const getAllProjects = async (req, res, next) => {
  try {
    // PERFORMANCE: .lean() converts Mongoose Docs to plain JS objects (Much faster)
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      // Optional: If you have a 'longDescription' field, exclude it here to save bandwidth
      // .select('-longDescription') 
      .lean();

    // CACHING: Tell the browser/Vercel Edge to cache this response for 5 minutes (300s)
    // This reduces DB calls significantly.
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

    res.status(200).json(projects);

  } catch (error) {
    // Pass to the Global Error Handler we created in server.js
    next(error);
  }
};

// --- 2. GET SINGLE PROJECT (With Validation) ---
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // VALIDATION: Prevent app crash if ID is invalid format (e.g., "123")
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Invalid Project ID' });
    }

    const project = await Project.findById(id).lean();

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // No cache for details page (or shorter cache) to ensure fresh data
    res.status(200).json(project);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
};