const {connection} = require('../utils/connection');
const {DataTypes} = require('sequelize');
const {Applicant} = require('../models/applicant');

const VisitedCountries = connection.define('visited_countries',{
        country_name :{
            type : DataTypes.STRING,
            allowNull : false
        },
        applicantId :{
            type : DataTypes.INTEGER,
            allowNull : false,
            references:{
                model : Applicant,
                key : "applicantId"
            }
        },
        duration : {
            type : DataTypes.STRING,
            allowNull : false
        },
        purpose : {
            type : DataTypes.STRING,
            allowNull : false
        }
    }, {timestamps : false})

    Applicant.hasMany(VisitedCountries, {
        foreignKey : "applicantId",
        onDelete : "restrict",
        onUpdate : "cascade"
    })
   
    module.exports = VisitedCountries;