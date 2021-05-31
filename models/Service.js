const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  emplID: { type: Array, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true }
});

module.exports = model('Service', schema);
