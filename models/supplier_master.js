const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SupplierSchema = new mongoose.Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cin: {
      type: Number,
      required: true,
    },
    numberofBranches: {
      type: Number,
      required: true,
    },
    pan: {
      type: Number,
      required: true,
    },
    tan: {
      type: Number,
      required: true,
    },
    bankname: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    bankifsc: {
      type: String,
      required: true,
    },
    cindoc: {
      type: String,
    },
    pandoc: {
      type: String,
    },
    tandoc: {
      type: String,
    },
    bankdoc: {
      type: String,
    },
    branches: [{ type: ObjectId, ref: "BranchesModel" }],
    // items: [
    //   {
    //     price: {
    //       type: Number,
    //     },
    //     _id: { type: ObjectId, ref: "ItemsModel" },
    //   },
    // ],
    verified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const SupplierModel = mongoose.model("SupplierMaster", SupplierSchema);
module.exports = SupplierModel;
