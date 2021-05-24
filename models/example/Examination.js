const { Schema, model } = require('mongoose');

const schema = new Schema({
  idExamType: { type: String, required: true },
  idPat: { type: String },
  dateExam: { type: Date, required: true },
  idCreateEmpl: { type: String, required: true },
  editDateExam: { type: Date },
  idEditEmpl: { type: String },
  dataExam: { type: Object, required: true },
})

module.exports = model('Examination', schema);
