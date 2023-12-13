const Sequelize = require('sequelize');
const {connection} = require('../utils/connection')
const {Applicant} = require('../models/applicant');
    const FormalTrainning = connection.define('formal_training',{
        institute_name :{
            type : Sequelize.STRING,
            allowNull : false
        },
        applicantId :{
            type : Sequelize.INTEGER,
            allowNull: false,
            Reference:{
                model : Applicant,
                key : "applicantId"
            }
        },
        training_type :{
            type: Sequelize.STRING,
            allowNull : false
        },
        starting_date: {
            type : Sequelize.DATE,
            allowNull : false
        },
        ending_date :{
            type :  Sequelize.DATE,
            allowNull : false
        },
        certificate_obtained:{
            type: Sequelize.BOOLEAN,
            allowNull : false
        }
    },
    
    { timestamps : false})

    Applicant.hasMany(FormalTrainning, {
        foreignKey : 'applicantId',
        onDelete : 'restrict',
        onUpdate : 'cascade'
    })

    module.exports = FormalTrainning;