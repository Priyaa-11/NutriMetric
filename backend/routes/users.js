const express = require('express');
const User = require('../models/User');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authMiddleware, roleMiddleware(['admin', 'dietitian']), async (req, res) => {
    try {
        // Dietitians can only see clients, Admins can see all
        const filter = req.user.role === 'dietitian' ? { role: 'client' } : {};
        const users = await User.find(filter, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get user profile
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        res.json(user);
    } catch (err) {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        // Ensure user can only update their own profile, unless admin
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { profile: req.body.profile }, { new: true, select: '-password' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;
