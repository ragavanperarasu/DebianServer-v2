const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const UsersModel = require("../../models/userModel");

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user id",
      });
    }

    const deletedUser = await UsersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.json({
      status: "success",
      message: "Account deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
});

module.exports = router;
