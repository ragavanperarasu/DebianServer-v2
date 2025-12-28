const mongoose = require("mongoose");
const postDBConnection = require("../database/postDB");

const subjectSchema = new mongoose.Schema({

  useruid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  subname: String,
  regulation: String,

  dept: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

subjectSchema.index({
  regulation: 1,
  "dept.dname": 1
});

const subjectModel = postDBConnection.model("subjects", subjectSchema);

module.exports = subjectModel;
