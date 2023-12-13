const { DataTypes } = require("sequelize");
const  {connection}  = require("../utils/connection");
const {Applicant} = require('../models/applicant');
    const References = connection.define("references", {
        reference_name :{
            type: DataTypes.STRING,
            allowNull : false
        },
        applicantId :{
            type : DataTypes.INTEGER,
            allowNull: false,
            Reference:{
                model : Applicant,
                key : "applicantId"
            }
        },
        designation:{
            type : DataTypes.STRING,
            allowNull : false
        },
        address : {
            type: DataTypes.STRING,
            allowNull : false
        }
    }, {timestamps : false});

    Applicant.hasMany(References, {
        foreignKey: 'applicantId',
        onDelete : 'restrict',
        onUpdate : 'cascade'
    })

    module.exports = References;
   