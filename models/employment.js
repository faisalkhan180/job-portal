const {connection} = require('../utils/connection');
const Sequelize = require('sequelize');
const {Applicant} = require('../models/applicant')


    const Employment = connection.define('employment', {
       
        name_of_Institute :{
            type : Sequelize.STRING,
            allowNull : false,
        },
        applicantId:{
            type : Sequelize.INTEGER,
            allowNull:false,
            references :{
                model : Applicant,
                key : "applicantId"
            }
        },
        designation :{
            type: Sequelize.STRING,
            allowNull: false,
        },
        bps : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        nature : {
            type : Sequelize.STRING,
            allowNull : false
        },
    }, 

    {timestamps : false});

    Applicant.hasMany(Employment, {
        foreignKey : "applicantId",
        onDelete : "restrict",
        onUpdate : "cascade"
    })

    module.exports  = Employment;
    

    