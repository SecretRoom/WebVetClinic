const { Schema, model } = require('mongoose');

const schema = new Schema({
  diagnlist: {
    type: Array({
      fullname: { type: String, required: true },
      id: { type: String, required: true },
      name: { type: String, required: true },
    }), required: true
  },
  grpname: { type: String, required: true },
})

module.exports = model('Diagnosis', schema);
