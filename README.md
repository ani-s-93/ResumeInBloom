# 🌸 ResumeBloom

An AI-powered resume builder that helps users create, manage, optimize, and export professional resumes through a modern full-stack web application.

## 🚀 Live Demo

🔗 https://resume-in-bloom-aib9xso1f-ani-s-93s-projects.vercel.app/

---

## ✨ Features

- 🔐 Secure user authentication using JWT
- 👤 User-specific dashboard with multiple resumes
- 📄 Create, edit and delete resumes
- 💾 Automatic resume saving
- 🤖 AI-generated professional summaries
- 🌸 AI-powered project description enhancement
- 📊 ATS resume analysis
- 📑 One-click PDF export
- 🎨 Clean and responsive user interface

---

## 📸 Screenshots

### Login Page
<img width="1898" height="907" alt="image" src="https://github.com/user-attachments/assets/2378bec9-3a6d-48e9-aeab-24d93d448a65" />


<img width="1896" height="911" alt="image" src="https://github.com/user-attachments/assets/7c9d0f07-d73e-482f-bec3-f2215da20c29" />


---

### Dashboard

![Dashboard](screenshots/dashboard.png)

---

### Resume Editor

![Editor](screenshots/editor.png)

---

### Resume Preview

![Preview](screenshots/preview.png)

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt.js

### AI

- OpenAI API

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## 📂 Folder Structure

```
ResumeBloom
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
│   └── package.json
│
├── screenshots
│
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/ani-s-93/ResumeBloom.git
```

Go into the project

```bash
cd ResumeBloom
```

Install frontend dependencies

```bash
cd client
npm install
npm start
```

Install backend dependencies

```bash
cd ../server
npm install
npm start
```

---

##  Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

---

##  Future Improvements

-  Resume tailoring based on job descriptions
-  AI cover letter generation
-  Interview preparation assistant
-  Multiple resume templates
-  Drag-and-drop resume sections
-  Cloud storage and sharing

---

##  Author

**Anika Sharma**

GitHub: https://github.com/ani-s-93

Email: anika.s0942@gmail.com

---

If you like this project, consider giving it a ⭐ on GitHub!
