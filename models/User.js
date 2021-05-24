const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  password: { type: String, required: true },
  fullName: { type: String, require: true },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  patronymic: { type: String, required: false },
  shortName: { type: String, require: true },
  birthday: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: false },
});

module.exports = model('User', schema);
