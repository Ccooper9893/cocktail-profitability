const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: false,
            comment: 'Size in liters'
        },
        price: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
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
        modelName: 'products',
        freezeTableName: true,
    },
);

module.exports = Product;