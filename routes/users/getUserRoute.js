const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/userModel");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UsersModel.findById(id)
      .select("email profile name role likeposts");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    }

    res.json({
      status: "success",
      user
    });

  } catch (err) {
    res.status(500).json({ status: "failed" });
  }
});


module.exports = router;
