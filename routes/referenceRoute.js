const express = require("express");
const {References} = require("../models/references");
const { check, validationResult } = require("express-validator");
const Router = express.Router();

//add references
Router.post(
  "/addReferences",
  [
    check("reference_name").notEmpty().isString(),
    check("designation").notEmpty(),
    check("address").notEmpty(),
  ],
  async (req, res) => {
    const { 
      applicantId, 
      reference_name,
       designation, 
       address 
      } = req.body;
    try {
      const references = await References.create({
        applicantId,
        reference_name,
        designation,
        address,
      });
      res.status(200).json({
        success: true,
        message: "data has been added",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
);

// get all references
Router.get("/getAllReferences", async (req, res) => {
  try {
    const references = await References.findAll({});
    res.status(200).json({
      success: true,
      references: references,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

// delete refences
Router.delete("deleteReferences", async (req, res) => {
const {id} = req.params;
  try {
    await References.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Data has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

// delete references
Router.patch("updateReferences", async (req, res) => {
  const {id} = req.params;
  try {
    const references = await References.update({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      references: references,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

module.exports = Router;
