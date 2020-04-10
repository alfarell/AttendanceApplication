const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const Staff = connection.define('staff',{
    googleId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
}, {
    freezeTableName: true,
    tableName: 'staff',
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Staff;