const {DataTypes} = require('sequelize');
const {Applicant} = require('../models/applicant');
const {connection} = require('../utils/connection');


    const ResearchPaper = connection.define('research_paper',{
        title_of_research :{
            type : DataTypes.STRING,
            allowNull : false
        },
        applicantId :{
            type : DataTypes.INTEGER,
            allowNull: false,
            References:{
                model : Applicant,
                key : "applicantId"
            }
        },
        name_of_journal :{
            type : DataTypes.STRING,
            allowNull : false
        },
        issn_no :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        page_no :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        publication_date :{
            type : DataTypes.DATE,
            allowNull : false
        },
        co_author : {
            type : DataTypes.STRING,
            allowNull : false
        },

    }, {timestamps : false})
    
    Applicant.hasMany(ResearchPaper, {
        foriegnKey : 'applicantId',
        onDelete : 'restrict',
        onUpdate : 'cascade'
    })