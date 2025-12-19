const mongoose = require("mongoose");
const postDBConnection = require("../database/postDB");

const semqusSchema = new mongoose.Schema({
  subuid: {
    type: mongoose.Schema.Types.ObjectId,
  },

  useruid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  pdfurl: String,
  pdfimg: String,
  postdes: String,

  view: { type: Number, default: 0 },
  relc: { type: Number, default: 0 },
  nrelc: { type: Number, default: 0 },
  downc: { type: Number, default: 0 },
  comc: { type: Number, default: 0 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const semqusModel = postDBConnection.model("semqus", semqusSchema);

module.exports = semqusModel;
