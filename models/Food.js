const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        foodName: String,
        imageUrl: String,
        effect: String,
        onHandQty: Number,
        ingredients:  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }]
    }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;