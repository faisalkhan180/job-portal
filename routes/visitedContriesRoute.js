const express = require('express');
const {check, validationResult} = require('express-validator')
const {VisitedCountries} = require('../models/countriesVisited');
const Router = express.Router();

Router.post("/addVisitedCountries", 
[
    check('country_name', "country should be provided").notEmpty(),
    check('duration', "please provide duration").notEmpty(),
    check('purpose', "Purpose should not be empty").notEmpty()
], async(req, res)=>{
    const {
        applicantId,
        country_name,
        duration,
        purpose
    } = req.body;
    try{
        const visitedCountries = await VisitedCountries.create({
            applicantId,
             country_name,
             duration,
             purpose
        });
        res.status(200).json({
            success : true,
            message : "data has been inserted",
            visitedCountries : visitedCountries
        });
    }catch(error){
        res.status(400).json({
            success : true,
            error : error
        })
    }
});

Router.get("getAllVisitedCountries", async(req, res)=>{
    try{
        const countriesVisited = await VisitedCountries.findAll({});
        res.status(200).json({
            success: true,
            countriesVisited : countriesVisited
        });
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

Router.delete("deleteVisitedCountries", async(req, res)=>{
    const {id} = req.params;
    try{
        await VisitedCountries.destroy({
            where : {
                id : id
            }
        });
        res.status(200).json({
            success : true,
            message : "data has been deleted"
        });
    }catch(error){
        res.status(400).json({
            success : true,
            error : error
        })
    }
});

Router.patch("updataVisitedCountries", async(req, res)=>{
    const {id} = req.params;
    try{
        const countriesVisited = await VisitedCountries.update({
            where : {
                id : id
            }
        });
        res.status(200).json({
            success : true,
            countriesVisited : countriesVisited
        });
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

module.exports = Router;