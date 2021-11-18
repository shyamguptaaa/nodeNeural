const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const ItemSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    uom: {
      type: Number,
      required: true,
    },
    moq: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.model("ItemMaster", ItemSchema);
module.exports = ItemModel;
