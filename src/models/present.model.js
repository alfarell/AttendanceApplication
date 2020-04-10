const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const Present = connection.define('present', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
    },
    tanggal:{
        type: Sequelize.DATEONLY,
        allowNull: false 
    },
    jamMasuk:{
        type:Sequelize.TIME,
        allowNull: false 
    },
    jamKeluar:{
        type:Sequelize.TIME,
    },
    location:{
        type:Sequelize.STRING
    }
}, {
    freezeTableName: true,
    tableName: 'present',
    paranoid: false,
    timestamps:false,
    underscored: true
});

module.exports = Present;
