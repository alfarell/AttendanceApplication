const Sequelize = require('sequelize');
const connection = require('../../config/dbConn');

const PersonalInfo = connection.define('personalInfo',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull:false,
        primaryKey: true
    },
    photo:{
        type:Sequelize.STRING,
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    birthPlace:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthDate:{
        type:Sequelize.DATEONLY,
        allowNull: false,
    },
    bloodType:{
        type:Sequelize.STRING
    },
},{
    freezeTableName: true,
    tableName: 'personal_info',
    paranoid: true,
    timestamps: true,
    underscored: true
});

module.exports = PersonalInfo;
