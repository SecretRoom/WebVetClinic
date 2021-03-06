/* eslint-disable no-console */
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const fileUpload = require("express-fileupload")
const app = express()

app.use(fileUpload({}))
app.use(express.json({ extended: true }))
app.use('/auth', require('./routes/Auth'))
app.use('/schedule/service', require('./routes/Schedule/Service'))
app.use('/directories/staff', require('./routes/Directories/Staff'))
app.use('/directories', require('./routes/Directories'))
app.use('/directories/services', require('./routes/Directories/Service'))
app.use('/schedule/service', require('./routes/Schedule/Service'))
app.use('/schedule/appointment', require('./routes/Schedule/Appointment'))
app.use('/userData', require('./routes/UserData'))
app.use('/pets', require('./routes/Pet'))
app.use('/pets/photos', require('./routes/PetPhoto'))

const PORT = config.get('port')

const start = async () => {
  try {
    mongoose.Promise = global.Promise

    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }, (err) => {
      if (err) console.log(`Error in DB connection: ${err}`)
    })

    app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
  } catch (e) {
    console.log('🚀 ~ file: app.js ~ line 13 ~ start ~ message', e.message)
    process.exit(1)
  }
}

start()
