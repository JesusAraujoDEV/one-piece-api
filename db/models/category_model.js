const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
}

class Category extends Model {
    static associate() {
        this.hasMany(models.Product,  {
            as: 'products',
            foreignKey: 'categoryId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timeStamps: false
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };