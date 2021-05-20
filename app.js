/* eslint-disable no-console */
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({ extended: true }))
app.use('/auth', require('./routes/Auth'))

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
