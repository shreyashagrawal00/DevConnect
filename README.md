# DevConnect - Fullstack Developer Blog Platform

A premium, full-stack blog platform built for developers to share knowledge. This project is designed with a focus on clean architecture, security, and modern UI/UX.

## 🚀 Features

- **Authentication**: Secure JWT-based auth with password hashing (bcrypt).
- **REST API**: Cleanly structured endpoints for users and posts.
- **Protected Routes**: Only authenticated users can create or edit posts.
- **Premium UI**: Dark mode, glassmorphism, and responsive design built with React.
- **State Management**: React Context API for global authentication state.

## 🏗️ Project Structure

```
DevConnect/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Auth & Error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # Utilities (JWT gen)
│   └── server.js        # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # Auth state management
    │   ├── pages/       # Route-level components
    │   ├── App.jsx      # Main router
    │   └── index.css    # Premium global styles
    └── package.json
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React (Vite), Axios, Lucide-React
- **Security**: JWT, BcryptJS, CORS

## 🏃 How to Run

### 1. Backend
1. Open a terminal in `backend/`
2. Run `npm install`
3. Create a `.env` file (one has been provided)
4. Run `npm run dev` (or `node server.js`)

### 2. Frontend
1. Open a terminal in `frontend/`
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`

## 🧠 Lessons for Students

- **Separation of Concerns**: Logic is separated into controllers, routes, and models.
- **Middleware**: Used for centralized error handling and route protection.
- **References**: Posts reference Users in MongoDB instead of embedding for better scalability.
- **JWT**: Stateless authentication that works perfectly for REST APIs.
