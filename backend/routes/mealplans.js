const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Demo meal plans
const mealPlans = [
    {
        _id: 'plan-sahithi-001',
        title: 'Sahithi - Balanced Nutrition Plan',
        calories: 1800,
        clientId: {
            _id: 'client-sahithi',
            username: 'Sahithi'
        },
        dietitianId: {
            _id: 'dietitian-harini',
            username: 'Harini'
        },
        meals: {
            breakfast: 'Oatmeal with banana, almonds and 2 boiled eggs',
            lunch: 'Brown rice, dal, mixed vegetables and curd',
            dinner: '2 chapatis, paneer curry and fresh salad'
        },
        macros: {
            protein: 90,
            carbs: 220,
            fat: 60
        }
    },
    {
        _id: 'plan-sahithi-002',
        title: 'Sahithi - Healthy Dinner Plan',
        calories: 1700,
        clientId: {
            _id: 'client-sahithi',
            username: 'Sahithi'
        },
        dietitianId: {
            _id: 'dietitian-harini',
            username: 'Harini'
        },
        meals: {
            breakfast: 'Vegetable upma with fruit and curd',
            lunch: 'Rice, grilled chicken, vegetables and dal',
            dinner: '2 chapatis, vegetable curry and salad'
        },
        macros: {
            protein: 85,
            carbs: 205,
            fat: 55
        }
    }
];

// GET meal plans
router.get('/', authMiddleware, async (req, res) => {
    try {
        let plans = mealPlans;

        // Client sees only their plans
        if (req.user.role === 'client') {
            plans = mealPlans.filter(
                plan => plan.clientId._id === req.user.id
            );
        }

        // Dietitian sees plans they created
        else if (req.user.role === 'dietitian') {
            plans = mealPlans.filter(
                plan => plan.dietitianId._id === req.user.id
            );
        }

        // Admin sees all plans

        res.json(plans);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch meal plans'
        });
    }
});

// CREATE meal plan
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['dietitian', 'admin']),
    async (req, res) => {
        try {
            const newPlan = {
                _id: `plan-${Date.now()}`,
                title: req.body.title,
                calories: Number(req.body.calories),
                clientId: {
                    _id: req.body.clientId,
                    username: req.body.clientName || 'Client'
                },
                dietitianId: {
                    _id: req.user.id,
                    username: req.user.username || 'Dietitian'
                },
                meals: req.body.meals,
                macros: {
                    protein: Number(req.body.macros?.protein || 0),
                    carbs: Number(req.body.macros?.carbs || 0),
                    fat: Number(req.body.macros?.fat || 0)
                }
            };

            mealPlans.push(newPlan);

            res.json(newPlan);

        } catch (err) {
            console.error(err);
            res.status(400).json({
                error: 'Failed to create meal plan'
            });
        }
    }
);

module.exports = router;