// global includes // 
const User = require('./User');
const Product = require('./Product');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

User.hasMany(Recipe,{
    foreignKey: "user_id",
});

User.hasMany(Product,{
    foreignKey: "user_id",
});

Recipe.hasMany(Ingredient,{
    foreignKey: 'recipe_id',
});

Recipe.belongsTo(User,{
    foreignKey: 'user_id'
});

Ingredient.belongsTo(Recipe,{
    foreignKey: 'recipe_id'
});

Product.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports = {User, Product, Recipe, Ingredient};