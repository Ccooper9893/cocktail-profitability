const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ingredient extends Model {
};

Ingredient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: false
        },
        recipe_id: {
            type: DataTypes.INTEGER,  
            allowNull: false,
            references: {
                model: 'recipes', 
                key: 'id', 
           }, 
        },
    },
    {
        sequelize,
        timestamps: false, 
        modelName: 'ingredients',
        freezeTableName: true, 
    },
);

module.exports = Ingredient;