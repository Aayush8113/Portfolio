// 1. Import the Project model
const Project = require('../models/Project');

// --- 2. Controller Function: GET all projects ---
// This function will be triggered by the route GET /api/projects
const getAllProjects = async (req, res) => {
  try {
    // 3. Find all projects in the database
    // We use .sort({ createdAt: -1 }) to get the newest projects first
const projects = await Project.find().sort({ createdAt: -1 });

    // 4. Send the projects back as a JSON response
    res.json(projects);

  } catch (error) {
    // 5. If anything goes wrong, send a server error
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 6. Controller Function: GET a single project by ID ---
// This function will be triggered by the route GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    // 7. Find one project in the database using its 'id'
    // The id comes from the URL (req.params.id)
    const project = await Project.findById(req.params.id);

    // 8. If no project is found, send a 404 (Not Found) error
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 9. Send the single project back as a JSON response
    res.json(project);

  } catch (error) {
    // 10. If the ID is badly formatted or another error occurs, send a server error
    console.error('Error fetching project by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- 11. Export the functions ---
module.exports = {
  getAllProjects,
  getProjectById,
};