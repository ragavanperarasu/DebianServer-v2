const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/userModel");

router.post("/login", async (req, res) => {
  try {
    let { name, profile, email } = req.body;
    if(!email || !name || !profile){ 
        return res.status(400).json({ status: "failed", message: "Missing required fields" });
    }

    email = email.toLowerCase();
    const role = email.endsWith("@gct.ac.in") ? "Student" : "Normal";

    const user = await UsersModel.findOneAndUpdate(
      { email }, 
      {
        $setOnInsert: {
          email,
          name,
          profile,
          role
        }
      },
      {
        new: true,
        upsert: true,
        select: "email profile name role likeposts"
      }
    );

    res.json({
      status: "success",
      user
    });

  } catch (err) {
    res.status(500).json({ status: "failed" });
  }
});

module.exports = router;
