const { Schema, model } = require('mongoose');

const schema = new Schema({
  catName: { type: String, required: true },
});

module.exports = model('Category', schema);
