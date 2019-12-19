const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    heading: String,
    content: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Note', noteSchema);
