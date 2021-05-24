const { model, Schema } = require('mongoose')


const PetPhoto = new Schema({
  name: { type: String, required: true },
  path: { type: String, default: '' },
  petID: { type: String, required: true },
  userID: { type: String, required: true },
})

module.exports = model('PetPhoto', PetPhoto)