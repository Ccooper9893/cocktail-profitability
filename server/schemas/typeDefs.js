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
        price: Decimal
        size: Decimal
    }

    type Ingredient {
        _id: ID!
        name: String
        product: [Product]
        amount: Decimal
        cost: Decimal
      }
      
      type Recipe {
        _id: ID!
        name: String
        cost: Decimal
        price: Decimal
        ingredients: [Ingredient]
      }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!, merchant: Boolean, business_name: String, business_description: String, phone_number: String, image: String, address: String): Auth
        loginUser(email: String!, password: String!): Auth
        addProduct(name: String, product_description: String, category: String, stock: Int, price: Float, image: String): Product
        removeProduct(id: ID!): Product
        addPurchase(products: [ID]!) : Purchase
        updateStock(stock: Int, id: ID!) : Product
        updateProduct(price: Float, stock: Int, id: ID!) : Product
        deleteProduct(id: ID!) : Product
    }
`;

module.exports = typeDefs;