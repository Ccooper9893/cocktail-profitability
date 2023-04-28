const { AuthenticationError, UserInputError, ForbiddenError } = require('apollo-server-express');
const { User, Product, Recipe } = require('../models');
const { signToken } = require('../utils/jwt-auth');

const resolvers = {

    Query: {
        me: async (_, __, context) => {

            if (context.user) {
                return await User.findById(context.user._id).populate({ path: 'products', select: '-__v' }).populate({ path: 'recipes', select: '-__v' });
            };

            throw new AuthenticationError('You must be logged in to view content!');
        },
    },

    Mutation: {
        
    }

}