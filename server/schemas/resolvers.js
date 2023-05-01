const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { User, Product, Recipe } = require('../models');
const { signToken } = require('../utils/jwt-auth');

const resolvers = {

    Query: {
        me: async (_, __, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
                    .populate({ path: 'products', select: '-__v' })
                    .populate(
                        {
                            path: 'recipes',
                            select: '-__v',
                            populate: {
                                path: 'ingredients',
                                select: '-__v',
                                populate: { path: 'product', select: '-__v' }
                            }
                        }
                    )
            };
            throw new AuthenticationError('You must be logged in to view content!');
        },

        getRecipes: async (_, __, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
                    .populate(
                        {
                            path: 'recipes',
                            select: '-__v',
                            populate: {
                                path: 'ingredients',
                                select: '-__v',
                                populate: { path: 'product', select: '-__v' }
                            },
                        },
                    );
            };

            throw new AuthenticationError('You must be logged in to view content!');
        },

        getProducts: async (_, __, context) => {
            if (context.user) {
                return await User.findById(context.user._id).populate({ path: 'products', select: '-__v' });
            };

            throw new AuthenticationError('You must be logged in to view content!');
        }
    },

    Mutation: {
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
            if (context.user) {
                const product = await Product.create(args);
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { products: product } },
                    { new: true },
                );

                return product;
            };

            throw new AuthenticationError('You must be logged in to use this feature');
        },

        updateProduct: async (_, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                const isOwner = await user.isProductOwner(args.id);
                if (isOwner) {
                    return await Product.findByIdAndUpdate(args.id, { price: args.price, size: args.size }, { new: true });
                } else {
                    throw new ForbiddenError('Must be owner of product to update.');
                };
            };

            throw new AuthenticationError('You must be logged in to use this feature');
        },

        deleteProduct: async (_, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                const isOwner = await user.isProductOwner(args.id);
                if (isOwner) {
                    return await Product.findByIdAndDelete(args.id);
                } else {
                    throw new ForbiddenError('Must be owner of product to delete.');
                };
            };

            throw new AuthenticationError('You must be logged in to use this feature');
        },

        addRecipe: async (_, args, context) => {

            if (context.user) {
                const recipe = await Recipe.create(args);
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { recipes: recipe } },
                    { new: true },
                );
                return recipe;
            }

            throw new AuthenticationError('You must be logged in to use this feature');
        },

        updateRecipe: async (_, {id, name, cost, price, ingredients}, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                const isOwner = await user.isRecipeOwner(id);
                if (isOwner) {
                    return await Recipe.findByIdAndUpdate(id, {name, cost, price, ingredients}, {new: true});
                } else {
                    throw new ForbiddenError('Must be owner of product to update.');
                };
            };

            throw new AuthenticationError('You must be logged in to use this feature');
        },

        deleteRecipe: async (_, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                const isOwner = await user.isRecipeOwner(args.id);
                if (isOwner) {
                    return await Recipe.findByIdAndDelete(args.id);
                } else {
                    throw new ForbiddenError('Must be owner of product to delete.');
                };
            };

            throw new AuthenticationError('You must be logged in to use this feature');
        },
    }
};

module.exports = resolvers;