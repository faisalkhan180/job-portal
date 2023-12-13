const express = require('express');
const {check, validationResult} = require('express-validator');
const {Education} = require('../models/education');
const Router = express.Router();

// add education
Router.post("/addEducation",
[
    check('title', "title should not be empty").notEmpty(),
    check('passingYear', 'please provide passing years').notEmpty(),
    check('attempt', "attempts should be provided").isNumeric(),
    check('distinction', "please provide distinction").isBoolean(),
    check('obtainedMarks', "Obtained marks should be provided").isNumeric(),
    check('totalMarks', "please add total marks").isNumeric(),
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {
        applicantId,
        title,
        passingYear,
        attempt,
        distinction,
        obtainedMarks,
        totalMarks } = req.body;

    try{
        const education = await Education.create({
            applicantId,
            title,
            passingYear,
            attempt,
            distinction,
            obtainedMarks,
            totalMarks 
        });
        res.status(200).json({
            success : true,
            message : 'Data entered Successfully'
        });
    }catch(error){
        res.status(400).json({success : false, error: error})
    }
});

// get all education
Router.get("/getAllEducation",async(req, res)=>{
    try{
        const education = await Education.findAll({});
        res.status(200).json({
            success: true,
            education : education
        });
    }catch(error){
        res.status(400).json({success: false, error:error})
    }
});


// get Single Education
Router.get("/getSingleEducation:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const education = await Education.findOne({
            where :{
                id : id
            }
        });
        res.status(200).json({
            success : true,
            education: education
        })
    }catch(error){
        res.status(400).json({
            success: false,
            error : error
        })
    }
});

// delete education
Router.delete("/deleteEducation:id", async(req, res)=>{
    const {id } = req.params;
    try{
        await Education.destroy({
            where :{
                id : id
            }
        });
        res.status(200).json({success: true, message : "field Deleted"})
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            error:error
        })
    }
});

// update Education
Router.patch("/updateEducation:id", async(req, res)=>{
    const {id} = req.params;
    try{
        const education = await Education.update(req.body,{
            where : {
                id : id
            }
        })
        res.status(200).json(req.body, {success: true, education: education})
    }catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            error : error
        })
    }
});

module.exports = Router;