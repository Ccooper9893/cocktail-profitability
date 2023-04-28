const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    amount: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
});

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
    ingredients: [ingredientSchema],
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;