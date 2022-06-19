const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        foodName: String,
        imageUrl: String,
        effect: String,
        onHandQty: Number,
        ingredients:  [{
            ingredientDetail: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient'
            }],
            requiredQty: Number
        }]
    }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;