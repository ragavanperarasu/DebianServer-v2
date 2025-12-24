const mongoose = require("mongoose");
const postDBConnection = require("../database/postDB");

const refmetSchema = new mongoose.Schema({

  useruid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  dept: [
    {
      dname: String,
    },
  ],

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

refmetSchema.index({
  "dept.dname": 1
});


const refmetModel = postDBConnection.model("refmet", refmetSchema);

module.exports = refmetModel;