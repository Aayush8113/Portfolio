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
🚀 Local Deployment

1. Clone the repository
Bash
git clone [https://github.com/aayush8113/Portfolio.git](https://github.com/aayush8113/Portfolio.git)

2. Backend Configuration
Navigate to the backend folder, install dependencies, and set up your environment:

Bash
cd portfolio-backend
npm install
# Create a .env file and add your MONGO_URI, EMAIL_USER, and EMAIL_PASS
npm start

3. Frontend Configuration
Navigate to the frontend folder and start the Vite development server:
Bash
cd portfolio-frontend
npm install
npm run dev

📬 Contact & Socials

GitHub: https://github.com/Aayush8113

LinkedIn: www.linkedin.com/in/aayushtripathi081103

Email: aayushtripathi.tech@gmail.com

Live Demo: Visit Portfolio

Built with precision using the MERN Stack.


***

**Would you like me to create the exact text for your `vercel.json` file to make sure your API routes work when you host it?**
