const { Schema, model } = require('mongoose');

const schema = new Schema({
  profName: { type: String, required: true },
});

module.exports = model('Profile', schema);
