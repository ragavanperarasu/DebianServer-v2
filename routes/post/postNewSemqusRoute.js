const express = require("express");
const router = express.Router();
const semqusModel = require("../../models/semqusModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-poppler");

/* =======================
   Ensure folders exist
======================= */
const pdfDir = "uploads/semqus";
const thumbDir = "uploads/semqus/thumbs";

if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

/* =======================
   Multer config
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .pdf
    cb(null, `${Date.now()}_semqus${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

/* =======================
   Route
======================= */
router.post("/semqus/newpost", upload.single("pdf"), async (req, res) => {
  try {
    const { subuid, useruid, postdes } = req.body;

    if (!subuid || !useruid || !postdes || !req.file) {
      return res.status(400).json({
        status: "failed",
        message: "Missing required fields"
      });
    }

    /* =======================
       Generate thumbnail
    ======================= */
    const pdfPath = req.file.path;
    const thumbName = `${path.parse(req.file.filename).name}.png`;

    const options = {
      format: "png",
      out_dir: thumbDir,
      out_prefix: path.parse(req.file.filename).name,
      page: 1 // FIRST PAGE ONLY
    };

    await pdf.convert(pdfPath, options);

    const pdfurl = `/uploads/semqus/${req.file.filename}`;
    const pdfimg = `/uploads/semqus/thumbs/${thumbName}`;

    // await semqusModel.create({
    //   subuid,
    //   useruid,
    //   pdfurl,
    //   pdfimg,
    //   postdes
    // });

    res.json({
      status: "success",
      pdfurl,
      pdfimg
    });

  } catch (err) {
    res.status(500).json({
      status: "failed",
      error: err.message
    });
  }
});

module.exports = router;
