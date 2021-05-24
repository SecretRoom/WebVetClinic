const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  fullName: { type: String },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  patronymic: { type: String, required: false },
  shortName: { type: String },
  birthday: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  oms: { type: String, required: true },
  omsCompany: { type: String, required: true },
  snils: { type: String, required: true },
})

module.exports = model('Patient', schema);
