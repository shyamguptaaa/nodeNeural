const express = require("express");
const path = require("path");
const router = express.Router();
const SupplierMaster = require("../models/supplier_master");
const multer = require("multer");

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
  const { supplierName, address1, email, state, branches } = req.body;
  if (req.files === undefined) return res.send("you must select a file.");
  if (!supplierName || !address1 || !email || !state || !branches) {
    return res.status(422).json({ error: "fill all fields" });
  }
  console.log(req.body);

  try {
    const form = await SupplierMaster.create({
      supplierName,
      address1,
      email,
      state,
      branches,
      cin: req.files[0].filename,
      gst: req.files[1].filename,
      pan: req.files[2].filename,
      tan: req.files[3].filename,
      address: req.files[4].filename,
      bank: req.files[5].filename,
    });
    res.send(form);
    res.status(200).send("Supplier created");
  } catch (error) {
    res.status(400).send("Supplier not Created ");
  }
});

//get all supplier
router.get("/supplier", (req, res) => {
  try {
    SupplierMaster.find()
      .populate("item")
      .then((data) => {
        res.send(data);
      });
  } catch (error) {
    res.status(500).send("Server did not responded");
  }
});

module.exports = router;
