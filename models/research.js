const Sequelize = require('sequelize');
const {connection}  = require('../utils/connection');
const {Applicant} = require('../models/applicant');


    const Research = connection.define('research',{
        research_name :{
            type: Sequelize.STRING,
            allowNull : false
        },
        applicantId :{
            type : Sequelize.INTEGER,
            allowNull: false,
            References:{
                model : Applicant,
                key : "applicantId"
            }
        },
        institution_name :{
            type : Sequelize.STRING,
            allowNull : false
        },
        professor_name :{
            type : Sequelize.STRING,
            allowNull: false
        }
    },{timestamps : false})

   Applicant.hasMany(Research, {
       foreignKey : 'applicantId',
       onDelete : 'restrict',
       onUpdate : 'cascade'
   });

   module.exports = Research;