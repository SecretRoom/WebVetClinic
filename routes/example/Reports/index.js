/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const moment = require('moment')
const ScheduleAppointment = require('../../models/ScheduleAppointment')
const ScheduleAnalysis = require('../../models/ScheduleAnalysis')
const Examination = require('../../models/Examination')

const Patient = require('../../models/Patient')

const router = Router()



// /reports
router.post(
  '',
  [
    check('dateTo', 'Некорректные данные').notEmpty(),
    check('idEmpl', 'Некорректные данные').notEmpty(),
    check('dateFor', 'Некорректные данные').notEmpty(),
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
        dateTo,
        idEmpl,
        dateFor,
      } = req.body

      const scheduleAnalysis = await ScheduleAnalysis.find({ idEmpl })
      const scheduleAppointment = await ScheduleAppointment.find({ idEmpl })
      const examList = await Examination.find()
      const examCreateList = await Examination.find({ idCreateEmpl: idEmpl })
      const examEditList = await Examination.find({ idEditEmpl: idEmpl })

      const ticketsList = []

      R.forEach((exam) => R.forEach((ticket) => { if (ticket.idEmplRef === idEmpl) ticketsList.push(ticket) }, exam.dataExam?.tickets), examList)


      const analyzesFilter = R.filter((item) => moment(item.dateCreate).isBetween(dateTo, dateFor, undefined, '[]'), scheduleAnalysis)
      const adoptedPatFilter = R.filter((item) => moment(item.date).isBetween(dateTo, dateFor, undefined, '[]'), scheduleAppointment)
      const ticketsFilter = R.filter((item) => moment(item.dateCreate).isBetween(dateTo, dateFor, undefined, '[]'), ticketsList)
      const createExamFilter = R.filter((item) => moment(item.dateExam).isBetween(dateTo, dateFor, undefined, '[]'), examCreateList)
      const editExamFilter = R.filter((item) => moment(item.editDateExam).isBetween(dateTo, dateFor, undefined, '[]'), examEditList)

      const analyzes = R.values(R.mapObjIndexed((num, key) => ({ date: key, count: num }), R.countBy(R.toLower)(R.map((item) => moment(item.dateCreate).format('DD.MM.YYYY'), analyzesFilter))))
      const adoptedPat = R.values(R.mapObjIndexed((num, key) => ({ date: key, count: num }), R.countBy(R.toLower)(R.map((item) => moment(item.date).format('DD.MM.YYYY'), adoptedPatFilter))))
      const tickets = R.values(R.mapObjIndexed((num, key) => ({ date: key, count: num }), R.countBy(R.toLower)(R.map((item) => moment(item.dateCreate).format('DD.MM.YYYY'), ticketsFilter))))
      const createExam = R.values(R.mapObjIndexed((num, key) => ({ date: key, count: num }), R.countBy(R.toLower)(R.map((item) => moment(item.dateExam).format('DD.MM.YYYY'), createExamFilter))))
      const editExam = R.values(R.mapObjIndexed((num, key) => ({ date: key, count: num }), R.countBy(R.toLower)(R.map((item) => moment(item.editDateExam).format('DD.MM.YYYY'), editExamFilter))))

      res.status(200).json({
        status: '0', items: [{
          countAnalyzes: analyzesFilter.length,
          countAdoptedPat: adoptedPatFilter.length,
          countTickets: ticketsFilter.length,
          countCreateExam: createExamFilter.length,
          countEditExam: editExamFilter.length,
          analyzes,
          adoptedPat,
          tickets,
          createExam,
          editExam,
        }]
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
