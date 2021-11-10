const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types


const SupplierSchema = new mongoose.Schema({
    supplier: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    item: [{ type: String }],
    cin: { type: String },
    branches: [{ type: String }],
    gst: { type: String },
    pan: { type: String },
    tan: { type: String },
    address: { type: String },
    bank: { type: String },

})

mongoose.model("Supplier", SupplierSchema)


