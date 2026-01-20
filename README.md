# 🚀 Full-Stack MERN Portfolio

A professional, high-performance multipage portfolio application. This project features a React frontend styled with Tailwind CSS and a Node.js/Express backend integrated with MongoDB Atlas for dynamic content management.

## 📸 Project Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/883ddaa5-e611-4b42-bff4-f3848a8a739f" width="100%" alt="Portfolio Preview" />
</p>

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite, Context API
- **Backend:** Node.js, Express.js, Vercel Serverless
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Assets:** Optimized WebP imagery (CoreControl, Dineease, SmartSync, etc.)

---

## ✨ Key Features

- **Full-Stack Integration**: Dynamic projects and testimonials are fetched directly from MongoDB Atlas.
- **Multipage Architecture**: Dedicated pages for Home, About, Work, Resume, and Contact.
- **Interactive Experience**: Custom pre-loader, scroll animations (Framer Motion), and Sound Context.
- **Automated Contact Form**: Backend-driven message handling with email notifications.
- **Responsive & Optimized**: Mobile-first design with skeleton loaders for elite UX.

---

## 📂 Project Structure

```text
├── portfolio-backend/       # Express API & MongoDB Models
│   ├── api/                 # Entry point for Vercel (index.js)
│   ├── controllers/         # Logic (contact, message, project, testimonial)
│   ├── models/              # Mongoose Schemas (Message, Project, Testimonial)
│   ├── routes/              # API Route definitions
│   └── utils/               # Email & helper utilities (sendEmail.js)
└── portfolio-frontend/      # React.js Frontend
    ├── src/components/      # UI Components (Hero, Navbar, ProjectCard)
    ├── src/pages/           # Page views (HomePage, WorkPage, ResumePage)
    ├── src/context/         # SoundContext for global state
    └── public/projects/     # High-quality WebP project assets
```
🚀 Getting Started: Portfolio Setup
Follow these steps to get the development environment running on your local machine.

1. Clone the Repository
First, bring the project to your local machine using Git:

Bash

git clone https://github.com/aayush8113/Portfolio.git
cd Portfolio
2. Backend Configuration (Node.js/Express)
The backend handles your data and email services.

Navigate to the directory:

Bash

cd portfolio-backend
Install dependencies:

Bash

npm install

Environment Variables: Create a .env file in the portfolio-backend root folder and add the following:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
Start the server:

Bash

npm start
Note: The backend usually runs on http://localhost:5000.

3. Frontend Configuration (React + Vite)
The frontend provides the user interface.

Navigate to the directory:

Bash

cd ../portfolio-frontend
Install dependencies:

Bash

npm install

Launch the development server:

Bash

npm run dev

Tip: Open http://localhost:5173 in your browser to view your portfolio.

📬 Contact & Socials

GitHub: https://github.com/Aayush8113

LinkedIn: www.linkedin.com/in/aayushtripathi081103

Email: aayushtripathi.tech@gmail.com

Live Demo: Visit Portfolio

Built with precision using the MERN Stack.


***
