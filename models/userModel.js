const mongoose = require("mongoose");
const userConnection = require("../database/userDB");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  profile: String,

  likeposts: [{
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  pstatus: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  psemqus: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  putqus: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  pqus: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  role: {
    type: String,
    default: "Student",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = userConnection.model("users", userSchema);

module.exports = userModel;
