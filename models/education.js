const Sequelize = require('sequelize');
const { Applicant } = require('../models/applicant');
const {connection} = require('../utils/connection');


const Education = connection.define('educantions',{
    id :{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    applicantId :{
        type : Sequelize.INTEGER,
        allowNull: false,
        References:{
            model : Applicant,
            key : "applicantId"
        }
    },
    
    title :{
        type : Sequelize.STRING,
        allowNull : false,
    },
    passingYear : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    attempt : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    distinction:{
        type : Sequelize.BOOLEAN,
        allowNull : false
    },
    obtainedMarks :{
        type: Sequelize.INTEGER,
        allowNull :false
    },
    totalMarks : {
        type : Sequelize.INTEGER,
        allowNull : false
    },

},{
    timestamps : false
})

Applicant.hasMany(Education, {
    foreignKey: "applicantId",
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  });
   
module.exports = {Education};

