/* eslint-disable consistent-return */
const { Router } = require('express')
const R = require('ramda');
const User = require('../../models/User')

const router = Router()



// /userData/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const findUser = await User.findById(req.params.id)

      if (!findUser) {
        return res.status(400).json({ status: '1', message: 'Такого юзера нет' })
      }

      res.status(200).json({ status: '0', data: findUser })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /userData/create
router.post(
  '/create',
  async (req, res) => {
    try {
      const {
        userID,
        fullName,
        surname,
        name,
        patronymic,
        shortName,
        birthday,
        sex,
        phone,
        email,
      } = req.body

      const findUserData = await UserData.find({ userID })

      if (!R.isEmpty(findUserData)) {
        return res.status(400).json({ status: '1', message: 'Пользователь уже существует' })
      }

      const newUserData = new UserData({
        userID,
        fullName,
        surname,
        name,
        patronymic,
        shortName,
        birthday,
        sex,
        phone,
        email,
      })

      await newUserData.save()

      res.status(200).json({ status: '0', message: 'Данные пользователя созданы' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /userData/update
router.post(
  '/update',
  async (req, res) => {
    try {
      const {
        userID,
        surname,
        name,
        patronymic,
        birthday,
        sex,
        phone,
        email,
      } = req.body

      await User.findByIdAndUpdate(userID,{        
        surname,
        name,
        patronymic,
        birthday,
        sex,
        phone,
        email,
      })

      return res.status(200).json({ status: '0', message: 'Данные обновлены' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
