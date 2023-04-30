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
            price: 10.34,
            size: 10
        },
        {
            name: 'Coke',
            price: 80.45,
            size: 10
        },
        {
            name: 'Don Julio',
            price: 25.45,
            size: 1
        }
    ]);
    console.log('Products seeded');

    await Recipe.deleteMany();

    const recipes = await Recipe.insertMany([
        {
            name: 'House Margarita',
            cost: 2.56,
            price: 5,
            ingredients: [
                {
                    product: products[0]._id,
                    amount: 1.5
                },
                {
                    product: products[1]._id,
                    amount: 1.5
                },
            ],
        },
        {
            name: 'Top-shelf Margarita',
            cost: 3.45,
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
    ]);

    console.log('Recipes seeded')

    await User.deleteMany();

    const users = User.create(
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
