const express = require("express");
const router = express.Router();
const Subject = require("../../models/subjectModel");

router.get("/sublist/:reg/:dept", async (req, res) => {
  try {
    const { reg, dept } = req.params;

    console.log(req.params);

    const subjects = await Subject.find(
      {
        regulation: reg,
        dept: { $in: [dept] },
      },
      {
        subname: 1,
        _id: 1, 
      }
    ).sort({ createdAt: -1 });

    console.log(subjects);
    res.json({
      status: "success",
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
