const mongoose = require('mongoose');

const MealPlanSchema = new mongoose.Schema({
    title: { type: String, required: true },
    calories: { type: Number, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dietitianId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    meals: {
        breakfast: { type: String, required: true },
        lunch: { type: String, required: true },
        dinner: { type: String, required: true },
        snacks: { type: String }
    },
    macros: {
        protein: { type: Number },
        carbs: { type: Number },
        fat: { type: Number }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);