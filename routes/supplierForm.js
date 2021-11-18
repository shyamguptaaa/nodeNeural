const express = require("express");
const path = require("path");
const router = express.Router();
const SupplierMaster = require("../models/supplier_master");
const multer = require("multer");
const fs = require("fs");

// destination: function (req, file, cb) {
//   const { supplierName } = req.body;
//   const dir = path.join(__dirname, "../") + `uploads/${supplierName}`;
//   fs.existsSync(dir, (exist) => {
//     if (!exist) {
//       return fs.mkdir(dir, (err) => cb(err, dir));
//     }
//     return cb(null, dir);
//   });
//saving file using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../") + "uploads/supplier/");
  },
  filename: function (req, file, cb) {
    cb(null, "-" + Date.now() + file.originalname.replace(/\s+/g, ""));
  },
});
const upload = multer({ storage: storage });

//generate supplier master

router.post("/supplier", upload.array("file", 6), async (req, res) => {
  const {
    supplierName,
    email,
    numberofBranches,
    cin,
    pan,
    tan,
    bankname,
    accountNumber,
    bankifsc,
    price,
  } = req.body;
  console.log(req.body);
  console.log(req.files);

  //req body error check
  if (
    !supplierName ||
    !email ||
    !numberofBranches ||
    !cin ||
    !pan ||
    !tan ||
    !bankname ||
    !accountNumber ||
    !bankifsc
  ) {
    return res.status(400).json({
      status: false,
      error: true,
      message: "Please fill all the fields",
    });
  }

  const img1 = req.files[0].filename;
  const img2 = req.files[1].filename;
  const img3 = req.files[2].filename;
  const img4 = req.files[3].filename;

  //image error check
  if ((!img1, !img2, !img3, !img4 || !req.files)) {
    return res.status(400).json({
      message: "Please upload all the images",
    });
  }

  try {
    const form = await SupplierMaster.create({
      supplierName,
      email,
      numberofBranches,
      cin,
      pan,
      tan,
      bankname,
      accountNumber,
      bankifsc,
      cindoc: img1,
      pandoc: img2,
      tandoc: img3,
      bankdoc: img4,
      items: [price],
    });
    res.status(200).json({
      status: true,
      error: false,
      message: "Supplier created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: true,
      message: "Something went wrong" + error.message,
    });
  }
});

//get all supplier
router.get("/supplier", (req, res) => {
  try {
    SupplierMaster.find()
      .populate("item")
      .then((data) => {
        res.send(data).status(200).json({
          status: true,
          error: false,
          message: "Supplier fetched successfully",
        });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: true,
      message: "Something went wrong" + error.message,
    });
  }
});

module.exports = router;
