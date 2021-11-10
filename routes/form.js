const upload = require("../middleware/file_upload");
const mongoose = require("mongoose");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const nodemailer = require('nodemailer')
const Supplier = mongoose.model('Supplier')
const ItemMaster = mongoose.model('ItemMaster')
const PO = mongoose.model('PO')

//generate supplier master
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


//get all supplier
router.get('/supplier', (req, res) => {
    Supplier.find().then(data => { res.send(data) })
})


//generate item master 
router.post('/item', async (req, res) => {
    const { code, description, category, subCategory, uom, price, moq, supplier } = req.body
    const form = new ItemMaster({
        code,
        description,
        category,
        subCategory,
        supplier,
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

//get item  
router.get('/item', (req, res) => {
    ItemMaster.find().then(data => { res.send(data) })
})

router.put('/update', (req, res) => {
    Supplier.findByIdAndUpdate(req.body.supplier, {

        $push: { item: req.body.item }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        else {
            res.json(result)
        }
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

//PO form  generation
router.post('/po', async (req, res) => {
    const { type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd } = req.body
    const id = uuidv4();
    const form = new PO({
        id, type, supplier, item, timePeriod, creditPeriod, billingTenure, orderQuantity, validityStart, validityEnd
    })
    form.save().then(user => {
        transporter.sendMail({
            from: "no-reply@jiphy.com",
            to: 'shivansh211299@gmail.com',
            subject: "PO success",
            html: `localhost:5000/po/${id}`,


        })
        res.json({ message: "saved successfully" })
    })
        .catch((err) => {
            console.log(err);
        });
})


//invoice uplode route
router.get('/po/:id', (req, res) => {
    const id = req.params.id
    PO.findOne({ id: id }).then(user => {
        res.send(user)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;

