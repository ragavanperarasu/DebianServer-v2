const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/userModel");

router.put("/:id/name", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "Name required"
      });
    }

    const user = await UsersModel.findByIdAndUpdate(
      id,
      { name },
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
