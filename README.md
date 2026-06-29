# Resume Builder

A full-stack web application for creating and managing professional resumes with real-time preview.

## Project Structure

```
resume-builder/
├── client/              # React frontend
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
│   └── package.json
├── server/             # Express backend
│   ├── routes/
│   │   └── resumes.js
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md
```

## Frontend Features

- **Personal Information Section**: Enter name, email, and phone
- **Professional Summary**: Add a brief professional overview
- **Skills Management**: Add and manage your skills
- **Real-time Preview**: See your resume update as you type

## Backend Features

- RESTful API for resume management
- CRUD operations for resumes
- In-memory storage (can be extended with a database)
- CORS enabled for frontend communication

## Setup Instructions

### Backend Setup

```bash
cd server
npm install
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/resumes` - Get all resumes
- `GET /api/resumes/:id` - Get specific resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Technologies Used

### Frontend
- React 18
- React Scripts
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- CORS
- dotenv

## Development

For development with auto-reload:

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm start
```

## Notes

- The backend uses in-memory storage. For production, integrate a database like MongoDB or PostgreSQL
- The frontend proxy is set to `http://localhost:5000` in package.json
- CORS is enabled to allow frontend-backend communication

## Future Enhancements

- Add experience and education sections
- PDF export functionality
- Template selection
- User authentication
- Database integration
- Advanced styling options
