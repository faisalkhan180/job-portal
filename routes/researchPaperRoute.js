const express = require('express');
const {check, validationResult} = require('express-validator');
const {ResearchPapers} = require("../models/researchPapers")
const Router = express.Router();

Router.post("/addResearchPaper", 
[
    check('title_of_research', "add title please").notEmpty(),
    check('name_of_journal', "name of journal should be provided").notEmpty(),
    check('issn_no', "add issn number please" ).notEmpty(),
    check('page_no', "page number should not be emply").notEmpty(),
    check('publication_date', "please provide publication date").isDate().notEmpty(),
    check('co_author', "add co-author").notEmpty()
], async(req, res)=>{
    const {
        applicantId,
        title_of_research,
        name_of_journal,
        issn_no,
        page_no,
        publication_date,
        co_author
    } = req.body;
    try{
        const researchPapers = await ResearchPapers.create({
            applicantId,
            title_of_research,
            name_of_journal,
            issn_no,
            page_no,
            publication_date,
            co_author
        });
        res.status(200).json({
            success : true,
            message : "data inserted",
            researchPapers : researchPapers
        });
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

Router.get("/getAllResearchPapers", async(req, res)=>{
    try{
        const researchPapers = await ResearchPapers.findAll({});
        res.status(200).json({
            success: true,
            researchPapers : researchPapers
        })
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        });
    }
});

Router.delete("/deleteResearchPapers", async(req, res)=>{
    const {id} = req.params;
    try{
        await ResearchPapers.destroy({
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
            success : false,
            error : error
        })
    }
});

Router.patch("/updateResearchPaper", async(req, res)=>{
    const {id} = req.params;
    try{
        const researchPapers = await ResearchPapers.update({
            where : {
                id : id
            }
        });
        res.status(200).json({
            success : true,
            researchPapers : researchPapers
        })
    }catch(error){
        res.status(400).json({
            success : false,
            error : error
        })
    }
});

module.exports = Router;