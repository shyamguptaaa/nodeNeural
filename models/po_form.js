const mongoose = require("mongoose");

const PoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    item: [
      {
        type: String,
        required: true,
      },
    ],
    timePeriod: {
      type: String,
      required: true,
    },

    creditPeriod: {
      type: String,
      required: true,
    },
    billingTenure: {
      type: String,
      required: true,
    },
    orderQuantity: {
      type: String,
      required: true,
    },
    validityStart: {
      type: Date,
      required: true,
    },
    validityEnd: {
      type: Date,
      required: true,
    },
    invoice: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const POModel = mongoose.model("PO", PoSchema);
module.exports = POModel;
