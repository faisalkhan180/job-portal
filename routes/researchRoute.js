const express = require("express");
const { check, validationResult } = require("express-validator");
const {Research} = require("../models/research");
const Router = express.Router();

Router.post(
  "/addResearch",
  [
    check("research_name").notEmpty(),
    check("institution_name").notEmpty(),
    check("professor_name").notEmpty(),
  ],
  async (req, res) => {
    const { applicantId, research_name, institution_name, professor_name } =
      req.body;

    try {
      const research = await Research.create({
        applicantId,
        research_name,
        institution_name,
        professor_name,
      });

      res.status(400).json({
        success: true,
        message: "Data has been inserted",
        research: research,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
);

Router.get("/getAllResearch", async (req, res) => {
  try {
    const research = await Research.findAll({});
    res.status(200).json({
      success: true,
      research: research,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

Router.delete("/deleteResearch", async (req, res) => {
  const {id}= req.params;
  try {
    await Research.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      message: "data has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

Router.patch("/updateResearch", async (req, res) => {
  const {id} = req.params;
  try {
    const research = await Research.update({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      success: true,
      research: research,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
});

module.exports = Router;
