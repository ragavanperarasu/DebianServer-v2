const express = require("express");
const router = express.Router();
const semqusModel = require("../../../models/semqusModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { fromPath } = require("pdf2pic");

const pdfDir = "uploads/semqus";
const thumbDir = "uploads/semqus/thumbs";

if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

/* 
curl -X POST http://localhost:5000/app/posts/semqus/newpost   -F "subuid=SUB123"   -F "useruid=USER123"   -F "postdes=Semester Question Paper"   -F "pdf=@/home/ragavan/Documents/sample.pdf"
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}_semqus${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 } 
});

router.post("/semqus/newpost", upload.single("pdf"), async (req, res) => {
  try {
    const { subuid, useruid, postdes } = req.body;

    if (!subuid || !useruid || !postdes || !req.file) {
      return res.status(400).json({
        status: "failed",
        message: "Missing required fields"
      });
    }

    //   Generate PDF thumbnail

    const pdfPath = req.file.path;
    const baseName = path.parse(req.file.filename).name;

    const converter = fromPath(pdfPath, {
      density: 150,
      saveFilename: baseName,
      savePath: thumbDir,
      format: "png",
      width: 600,
      height: 500
    });

    // Convert FIRST PAGE ONLY
    await converter(1);

    const pdfurl = `/uploads/semqus/${req.file.filename}`;
    const pdfimg = `/uploads/semqus/thumbs/${baseName}.1.png`;

    // Save to DB
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
