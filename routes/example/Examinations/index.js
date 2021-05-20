/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const moment = require('moment')
const Examination = require('../../models/Examination')
const Staff = require('../../models/Staff')
const ExamType = require('../../models/ExamType')

const router = Router()


// /examination/create
router.post(
  '/create',
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при создании осмотра',
        })
      }

      const {
        idExamType,
        dateExam,
        idCreateEmpl,
        idPat,
      } = req.body

      const newExamination = new Examination({
        idExamType,
        idPat,
        dateExam,
        idCreateEmpl,
        editDateExam: '',
        idEditEmpl: '',
        dataExam: {
          tickets: []
        },
      })

      const newData = await newExamination.save()

      res.status(200).json({ status: '0', message: 'Осмотр создан', id: newData.id, newData })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /examination
router.post(
  '',
  async (req, res) => {
    try {
      const {
        idPat,
      } = req.body


      const examList = await Examination.find({ idPat }).sort({ dateExam: "desc" })
      const emplList = await Staff.find()
      const examTypeList = await ExamType.find()

      const findEmpl = (id) => {
        const fioEmpl = JSON.parse(JSON.stringify(R.find(R.propEq('idEmpl', id))(emplList))).fioEmpl
        const newFio = fioEmpl.match(/[a-zа-я]+/gi)
        if (newFio?.length === 1) return newFio[0]
        if (newFio?.length === 2) return `${newFio[0]} ${newFio[1][0]}.`
        if (newFio?.length === 3) return `${newFio[0]} ${newFio[1][0]}. ${newFio[2][0]}.`
      }

      const findExamType = (id) => JSON.parse(JSON.stringify(R.find(R.propEq('id', id))(examTypeList))).name

      res.status(200).json({
        status: '0',
        items: R.map((item) => ({
          id: item.id,
          dateExam: moment(item.dateExam).format('DD.MM.YYYY HH:mm').toString(),
          editDateExam: item.editDateExam ? moment(item.editDateExam).format('DD.MM.YYYY HH:mm').toString() : '',
          fioCreateEmpl: findEmpl(item.idCreateEmpl),
          fioEditEmpl: item.idEditEmpl ? findEmpl(item.idEditEmpl) : '',
          examTypeName: findExamType(item.idExamType),
          idExamType: item.idExamType,
          dataExam: item.dataExam,
        }), examList),
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /examination/update
router.post(
  '/update',
  [
    check('dataExam', 'Пустые дынные').isObject().notEmpty(),
    check('idEditEmpl', 'Пустой сотрудник').isString().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при обновлении осмотра',
        })
      }

      const {
        idExam,
        idEditEmpl,
        dataExam,
      } = req.body
      const prevDataExam = await Examination.findById(idExam)
      const findExam = await Examination.findByIdAndUpdate(idExam, {
        dataExam: R.mergeRight(
          prevDataExam.dataExam,
          dataExam,
        ),
        idEditEmpl,
        editDateExam: new Date(),
      })

      if (findExam) res.status(200).json({ status: '0', message: 'Осмотр обновлен' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

module.exports = router
