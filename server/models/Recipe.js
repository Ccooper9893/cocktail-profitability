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
        type: Schema.Types.Decimal128,
        required: true,
    },
    cost: {
        type: Schema.Types.Decimal128,
        required: true,
    },
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    ingredients: [ingredientSchema],
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;