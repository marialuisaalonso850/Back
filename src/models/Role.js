const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: true,
    unique: true,
  },
  description: String,
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
});

const Role = mongoose.model("rol", roleSchema);

module.exports = Role;
