const upload = require("../middleware/file_upload");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Supplier = mongoose.model('Supplier')
const ItemMaster = mongoose.model('ItemMaster')
const PO = mongoose.model('PO')


router.post("/supplier", upload.array("file"), async (req, res) => {
    const { supplier, address1, state, branches, email } = req.body
    console.log(req.files)
    if (req.files === undefined) return res.send("you must select a file.");

    const form = new Supplier({
        supplier,
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
    })
    form.save().then(result => {
        res.json({ form: result })
    }).catch(err => {
        console.log(err)
    })

})


router.post('/item', async (req, res) => {
    const { code, description, category, subCategory, uom, price, moq } = req.body
    const form = new ItemMaster({
        code,
        description,
        category,
        subCategory,
        uom,
        price,
        moq
    })
    form.save().then(result => {
        res.json({ form: result })
    }).catch(err => {
        console.log(err)
    })


})


router.post('/po', async (req, res) => {
    const { type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd } = req.body
    const form = new PO({
        type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd
    })
    form.save().then(result => {
        res.json({ form: result })
    }).catch(err => {
        console.log(err)
    })


})


module.exports = router;