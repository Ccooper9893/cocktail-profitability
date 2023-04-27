const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {
};

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            defaultValue: 0,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'recipes',
        freezeTableName: true,
    },
);

module.exports = Recipe;

