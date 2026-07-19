# NutriMetric 🍏

NutriMetric is a full-stack nutrition assistant app designed to help users manage meal plans, nutrition goals, and role-based access for clients and dietitians.

## Features ✨

- User authentication and secure login flow
- Role-based access for clients, dietitians, and admins
- Meal plan management with macro tracking and Recharts visualization
- Premium modern UI with glassmorphism design
- Clean and modular MERN-style project organization

## Tech Stack 🛠️

- **Frontend:** React.js (Vite), React Router, Recharts, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Security:** JWT Authentication, bcrypt.js

## Project Structure 📁

```text
NutriMetric/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── MealPlan.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── mealplans.js
│   │   └── users.js
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Auth.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── vite.config.js
```

## Prerequisites 📋

Make sure the following are installed on your machine:
- **Node.js** (v20 or higher recommended)
- **MongoDB** (You can run this locally or via Docker)

## Installation & Setup 🚀

To get the project running locally, open **three separate terminal windows**:

### 1. Database Setup
Start your local MongoDB instance. If you don't have MongoDB installed, you can quickly spin one up using Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```
*(If you have MongoDB natively installed, start it with `sudo systemctl start mongod` instead).*

### 2. Backend Setup
Navigate into the `backend` directory, install dependencies, and start the API server.
```bash
cd backend
npm install
npm start
```
*The backend API will run on `http://localhost:5000`.*

### 3. Frontend Setup
Navigate into the `frontend` directory, install dependencies, and start the React app.
```bash
cd frontend
npm install
npm run dev
```
*The frontend Vite server will run on `http://localhost:3000`.*

## How to Use 🧪

1. Make sure MongoDB, the backend server, and the frontend server are all running.
2. Open your browser and navigate to `http://localhost:3000`.
3. Use the authentication UI to register an account. You can select your role as `Client`, `Dietitian`, or `Admin`.
4. Log in and test out the dashboard and meal plan features!
