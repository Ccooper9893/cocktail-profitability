const { Schema, model } = require('mongoose');
const Product = require('./Product');

const ingredientSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    amount: {
        type: Number,
        required: true,
        //Will be in ounces
    },
    cost: {
        type: Number,
    },
});

ingredientSchema.pre('save', async function(next) {
    const product = await Product.findById(this.product.toString());
    const pricePerOunce = Number.parseFloat(product.price/(product.size * 33.81)).toFixed(2);
    this.cost = Number.parseFloat(pricePerOunce * this.amount).toFixed(2);
    next();
});

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
    },
    price: {
        type: Number,
        default: 0,
    },
    profit: {
        type: Number,
    },
    ingredients: [ingredientSchema],
});

recipeSchema.pre('save', async function(next) {
    this.cost = this.ingredients.reduce((total, ingredient) => total + ingredient.cost, 0);
    this.profit = this.price - this.cost;
    next();
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;