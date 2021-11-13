const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SupplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    item: [{ type: ObjectId, ref: "ItemMaster" }],
    cin: { type: String },
    branches: [{ type: String }],
    gst: { type: String },
    pan: { type: String },
    tan: { type: String },
    address: { type: String },
    bank: { type: String },
  },
  {
    timestamps: true,
  }
);

const SupplierModel = mongoose.model("SupplierMaster", SupplierSchema);
module.exports = SupplierModel;
