const express = require('express');
const MealPlan = require('../models/MealPlan');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get meal plans (Clients see their own, Dietitians see ones they created, Admins see all)
router.get('/', authMiddleware, async (req, res) => {
    try {
        let filter = {};
        if (req.user.role === 'client') {
            filter.clientId = req.user.id;
        } else if (req.user.role === 'dietitian') {
            filter.dietitianId = req.user.id;
        }
        const plans = await MealPlan.find(filter).populate('clientId', 'username').populate('dietitianId', 'username');
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch meal plans' });
    }
});

// Create meal plan (Dietitians and Admins only)
router.post('/', authMiddleware, roleMiddleware(['dietitian', 'admin']), async (req, res) => {
    try {
        const plan = await MealPlan.create({ ...req.body, dietitianId: req.user.id });
        res.json(plan);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create meal plan', details: err });
    }
});

module.exports = router;
