const express = require('express');
const {check, validationResult} = require("express-validator");
const {Employment} = require('../models/employment')
const Router = express.Router();


// add employment
Router.post("/addEmployment",
[
    check('name_of_Institute', 'institute name should be provided ').notEmpty(),
    check('designation', 'designation should not be empty').notEmpty(),
    check('bps', 'bps should be provided').isNumeric(),
    check('nature', 'nature should be provided').notEmpty()
],
async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        applicantId,
        name_of_Institute,
        designation,
        bps,
        nature 
    } = req.body;

    try{
        const employment = await Employment.create({
            applicantId,
            name_of_Institute,
            designation,
            bps,
            nature 
        });
        res.status(200).json({
            success : true,
            message : "Data inserted"
        })
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }

});

// get all Employment Record
Router.get("/getAllEmployment", async(req, res)=>{
    try{
        const employment = await Employment.findAll({});
        res.status(200).json({
            success : true,
            employment:employment
        });
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

//get single Employment record
Router.get("/getSingleEmployment:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const employment =  await Employment.findOne({
            where :{
                id :id
            }
        });
        res.status(200).json({
            success : true,
            employment : employment
        });
    }catch(error){
        res.status(400).json({
            success:false,
            error:error
        })
    }
});

// delete employment Record
Router.delete("/deleteEmployment:id", async(req, res)=>{
    const {id} = req.params;
    try{
        await Employment.destroy({
            where :{
                id :id
            }
        })
        res.status(200).json({
            success:true,
            message: "data Deleted"
        })
    }catch(error){
        res.status(400).json({
            success : false,
            message : "data Deleted" 
        })
    }
});

// update Employment Record
Router.patch("/updateEmployment:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const employment = await Employment.update({
            where : {
                id :id
            }
        })
        res.status(200).json({
            success : false,
            employment : employment
        })
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

module.exports = Router;