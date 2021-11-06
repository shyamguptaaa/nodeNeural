const mongoose = require('mongoose');
const Supplier = mongoose.model('Supplier')

const PoSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    timePeriod: {
        type: String,
        required: true
    },

    creditPeriod: {
        type: String,
        required: true
    },
    billingTenure: {
        type: String,
        required: true
    },
    orderQuantity: {
        type: String,
        required: true
    },
    validityStart: {
        type: String,
        required: true
    },
    validityEnd: {
        type: String,
        required: true
    },

})

mongoose.model("PO", PoSchema)

