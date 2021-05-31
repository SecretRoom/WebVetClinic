/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const Service = require('../../../models/Service')
const Staff = require('../../../models/Staff')

const router = Router()


// /api/directories/service/create
router.post(
  '/create',
  [
    check('name').notEmpty(),
    check('emplID').isArray().notEmpty(),
    check('price').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при создании',
        })
      }

      const {
        name,
        emplID,
        price,
      } = req.body

      const findEmpl = await Service.findOne({ name })

      if (findEmpl) {
        return res.status(400).json({ status: '1', message: 'Такая услуга уже существует' })
      }

      const newService = new Service({
        name,
        emplID,
        price,
      })

      await newService.save()

      res.status(200).json({ status: '0', message: 'Услуга создана' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)


// /directories/service
router.get(
  '',
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: '1',
          message: 'Ошибка получения данных',
        })
      }

      const services = await Service.find()
      const staff = await Staff.find()

      if (!services) {
        return res.status(400).json({ status: '1', message: 'Услуг нет' })
      }

      const findEmpl = (emplList) => R.map((item) => item.fioEmpl, R.filter((empl) => R.includes(empl.id, emplList),staff))

      res.status(200).json({
        items: R.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          emplID: item.emplID,
          fioEmpl: findEmpl(item.emplID),
        }), services), status: '0'
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
