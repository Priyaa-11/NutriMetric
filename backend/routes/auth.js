const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'my_super_secret_key';

// Demo users — no MongoDB required
const users = [
    {
        id: 'client-sahithi',
        username: 'Sahithi',
        passwordHash: bcrypt.hashSync('Sahithi00!@', 10),
        role: 'client'
    },
    {
        id: 'dietitian-harini',
        username: 'Harini',
        passwordHash: bcrypt.hashSync('Harini00!@', 10),
        role: 'dietitian'
    },
    {
        id: 'admin-anusha',
        username: 'Anusha',
        passwordHash: bcrypt.hashSync('Anusha00!@', 10),
        role: 'admin'
    }
];

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(
            u => u.username.toLowerCase() === String(username).toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!validPassword) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            SECRET,
            { expiresIn: '1d' }
        );

        res.json({
            token,
            role: user.role,
            id: user.id,
            username: user.username
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            error: 'Login failed'
        });
    }
});

// REGISTER
router.post('/register', async (req, res) => {
    res.status(400).json({
        error: 'Registration is disabled for the demo. Use the provided accounts.'
    });
});

module.exports = router;