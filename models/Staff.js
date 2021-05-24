const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  fioEmpl: { type: String, required: true },
  idProf: { type: String, required: true },
  idCat: { type: String, required: true },
  education: { type: String, require: true },
  prize: { type: Array, require: true },
});

module.exports = model('Staff', schema);
