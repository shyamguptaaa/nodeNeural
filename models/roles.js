const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const rolesSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  permissions: [{ type: String, required: true }],
});

const Roles = mongoose.model("Roles", rolesSchema);
module.exports = Roles;
