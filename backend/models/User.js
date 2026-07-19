const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'dietitian', 'admin'], default: 'client' },
    profile: {
        weight: { type: Number },
        height: { type: Number },
        goals: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);