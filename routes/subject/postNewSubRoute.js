const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Subject = require("../../models/subjectModel");


router.post("/new", async (req, res) => {
  try {
    const { useruid, subname, regulation, dept } = req.body;

    if (!useruid || !subname || !regulation) {
      return res.status(400).json({
        status: "failed",
        message: "Required fields missing",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(useruid)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid useruid",
      });
    }

    const subject = await Subject.create({
      useruid,
      subname,
      regulation,
      dept,
    });

    res.status(201).json({
      status: "success",
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

module.exports = router;