const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Demo users
const users = [
    {
        _id: 'client-sahithi',
        username: 'Sahithi',
        role: 'client',
        profile: {}
    },
    {
        _id: 'dietitian-harini',
        username: 'Harini',
        role: 'dietitian',
        profile: {}
    },
    {
        _id: 'admin-anusha',
        username: 'Anusha',
        role: 'admin',
        profile: {}
    }
];

// Get users
router.get(
    '/',
    authMiddleware,
    roleMiddleware(['admin', 'dietitian']),
    async (req, res) => {
        try {
            // Dietitians see only clients
            if (req.user.role === 'dietitian') {
                return res.json(
                    users.filter(user => user.role === 'client')
                );
            }

            // Admins see everyone
            res.json(users);

        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: 'Failed to fetch users'
            });
        }
    }
);

// Get user profile
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = users.find(u => u._id === req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json(user);

    } catch (err) {
        res.status(404).json({
            error: 'User not found'
        });
    }
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (
            req.user.id !== req.params.id &&
            req.user.role !== 'admin'
        ) {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const user = users.find(u => u._id === req.params.id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        user.profile = req.body.profile || {};

        res.json(user);

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: 'Failed to update profile'
        });
    }
});

module.exports = router;