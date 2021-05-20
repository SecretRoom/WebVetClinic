/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const moment = require('moment')
const ScheduleAnalysis = require('../../models/ScheduleAnalysis')
const Analysis = require('../../models/Analysis')
const Staff = require('../../models/Staff')
const Patient = require('../../models/Patient')

const router = Router()


// /schedule_analyzes/create
router.post(
  '/create',
  [
    check('date', 'Некорректные данные').notEmpty(),
    check('count', 'Некорректные данные').notEmpty(),
    check('idPat', 'Некорректные данные').notEmpty(),
    check('idExam', 'Некорректные данные').notEmpty(),
    check('idEmpl', 'Некорректные данные').notEmpty(),
    check('idAnalysis', 'Некорректные данные').notEmpty(),
  ],
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
        date,
        count,
        idPat,
        idExam,
        idEmpl,
        idAnalysis,
      } = req.body

      const findAnalysis = await ScheduleAnalysis.find({ date })

      if (!R.isEmpty(findAnalysis)) {
        return res.status(400).json({ status: '1', message: 'Время анализа занято' })
      }

      const newScheduleAnalysis = new ScheduleAnalysis({
        date: new Date(date),
        dateCreate: new Date(),
        count,
        idPat,
        idExam,
        idEmpl,
        idAnalysis,
      })

      await newScheduleAnalysis.save()

      res.status(200).json({ status: '2', message: 'Пациент записан на анализ' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /schedule_analyzes
router.post(
  '',
  async (req, res) => {
    try {
      const {
        idPat,
      } = req.body
      const analysisList = await Analysis.find()
      const emplList = await Staff.find()
      const patList = await Patient.find()

      const findEmpl = (id) => {
        const fioEmpl = JSON.parse(JSON.stringify(R.find(R.propEq('idEmpl', id))(emplList))).fioEmpl
        const newFio = fioEmpl.match(/[a-zа-я]+/gi)
        if (newFio?.length === 1) return newFio[0]
        if (newFio?.length === 2) return `${newFio[0]} ${newFio[1][0]}.`
        if (newFio?.length === 3) return `${newFio[0]} ${newFio[1][0]}.${newFio[2][0]}.`
      }

      const findPat = (id) => {
        const patData = JSON.parse(JSON.stringify(R.find(R.propEq('id', id))(patList) || {}))
        return patData
      }

      const findAnalysis = (id) => {
        const analysis = JSON.parse(JSON.stringify(R.find(R.propEq('id', id))(analysisList)))
        return analysis
      }



      if (R.isNil(idPat) || R.isEmpty(idPat)) {
        const scheduleAnalyzes = await ScheduleAnalysis.find().sort({ date: 'asc' })

        return res.status(200).json({
          status: '0', items: R.map(({ _doc }) => ({
            ..._doc,
            __v: undefined,
            fioPat: findPat(_doc.idPat).shortName,
            fioEmpl: findEmpl(_doc.idEmpl),
            nameAnalysis: findAnalysis(_doc.idAnalysis).name,
            sum: +findAnalysis(_doc.idAnalysis).price * +_doc.count,
          }), scheduleAnalyzes)
        })
      }

      const scheduleAnalyzes = await ScheduleAnalysis.find({ idPat }).sort({ date: 'asc' })

      res.status(200).json({
        status: '0', items: R.map(({ _doc }) => ({
          ..._doc,
          __v: undefined,
          fioPat: findPat(_doc.idPat).shortName,
          fioEmpl: findEmpl(_doc.idEmpl),
          nameAnalysis: findAnalysis(_doc.idAnalysis).name,
          sum: +findAnalysis(_doc.idAnalysis).price * +_doc.count,
        }), scheduleAnalyzes)
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /schedule_analyzes/remove/:id
router.get(
  '/remove/:id',
  async (req, res) => {
    try {
      const scheduleAnalyzes = await ScheduleAnalysis.findByIdAndDelete(req.params.id)

      if (scheduleAnalyzes) res.status(200).json({ status: '2', message: 'Анализ отменен' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

module.exports = router
