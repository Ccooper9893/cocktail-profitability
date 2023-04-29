const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
        }
    ],
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;