/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const Staff = require('../../../models/Staff')
const Category = require('../../../models/Category')
const Profile = require('../../../models/Profile')

const router = Router()


// /api/directories/staff/register
// eslint-disable-next-line consistent-return
router.post(
  '/create',
  [
    check('fioEmpl').notEmpty(),
    check('idProf').notEmpty(),
    check('idCat').notEmpty(),
    check('education').notEmpty(),
    check('prize').isArray().notEmpty(),
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
        fioEmpl,
        idProf,
        idCat,
        education,
        prize,
      } = req.body
      const findEmpl = await Staff.findOne({ fioEmpl })

      if (findEmpl) {
        return res.status(400).json({ status: '1', message: 'Такой сотрудник уже существует' })
      }

      const newStaff = new Staff({
        fioEmpl,
        idProf,
        idCat,
        education,
        prize,
      })

      await newStaff.save()

      res.status(201).json({ status: '2', message: 'Сотрудник создан' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)


// /directories/staff
router.post(
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

      const { idEmpl } = req.body
      const category = await Category.find()
      const profile = await Profile.find()
      let staff = []

      if (R.isEmpty(idEmpl) || R.isNil(idEmpl)) {
        staff = await Staff.find()
      } else {
        staff = await Staff.findById(idEmpl)
      }
      if (!staff) {
        return res.status(400).json({ status: '1', message: 'Сотрудников нет' })
      }
      res.status(200).json({
        items: R.map((item) => ({
          id: item.id,
          fioEmpl: item.fioEmpl,
          education: item.education,
          prize: item.prize,
          profName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idProf))(profile) || { profName: '' })).profName,
          catName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idCat))(category) || { catName: '' })).catName,
        }), staff), status: '0'
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
