/* eslint-disable consistent-return */
const { Router } = require('express')
const R = require('ramda');
const fs = require('file-system');
const moment = require('moment')
const { check, validationResult } = require('express-validator')
const config = require('config')
const path = require('path');

const PetPhoto = require('../../models/PetPhoto')

const router = Router()



// /pets/photos/upload
router.post(
  '/upload',
  async (req, res) => {
    try {
      const {
        petID,
        userID,
      } = req.body

      const file = req.files.file

      const type = file.name.split('.').pop()

      if (!R.includes(type, ['jpg', 'jpeg', 'png'])) return res.status(400).json({ status: '1', message: 'Неверный формат файла' })

      const path = `${config.get('dirPath')}/${userID}/${petID}/${file.name}`

      const findPetPhoto = await PetPhoto.findOne({ petID })

      if (fs.existsSync(path)) {
        return res.status(400).json({ status: '1', message: 'Файл уже существует' })
      }

      if (R.isEmpty(findPetPhoto) || R.isNil(findPetPhoto)) {
        fs.mkdirSync(`${config.get('dirPath')}/${userID}/${petID}`, [])

        const newPetPhoto = new PetPhoto({
          path,
          petID,
          userID,
          name: file.name,
        })

        await newPetPhoto.save()

        file.mv(path)

        return res.status(200).json({ status: '0', message: 'Фото добалено' })
      } else {
        fs.rmdirSync(`${config.get('dirPath')}/${userID}/${petID}`)

        fs.mkdirSync(`${config.get('dirPath')}/${userID}/${petID}`, [])

        file.mv(path)

        await PetPhoto.findOneAndUpdate({ petID }, { name: file.name, path })


        return res.status(200).json({ status: '0', message: 'Фото обновлено' })
      }
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /pets/photos
router.post(
  '',
  async (req, res) => {
    try {
      const {
        petID,
        userID,
      } = req.body

      let findPetPhoto

      if (
        (R.isEmpty(petID) || R.isNil(petID))
        && (R.isEmpty(userID) || R.isNil(userID))
      ) return res.status(400).json({ status: '1', message: 'Ошибка запроса' })

      if (R.isEmpty(petID) || R.isNil(petID)) {
        findPetPhoto = await PetPhoto.find({ userID })
      } else {
        findPetPhoto = await PetPhoto.findOne({ petID })
      }

      fs.createReadStream(findPetPhoto.path).pipe(res);

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
