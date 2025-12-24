const express = require("express");
const router = express.Router();
const Subject = require("../../models/subjectModel");

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid subject id" });
    }

    const updated = await Subject.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({
      status: "success",
      data: updated,
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

module.exports = router;
