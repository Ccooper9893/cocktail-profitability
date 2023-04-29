const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server-express');
const { User, Product, Recipe, Ingredient } = require('../models');
const { signToken } = require('../utils/jwt-auth');

const resolvers = {

    Query: {
        me: async (_, __, context) => {

            if (context.user) {
                return await User.findById(context.user._id)
                .populate({ path: 'products', select: '-__v' })
                .populate({path: 'recipes',select: '-__v'})
                .populate({path: 'ingredients', select: '-__v'});
            };

            throw new AuthenticationError('You must be logged in to view content!');
        },
    },
    Mutation: {
        //Create user and sign token
        addUser: async (_, args,) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials. Please enter a valid username and password');
            }
            const validatePW = await user.isCorrectPassword(password);
            if (!validatePW) {
                throw new AuthenticationError('Incorrect credentials. Please enter a valid username and password');
            }

            const token = signToken(user);

            return { token, user };
        },
        addProduct: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to use this feature');
            }

            const product = await Product.create(args);
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { products: product } },
                { new: true },
            );

            return product;
        },
        addRecipe: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to use this feature');
            }
            const recipe = await Recipe.create(args);
            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { recipes: recipe } },
                { new: true },
            );
            return recipe;
        },
        addIngredient: async (_, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in to use this feature');
            }
            const ingredient = await Ingredient.create(args);
            await User.findByIdAndUpdate(context.user._id,
                { $addToSet: { ingredients: ingredient }},
            );
            return ingredient;
        }
    }
};

module.exports = resolvers;