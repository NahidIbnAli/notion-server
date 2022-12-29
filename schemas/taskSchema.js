const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskText: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = taskSchema;
