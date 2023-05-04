import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Query {
        me {
        _id
        username
        email
        products {
            _id
            name
            price
            size
        }
        recipes {
            _id
            name
            cost
            price
            ingredients {
            _id
            amount
            cost
            product {
                _id
                name
                price
                size
            }
            }
        }
        }
    }
`;

export const QUERY_PRODUCTS = gql`
    query GetProducts {
        getProducts {
        products {
            _id
            name
            price
            size
        }
        }
    }
`;

export const QUERY_RECIPES = gql`
    query GetRecipes {
        getRecipes {
        recipes {
            _id
            name
            price
            cost
            profit
            ingredients {
            _id
            amount
            cost
            product {
                _id
                name
                price
            }
            }
        }
        }
    }
`;
