/* eslint-disable consistent-return */
const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const config = require('config')
const R = require('ramda');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

const router = Router()

// /api/auth/register
// eslint-disable-next-line consistent-return
router.post(
  '/register',
  [
    check('password', 'Минимальная длина пароля 1 символов').notEmpty(),
    check('surname').notEmpty(),
    check('name').notEmpty(),
    check('birthday').notEmpty(),
    check('sex').notEmpty(),
    check('phone', 'Длина = 11, начало c 8')
      .isLength({ min: 11, max: 11 })
      .custom((value) => (R.startsWith('8', value) && R.isNil(value.match(/\D/))))
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при регистрации',
        })
      }

      const {
        password,
        surname,
        name,
        birthday,
        sex,
        phone,
      } = req.body

      const findUser = await User.findOne({ phone })

      if (findUser) {
        return res.status(400).json({ status: '1', message: 'Такой пользователь уже существует' })
      }

      let hashedPassword
      await bcrypt.hash(password, 12).then(r => {
        hashedPassword = r
      })

      const newUser = new User({
        sex,
        name,
        phone,
        surname,
        birthday,
        password: hashedPassword,
        fullName: `${surname} ${name}`,
        shortName: `${surname} ${name[0]}.`,
      })

      await newUser.save()

      res.status(200).json({ status: '0', message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /api/auth/login
router.post(
  '/login',
  [
    check('login', 'Введите логин').exists(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: '1',
          message: 'Ошибка входа',
        })
      }

      const { login, password } = req.body
      const user = await User.findOne({ phone: login })

      if (!user) {
        return res.status(400).json({ status: '1', message: 'Ошибка входа' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ status: '1', message: 'Ошибка входа' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        // { expiresIn: '1h' },
      )

      res.json({ token, userID: user.id, status: '0' })
    } catch (e) {
      res.status(500).json({ status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router