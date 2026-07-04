const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
    title: String,
    calories: Number,
    clientId: String,
    dietitianId: String
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);