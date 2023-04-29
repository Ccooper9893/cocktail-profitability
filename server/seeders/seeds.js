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

    // await Ingredient.deleteMany();

    // const ingredients = await Ingredient.insertMany([
    //     {
    //         product: products[0]._id,
    //         amount: 1.5
    //     },
    //     {
    //         product: products[2]._id,
    //         amount: 0.75
    //     },
    //     {
    //         product: products[3]._id,
    //         amount: 2.5
    //     },
    // ])

    await Recipe.deleteMany();

    const recipes = await Recipe.insertMany([
        {
            name: 'Margarita',
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
    ]);

    console.log('Recipes seeded')

    await User.deleteMany();

    const users = User.create(
        {
            username: 'Cody',
            password: 'Password123',
            email: 'cody@email.com',
            products: [products[0]._id, products[1]._id],
            recipes: [recipes[0]._id],
        }
    );

    console.log('Users seeded');

});
