const mongoose = require('mongoose');
const Supplier = mongoose.model('Supplier')
const { ObjectId } = mongoose.Schema.Types

const ItemSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    uom: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    moq: {
        type: Number,
        required: true
    },

})

mongoose.model("ItemMaster", ItemSchema)


