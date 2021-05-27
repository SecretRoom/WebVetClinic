/* eslint-disable consistent-return */
const { Router } = require('express')
const R = require('ramda');
const moment = require('moment')
const { check, validationResult } = require('express-validator')

const Pet = require('../../models/Pet')

const router = Router()



// /pets
router.post(
  '',
  [
    check('userID').notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при запросе',
        })
      }

      const {
        userID,
      } = req.body

      const findPets = await Pet.find({ userID })

      res.status(200).json({ status: '0', items: findPets })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /pets/create
router.post(
  '/create',
  async (req, res) => {
    try {
      const {
        userID,
        nickname,
        birthday,
        sex,
        type,
        color,
        height,
        weight,
      } = req.body

      const findPets = await Pet.find({ userID, nickname })

      if (!R.isEmpty(findPets)) {
        return res.status(400).json({ status: '1', message: 'Питомец уже существует' })
      }

      const newPet = new Pet({
        userID,
        nickname,
        birthday,
        sex,
        type,
        color,
        height,
        weight,
      })

      await newPet.save()

      res.status(200).json({ status: '0', message: 'Питомец добавлен' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /pets/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const findPet = await Pet.findById(req.params.id)

      if (!findPet) {
        return res.status(400).json({ status: '1', message: 'Такого питомца нет' })
      }

      res.status(200).json({ status: '0', data: findPet })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
