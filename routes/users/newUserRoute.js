const express = require("express");
const router = express.Router();
const UsersModel = require("../../models/userModel");

router.post("/login", async (req, res) => {
  try {
    let { givenName, photo, email } = req.body;
    if(!email || !givenName || !photo){ 
        return res.status(400).json({ status: "failed", message: "Missing required fields" });
    }

    email = email.toLowerCase();
    const role = email.endsWith("@gct.ac.in") ? "Student" : "Normal";

    const user = await UsersModel.findOneAndUpdate(
      { email }, 
      {
        $setOnInsert: {
          email: email,
          name: givenName,
          profile: photo,
          role
        }
      },
      {
        new: true,
        upsert: true,
        select: "_id"
      }
    );


    res.json({
      status: "success",
      useruid: user._id,
    });

  } catch (err) {
    res.status(500).json({ status: "failed" });
  }
});

module.exports = router;
