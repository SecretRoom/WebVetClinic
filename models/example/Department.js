const { Schema, model } = require('mongoose');

const schema = new Schema({
  deptName: { type: String, required: true },
});

module.exports = model('Department', schema);
