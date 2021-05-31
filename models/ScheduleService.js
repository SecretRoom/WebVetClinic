const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  emplID: { type: String, required: true },
  petID: { type: String, required: true },
  ownerID: { type: String, required: true },
  serviceID: { type: String, required: true },
  date: { type: String, required: true },
  appointmentID: { type: String, required: true },
});

module.exports = model('Schedule_Service', schema);
