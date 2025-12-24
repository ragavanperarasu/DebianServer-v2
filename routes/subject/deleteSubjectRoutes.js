const express = require("express");
const router = express.Router();
const Subject = require("../../models/subjectModel");

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid subject id" });
    }

    const deleted = await Subject.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({
      status: "success",
      message: "Subject deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

module.exports = router;
