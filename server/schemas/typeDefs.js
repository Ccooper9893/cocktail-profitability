const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        products: [Product]
        recipes: [Recipe]
    }

    type Product {
        _id: ID!
        name: String
        price: Float
        size: Float
    }

    type Ingredient {
        _id: ID!
        product: Product
        amount: Float
        cost: Float
    }
      
    type Recipe {
        _id: ID!
        name: String
        cost: Float
        price: Float
        ingredients: [Ingredient]
    }

    input IngredientInput {
        product: ID!
        amount: Float
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        getRecipes: User
        getProducts: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth

        addProduct(name: String!, price: Float, size: Float): Product
        updateProduct(id: ID!, price: Float!, size: Float!): Product
        deleteProduct(id: ID!): Product

        addRecipe(name: String!, price: Float!, ingredients: [IngredientInput]!): Recipe
        updateRecipe(id: ID!, name: String, price: Float, ingredients: [IngredientInput]): Recipe
        deleteRecipe(id: ID!): Recipe
    }
`;

module.exports = typeDefs;