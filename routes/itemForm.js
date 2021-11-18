const ItemMaster = require("../models/item_master");
const SupplierMaster = require("../models/supplier_master");
const express = require("express");
const router = express.Router();

//generate item master
router.post("/item", async (req, res) => {
  const {
    code,
    description,
    category,
    subCategory,
    uom,
    price,
    moq,
    supplierName,
  } = req.body;
  if (
    !code ||
    !description ||
    !category ||
    !subCategory ||
    !uom ||
    !price ||
    !moq ||
    !supplierName
  ) {
    return res.status(422).json({ error: "fill all fields" });
  }
  console.log(req.body);
  try {
    var record = await ItemMaster.create({
      code,
      description,
      category,
      subCategory,
      supplierName,
      uom,
      price,
      moq,
    });
  } catch (error) {
    res.status(400).send("Item not created");
  }

  try {
    // const itemId = record.code;
    // const record1 = await SupplierMaster.find({
    //   supplierName: supplierName,
    // });
    const updated = await SupplierMaster.updateOne(
      { supplierName },
      // { $push: [{ supplierName, code }] }
      { $push: { item: [{ name: supplierName, code }] } }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send("Item not pushed to supplierMaster");
  }
});

//get item
router.get("/item", (req, res) => {
  try {
    ItemMaster.find().then((data) => {
      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
