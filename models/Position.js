const { Schema, model } = require('mongoose');

const schema = new Schema({
  posName: { type: String, required: true },
});

module.exports = model('Position', schema);
