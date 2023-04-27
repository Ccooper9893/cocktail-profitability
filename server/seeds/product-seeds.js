const { Product } = require('../models');

const productData = [
    {
        product_name: 'Jack Daniels',
        size: 1.75,
        price: 25.43,
        user_id: 1,
    },
    {
        product_name: 'Chambord',
        size: .75,
        price: 14.76,
        user_id: 1,
    },
    {
        product_name: 'Titos',
        size: 1,
        price: 19.65,
        user_id: 1,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;