/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const Staff = require('../../../models/Staff')
const Category = require('../../../models/Category')
const Department = require('../../../models/Department')
const Position = require('../../../models/Position')
const Profile = require('../../../models/Profile')

const router = Router()


// /api/directories/staff/register
// eslint-disable-next-line consistent-return
router.post(
  '/staff/register',
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
        idEmpl,
        fioEmpl,
        birthday,
        phone,
        email,
        idDept,
        idPos,
        idProf,
        idCat,
      } = req.body
      const findEmpl = await Staff.findOne({ idEmpl })

      if (findEmpl) {
        return res.status(400).json({ status: '1', message: 'Такой сотрудник уже существует' })
      }

      const newStaff = new Staff({
        idEmpl,
        fioEmpl,
        birthday,
        phone,
        email,
        idDept,
        idPos,
        idProf,
        idCat,
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
  '/staff',
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
      const department = await Department.find()
      const position = await Position.find()
      const profile = await Profile.find()
      let staff = []

      if (R.isEmpty(idEmpl)) {
        staff = await Staff.find()
      } else {
        staff = await Staff.find({ idEmpl: { $in: idEmpl } })
      }
      if (!staff) {
        return res.status(400).json({ status: '1', message: 'Сотрудников нет' })
      }
      res.status(200).json({
        items: R.map((item) => ({
          id: item.id,
          idEmpl: item.idEmpl,
          fioEmpl: item.fioEmpl,
          birthday: item.birthday,
          phone: item.phone,
          email: item.email,
          deptName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idDept))(department) || { deptName: '' })).deptName,
          posName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idPos))(position) || { posName: '' })).posName,
          profName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idProf))(profile) || { profName: '' })).profName,
          catName: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.idCat))(category) || { catName: '' })).catName,
        }), staff), status: '0'
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
