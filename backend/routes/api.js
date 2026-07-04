const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const MealPlan = require('../models/MealPlan');

const router = express.Router();
const SECRET = 'my_super_secret_key'; // Keep this simple for now

// --- AUTHENTICATION ---
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, role });
    res.json(user);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid login' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET);
    res.json({ token, role: user.role, id: user._id });
});

// --- MEAL PLANS ---
router.get('/mealplans', async (req, res) => {
    // In a simple app, just return all plans (you can filter by token later)
    const plans = await MealPlan.find();
    res.json(plans);
});

router.post('/mealplans', async (req, res) => {
    const plan = await MealPlan.create(req.body);
    res.json(plan);
});

module.exports = router;