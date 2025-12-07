// 1. Import mongoose
const mongoose = require('mongoose');

// 2. Create the connectDB function
const connectDB = async () => {
  try {
    // 3. Try to connect to the database
    //    It uses the MONGODB_URI string from your .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // 4. If connection is successful, log it
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  
  } catch (error) {
    // 5. If connection fails, log the error and exit
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exits the process with a failure code
  }
};

// 6. Export the function so server.js can use it
module.exports = connectDB;