const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Founder = sequalize.define('founder', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,100]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['CEO', 'CTO', 'CFO','CMO']
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{timestamps:false});

module.exports = Founder;
