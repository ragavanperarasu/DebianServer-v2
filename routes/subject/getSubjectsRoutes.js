const express = require("express");
const router = express.Router();
const Subject = require("../../models/subjectModel");

router.get("/sublist/:reg/:dept", async (req, res) => {
  try {
    const { reg, dept } = req.params;

    const subjects = await Subject.find({
      regulation: reg,
      "dept.dname": dept,   // match inside array
    })
      .populate("useruid", "name email")
      .sort({ createdAt: -1 });

    res.json({
      status: "success",
      count: subjects.length,
      data: subjects,
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

module.exports = router;
