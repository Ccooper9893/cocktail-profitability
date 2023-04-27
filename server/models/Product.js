const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    size: {
        type: Schema.Types.Decimal128,
        required: true
    }
});

const Product = model('Product', productSchema);

module.exports = Product;
