require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan"); // Logger
const compression = require("compression"); // Gzip compression for speed
const rateLimit = require("express-rate-limit"); // Security against spam

const connectDB = require("./config/db");

// Import Routes
const projectRoutes = require("./routes/api/projects");
const testimonialRoutes = require("./routes/api/testimonials");
const messageRoutes = require("./routes/api/messages");

const app = express();

// =============================================================
// 0. VERCEL & PROXY SETTINGS
// =============================================================
// Critical for Vercel deployment so rate limiters see the real user IP, 
// not the Vercel Load Balancer IP.
app.set('trust proxy', 1);

// =============================================================
// 1. MIDDLEWARE
// =============================================================
// Security Headers
app.use(helmet());

// Gzip Compression (Makes API responses faster)
app.use(compression());

// Logger
app.use(morgan("dev"));

// Body Parsers
app.use(express.json());

// SMART CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (
        origin.startsWith("http://localhost") || 
        origin.endsWith(".vercel.app") ||
        // Add your custom domain here if you have one later
        origin.includes("your-custom-domain.com") 
      ) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// RATE LIMITING (Anti-Spam / Anti-DDoS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { status: 429, error: "Too many requests, please try again later." }
});

// Apply rate limiter to all api routes
app.use("/api", limiter);

// =============================================================
// 2. DATABASE CONNECTION (Serverless Optimized)
// =============================================================
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Connection Failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// =============================================================
// 3. ROUTES
// =============================================================
app.get("/", (req, res) => {
  res.status(200).json({ status: "Active", message: "Portfolio API is running." });
});

app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/messages", messageRoutes);

// =============================================================
// 4. GLOBAL ERROR HANDLER
// =============================================================
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({ 
    success: false, 
    message: err.message || "Server Error",
    // Only show stack trace in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack 
  });
});

// =============================================================
// 5. SERVER START (Local Only)
// =============================================================
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

module.exports = app;