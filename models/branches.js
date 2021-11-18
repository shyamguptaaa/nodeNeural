const mongoose = require("mongoose");
const branchesSchema = new mongoose.Schema({
  branches: [
    {
      branchName: {
        type: String,
      },
      address: {
        type: String,
      },
      addressdoc: {
        type: String,
      },
      state: {
        type: String,
      },
      gst: {
        type: Number,
      },
      gstdoc: {
        type: String,
      },
    },
  ],
});

const BranchesModel = mongoose.model("BranchesModel", branchesSchema);
module.exports = BranchesModel;
