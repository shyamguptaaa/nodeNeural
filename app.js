const express = require("express")
const app = express();
const mongoose = require("mongoose")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors())

mongoose.connect('mongodb://localhost:27017/server2', () => {
    console.log("connected to db")
})
require('./models/supplier_master')
require('./models/item_master')
require('./models/po_form')

app.use(require("./routes/form"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});