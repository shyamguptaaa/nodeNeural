const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");
const PO = require("../models/po_form");
const express = require("express");
const router = express.Router();

//nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "shivanshrocks21@gmail.com",
    pass: "Shivansh22@.",
  },
});

//PO form  generation
router.post("/po", async (req, res) => {
  const {
    type,
    supplier,
    item,
    timePeriod,
    creditPeriod,
    billingTenure,
    orderQuantity,
    validityStart,
    validityEnd,
  } = req.body;
  if (
    !type ||
    !supplier ||
    !item ||
    !timePeriod ||
    !creditPeriod ||
    !billingTenure ||
    !orderQuantity ||
    !validityStart ||
    !validityEnd
  ) {
    return res.status(422).json({ error: "fill all fields" });
  }
  console.log(req.body);
  const id = uuidv4();
  try {
    const form = await PO.create({
      id,
      type,
      supplier,
      item,
      timePeriod,
      creditPeriod,
      billingTenure,
      orderQuantity,
      validityStart,
      validityEnd,
    })
      .then((user) => {
        transporter.sendMail({
          from: "no-reply@jiphy.com",
          to: "shivansh211299@gmail.com",
          subject: "PO success",
          html: `<a href="http://localhost:5000/po/${id}" > click this link to upload invoice </a >`,
        });
        res.status(200).send({ message: "saved successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: "PO did not generated" });
      });
  } catch (error) {}
});

//invoice uplode route
router.get("/po/:id", (req, res) => {
  const id = req.params.id;
  PO.findOne({ id: id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
