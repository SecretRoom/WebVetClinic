/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const Patient = require('../../models/Patient')
const Oms_company = require('../../models/OmsCompany')

const router = Router()


// /patients/register
// eslint-disable-next-line consistent-return
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('phone', 'Длина = 11, начало c 8 или 7')
      .isLength({ min: 11, max: 11 })
      .custom((value) => (R.startsWith('8', value) || R.startsWith('7', value)) && R.isNil(value.match(/\D/))),
    check('oms', 'Длина ОМС должна быть 16')
      .isLength({ min: 16, max: 16 }),
    check('sex')
      .custom((value) => R.includes(value, ['м', 'ж']))
      .isLength({ min: 1, max: 1 }),
    check('birthday')
      .custom((value) =>
        value.split(/\d?\d.\d?\d.\d{4/)
        && R.includes(+value.split('.')[0], R.range(1, 32))
        && R.includes(+value.split('.')[1], R.range(1, 13))
      ),
    check('snils', 'Длина СНИЛС должна быть 11')
      .isLength({ min: 11, max: 11 })
      .custom((value) => value.match(/\d{11}/) && R.isNil(value.match(/\D/)))
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при регистрации пациента',
        })
      }

      const {
        surname,
        name,
        patronymic,
        birthday,
        sex,
        phone,
        email,
        oms,
        omsCompany,
        snils,
      } = req.body
      const findPatient = await Patient.findOne({ oms: oms })
      const findCompany = await Oms_company.findById(omsCompany)

      if (!findCompany) return res.status(400).json({ status: '1', message: 'Не найдена страховая компания' })

      if (findPatient) {
        return res.status(400).json({ status: '1', message: 'Такой пациент уже существует' })
      }

      const newPatient = new Patient({
        fullName: `${surname} ${name}${patronymic && ` ${patronymic}`}`,
        shortName: `${surname} ${name[0]}.${patronymic && `${patronymic[0]}.`}`,
        surname,
        name,
        patronymic,
        birthday,
        sex,
        phone,
        email,
        oms,
        omsCompany,
        snils,
      })

      await newPatient.save()

      res.status(201).json({ status: '2', message: 'Пациент создан' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /patients/:id
router.get(
  '/:id',
  async (req, res) => {
    try {
      const findPatient = await Patient.findById(req.params.id)

      if (!findPatient) {
        return res.status(400).json({ status: '1', message: 'Такого пациента нет' })
      }

      res.status(200).json({ status: '0', items: [findPatient] })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)
// /patients/update/:id
router.post(
  '/update/:id',
  async (req, res) => {
    try {
      const findPatient = await Patient.findByIdAndUpdate(req.params.id, req.body.newData)
      if (!findPatient) {
        return res.status(400).json({ status: '1', message: 'Ошибка обновления данных' })
      }

      res.status(200).json({ status: '0', message: 'Данные пациента обновлены' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /patients
router.post(
  '',
  async (req, res) => {
    try {
      let findData = {}
      R.forEachObjIndexed((value, key) => {
        if (!R.isNil(value)) {
          findData = R.mergeAll([findData, { [key]: new RegExp(value, 'i') }])
        }
      }, req.body)
      const findPatient = R.isEmpty(req.body)
        ? await Patient.find().sort({ surname: 1 })
        : await Patient.find(findData).sort({ surname: 1 })

      res.status(200).json({ status: '0', items: findPatient })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


module.exports = router
