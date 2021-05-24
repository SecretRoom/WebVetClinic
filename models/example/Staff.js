const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  idEmpl: { type: String || Array, required: true },
  fioEmpl: { type: String, required: true },
  birthday: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  idDept: { type: String },
  idPos: { type: String },
  idProf: { type: String },
  idCat: { type: String },
  deptName: { type: String },
  posName: { type: String },
  profName: { type: String },
  catName: { type: String },
  empl: [{ type: Types.ObjectId, ref: 'User' }]
});

module.exports = model('Staff', schema);
