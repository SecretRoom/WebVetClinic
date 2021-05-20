/* eslint-disable consistent-return */
const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

const router = Router()

// /api/auth/register
// eslint-disable-next-line consistent-return
router.post(
  '/register',
  [
    check('password', 'Минимальная длина пароля 1 символов')
      .isLength({ min: 1 })
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

      const { userName, password } = req.body
      const findUser = await User.findOne({ userName })

      if (findUser) {
        return res.status(400).json({ status: '1', message: 'Такой пользователь уже существует' })
      }

      let hashedPassword
      await bcrypt.hash(password, 12).then(r => {
        hashedPassword = r
      })

      const newUser = new User({ userName, password: hashedPassword })

      await newUser.save()

      res.status(201).json({ status: '2', message: 'Пользователь создан' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /api/auth/login
router.post(
  '/login',
  [
    check('userName', 'Введите логин').exists(),
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

      const { userName, password } = req.body
      const user = await User.findOne({ userName })

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
