const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        products: [Product]
        recipes: [Recipe]
        ingredients: [Ingredient]
    }

    type Product {
        _id: ID!
        name: String
        price: Float
        size: Float
    }

    type Ingredient {
        _id: ID!
        product: ID!
        amount: Float
      }
      
      type Recipe {
        _id: ID!
        name: String
        cost: Float
        price: Float
        ingredients: [Ingredient]
      }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        addProduct(name: String!, price: Float, size: Float): Product
        addIngredient(product: ID!, amount: Float!) : Ingredient
        addRecipe(name: String!, cost: Float!, price: Float!, ingredients: [ID!]): Recipe
    }
`;

module.exports = typeDefs;