const { Schema, model } = require('mongoose');

const ingredientSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    amount: {
        type: Number,
        required: true,

    }
});

const Ingredient = model('Ingredient', ingredientSchema);


module.exports = Ingredient;