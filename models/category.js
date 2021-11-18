const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SubCategory: [
    {
      type: String,
    },
  ],
});

const CatogeryModel = mongoose.model("Category", categorySchema);
module.exports = CatogeryModel;
