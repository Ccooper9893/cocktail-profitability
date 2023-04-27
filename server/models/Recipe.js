const { Schema, model } = require('mongoose');

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
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
    }],
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;