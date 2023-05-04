import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const CREATE_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $price: Float, $size: Float) {
        addProduct(name: $name, price: $price, size: $size) {
            _id
            name
            price
            size
        }
    }
`;

export const ADD_RECIPE = gql`
mutation Mutation($name: String!, $ingredients: [IngredientInput]!, $price: Float) {
    addRecipe(name: $name, ingredients: $ingredients, price: $price) {
      _id
      cost
      name
      price
      profit
    }
  }
`;

export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($updateProductId: ID!, $price: Float!, $size: Float!) {
    updateProduct(id: $updateProductId, price: $price, size: $size) {
      _id
      name
      price
      size
    }
  }
`;

export const UPDATE_RECIPE = gql`
mutation UpdateRecipe($updateRecipeId: ID!, $name: String, $price: Float, $ingredients: [IngredientInput]) {
    updateRecipe(id: $updateRecipeId, name: $name, price: $price, ingredients: $ingredients) {
      _id
      cost
      name
      price
      profit
    }
  }
`;

export const DELETE_PRODUCT = gql`
mutation Mutation($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      _id
    }
  }
`;

export const DELETE_RECIPE = gql`
mutation DeleteRecipe($deleteRecipeId: ID!) {
    deleteRecipe(id: $deleteRecipeId) {
      _id
    }
  }
`;