# NutriMetric 🍏

NutriMetric is a full-stack nutrition assistant app designed to help users manage meal plans, nutrition goals, and role-based access for clients and dietitians.

## Features ✨

- User authentication and secure login flow
- Role-based access for clients and dietitians
- Meal plan management structure for future CRUD features
- Clean and modular MERN-style project organization

## Tech Stack 🛠️

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Security: JWT, bcrypt.js

## Project Structure 📁

```text
NutriMetric/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── MealPlan.js
│   ├── routes/
│   │   └── api.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Auth.js
        │   └── Dashboard.js
        └── App.js
```

## Prerequisites 📋

Make sure the following are installed:

- Node.js (v16 or higher)
- MongoDB running locally on port 27017

## Installation & Setup 🚀

### 1. Backend Setup

```bash
cd backend
npm install express mongoose cors bcryptjs jsonwebtoken
node server.js
```

The backend will run on `http://localhost:5000`.

### 2. Frontend Setup

```bash
cd frontend
npm install axios react react-dom
npm start
```

The frontend will run on `http://localhost:3000`.

## How to Use 🧪

1. Start the backend server.
2. Start the frontend application.
3. Open the app in your browser.
4. Use the authentication UI to register or log in.

## Future Enhancements 🚀

- Add full CRUD support for meal plans
- Implement dietitian-to-client assignment flows
- Add charts for nutritional progress tracking
- Connect to MongoDB Atlas for cloud hosting
