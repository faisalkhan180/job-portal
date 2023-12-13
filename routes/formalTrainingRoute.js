const express = require("express");
const { check, validationResult } = require("express-validator");
const {FormalTrainning} = require("../models/formalTraining");
const Router = express.Router();

Router.post(
  "/addFormalTraining",
  [
    check("institute_name", "institute name should be provided").notEmpty(),
    check("training_type", "traing type should not be empty").notEmpty(),
    check("starting_date", "starting date sould be provided").isDate().notEmpty(),
    check("ending_date", "ending date should be provided ").isDate().notEmpty(),
    check("certificate_obtained", "Please add certification").isBoolean(),
  ],
  async (req, res) => {
    const {
      applicantId,
      institute_name,
      training_type,
      starting_date,
      ending_date,
      certificate_obtained,
    } = req.body;
    try {
      const formalTrainning = await FormalTrainning.create({
        applicantId,
        institute_name,
        training_type,
        starting_date,
        ending_date,
        certificate_obtained,
      });
      res.status(200).json({
        success: true,
        message: "Data Inserted",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
);

Router.get(
  "/getAllFormalTraining",
  async(req, res)=>{
      try{
          const formalTraining = await FormalTrainning.findAll({});
          res.status(200).json({
              success: true,
              formalTraining: formalTraining
          })
      }catch(error){
          res.status(400).json({
              success:false,
              error:error
          })
      }
  }
);

Router.delete(
  "/deleteFormalTraining",
  async(req, res)=>{
      const {id} = req.params;
      try{
          await FormalTrainning.destroy({
              where :{
                  id : id
              }
          });
          res.status(200).json({
              success:true,
              message : "Data has been deleted"
          })
      }catch(error){
          res.status(400).json({
              success: false,
              error:error
          })
      }
  });

Router.patch(
  "updateFormalTraining",
  async(req, res)=>{
      const {id} = req.params;
      try{
          const formalTraining = await FormalTrainning.update({
              where : {
                  id : id
              }
          });
          req.status(200).json({
              success : true,
              formalTraining : formalTraining
          })
      }catch(error){
          res.status(400).json({
              success : false,
              error:error
          })
      }
  }
);

module.exports = Router;
