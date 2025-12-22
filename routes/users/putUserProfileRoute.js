const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/userModel");

router.put("/:id/profile", async (req, res) => {
  try {
    const { id } = req.params;
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({
        status: "failed",
        message: "Profile image required"
      });
    }

    const user = await UsersModel.findByIdAndUpdate(
      id,
      { profile },
      {
        new: true,
        select: "email profile name role likeposts"
      }
    );

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"
      });
    }

    res.json({
      status: "success",
    });

  } catch (err) {
    res.status(500).json({ status: "failed" });
  }
});




module.exports = router;
