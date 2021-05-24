const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Staff' }]
});

module.exports = model('User', schema);
