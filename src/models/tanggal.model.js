const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const Tanggal = connection.define('tanggal',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal:{
        type:Sequelize.DATEONLY,
    }
}, {
    freezeTableName: true,
    tableName: 'tanggal',
    timestamps: false,
    paranoid: false,
    underscored: true,
});

module.exports = Tanggal;