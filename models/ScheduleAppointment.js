const { Schema, model } = require('mongoose');

const schema = new Schema({
  idPat: { type: String, required: true },
  idEmpl: { type: String, required: true },
  date: { type: Date, required: true },
})

module.exports = model('Schedule_appointments', schema);
