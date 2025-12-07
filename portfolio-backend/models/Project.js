// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Get the Schema object from mongoose
const Schema = mongoose.Schema;

// 3. Define the Project Schema (the blueprint)
const projectSchema = new Schema(
  {
    // A simple 'title' field
    title: {
      type: String,
      required: true, // This field is mandatory
    },
    // A simple 'description' field
    description: {
      type: String,
      required: true,
    },
    // The main image for the project card
    imageUrl: {
      type: String,
      required: true,
    },
    // A list of tags (e.g., "React", "Node.js", "Tailwind")
    tags: {
      type: [String], // This defines an array of strings
      required: false, // This field is optional
    },
    // Link to the live project
    liveLink: {
      type: String,
      required: false,
    },
    // Link to the source code
    githubLink: {
      type: String,
      required: false,
    },
    // --- Fields for the "Project Detail" page ---
    // These fields will be used when a user clicks "View More"
    challenge: {
      type: String,
      required: false,
    },
    solution: {
      type: String,
      required: false,
    },
    // (You could add more fields here, like 'processImages', 'learnings', etc.)
  },
  {
    // 4. Add timestamps
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// 5. Create and export the Model
// Mongoose will automatically create a collection called "projects"
// (plural and lowercase) based on the name "Project"
module.exports = mongoose.model('Project', projectSchema);