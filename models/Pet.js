const { Schema, model } = require('mongoose');

const schema = new Schema({
  userID: { type: String, required: true },
  nickname: { type: String, required: true },
  birthday: { type: Date, required: true },
  sex: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, require: true },
  height: { type: String, require: true },
  weight: { type: String, require: true },
});

module.exports = model('Pet', schema);
