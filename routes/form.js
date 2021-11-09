const upload = require("../middleware/file_upload");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer')
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



//nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alessia.wisozk94@ethereal.email',
        pass: 'PTCPfxgWSNGEFr7c1k'
    }
});


router.post('/po', async (req, res) => {
    const { id, type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd } = req.body
    const form = new PO({
        id, type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd
    })
    form.save().then(user => {
        transporter.sendMail({
            from: "no-reply@jiphy.com",
            to: 'shivansh211299@gmail.com',
            subject: "signup success",
            html: "<h1>welcome to jiphy</h1>"
        })
        res.json({ message: "saved successfully" })
    })
        .catch((err) => {
            console.log(err);
        });
})


router.get('/po/:id', (req, res) => {
    const id = req.params.id
    // res.send(id)
    PO.findOne({ id: id }).then(user => {
        res.send(user)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;

