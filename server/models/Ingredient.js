const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
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

const Ingredient = model('Ingredient', ingredientSchema);

module.exports = Ingredient;