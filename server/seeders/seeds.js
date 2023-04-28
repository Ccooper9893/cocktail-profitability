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
    ]);

    console.log('Products seeded');

    await Recipe.deleteMany();

    const recipes = await Recipe.insertMany([
        {
            name: 'Margarita',
            cost: 2.56,
            price: 5,
            ingredients: [
                {
                    name: 'Hornitos',
                    product: products[0]._id,
                    amount: 1.5,
                    cost: .95
                },
                {
                    name: 'Triple Sec',
                    product: products[2]._id,
                    amount: .75,
                    cost: .50
                },
                {
                    name: 'Limeade',
                    product: products[3]._id,
                    amount: 3,
                    cost: .35
                },
            ],
        },
        {
            name: 'Long Island Iced Tea',
            cost: 2.34,
            price: 6,
            ingredients: [
                {
                    name: 'Amsterdam Gin',
                    amount: 1,
                    cost: .62
                },
                {
                    name: 'Elevate Vodka',
                    amount: 1,
                    cost: .45
                },
                {
                    name: 'Triple Sec',
                    amount: 1,
                    cost: .14
                },
                {
                    name: 'Limeade',
                    amount: 2,
                    cost: .23
                },
                {
                    name: 'Coke',
                    amount: 2,
                    cost: .27
                },
            ],
        },
    ]);

    console.log('Recipes seeded')

    await User.deleteMany();

    const users = User.insertMany([
        {
            username: 'Cody',
            password: 'Password123',
            email: 'cody@email.com',
            products: [products[0]._id, products[1]._id],
            recipes: [recipes[0]._id]
        },
        {
            username: 'User1',
            password: 'Password123',
            email: 'user@email.com',
            products: [products[2]._id, products[3]._id],
            recipes: [recipes[1]._id]
        }
    ]);

    console.log('Users seeded');

});
