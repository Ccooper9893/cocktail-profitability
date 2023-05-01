const db = require('../config/connection');
const { User, Product, Recipe } = require('../models');

db.once('open', async () => {

    await Product.deleteMany();

    const products = await Product.insertMany([
        {
            name: 'Hornitos',
            price: 25.45,
            size: 1
        },
        {
            name: 'Jack Daniels',
            price: 18.45,
            size: 1
        },
        {
            name: 'Triple Sec',
            price: 13.00,
            size: 1
        },
        {
            name: 'Limemade',
            price: 5.48,
            size: 10
        },
        {
            name: 'Coke',
            price: 2.45,
            size: 1
        },
        {
            name: 'Don Julio',
            price: 25.45,
            size: 1
        },
        {
            name: 'Bombay Gin',
            price: 23.45,
            size: 1,
        },
        {
            name: 'Tonic Water',
            price: 2.13,
            size: 1,
        },

        
    ]);

    console.log('Products seeded');

    await Recipe.deleteMany();

    const recipes = await Recipe.insertMany([
        {
            name: 'House Margarita',
            price: 5,
            ingredients: [
                {
                    product: products[0]._id,
                    amount: 1.5
                },
                {
                    product: products[3]._id,
                    amount: 1.5
                },
                {
                    product: products[2]._id,
                    amount: 0.75
                },
            ],
        },
        {
            name: 'Top-shelf Margarita',
            price: 8,
            ingredients: [
                {
                    product: products[5]._id,
                    amount: 1.5
                },
                {
                    product: products[2]._id,
                    amount: 0.75
                },
                {
                    product: products[3]._id,
                    amount: 1.5
                },
            ],
        },
        {
            name: 'Jack & Coke',
            price: 5,
            ingredients: [
                {
                    product: products[1]._id,
                    amount: 1.5
                },
                {
                    product: products[4]._id,
                    amount: 3
                },
            ],
        },
        {
            name: 'Gin & Tonic',
            price: 5,
            ingredients: [
                {
                    product: products[6]._id,
                    amount: 1.5
                },
                {
                    product: products[7]._id,
                    amount: 3
                },
            ],
        },
    ]);

    console.log('Recipes seeded')

    await User.deleteMany();

    await User.create(
        {
            username: 'Cody',
            password: 'password123',
            email: 'cody@email.com',
            products: [products[0]._id, products[1]._id, products[2]._id, products[3]._id, products[4]._id, products[5]._id],
            recipes: [recipes[0]._id, recipes[1]._id],
        }
    );

    console.log('Users seeded');

});
