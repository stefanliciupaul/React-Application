const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Company = sequalize.define('company', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },
    foundingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{timestamps:false});

module.exports = Company;
