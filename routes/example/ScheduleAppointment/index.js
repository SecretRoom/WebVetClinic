/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const moment = require('moment')
const ScheduleAppointment = require('../../models/ScheduleAppointment')

const Patient = require('../../models/Patient')

const router = Router()


// /schedule_appointment/create
router.post(
  '/create',
  [
    check('date', 'Некорректные данные').notEmpty(),
    check('idPat', 'Некорректные данные').notEmpty(),
    check('idEmpl', 'Некорректные данные').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          status: '1',
          message: 'Некорректные данные при записи пациента',
        })
      }

      const {
        date,
        idPat,
        idEmpl,
      } = req.body

      const findAppointmentStaff = await ScheduleAppointment.find({ idEmpl, date })

      if (!R.isEmpty(findAppointmentStaff)) {
        return res.status(400).json({ status: '1', message: 'Время приема занято' })
      }
      const findAppointmentPatient = await ScheduleAppointment.find({ idEmpl, date })

      if (!R.isEmpty(findAppointmentPatient)) {
        return res.status(400).json({ status: '1', message: 'Пациент записан к другому специалисту на данное время' })
      }

      const newScheduleAppointment = new ScheduleAppointment({
        date,
        idPat,
        idEmpl,
      })

      await newScheduleAppointment.save()

      res.status(200).json({ status: '2', message: 'Пациент записан на прием' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

// /schedule_appointment
router.post(
  '',
  async (req, res) => {
    try {
      const {
        date,
        idEmpl,
      } = req.body
      const patList = await Patient.find()

      const findPat = (id) => {
        const patData = JSON.parse(JSON.stringify(R.find(R.propEq('id', id))(patList) || {}))
        return patData
      }

      const scheduleAppointment = await ScheduleAppointment.find({ idEmpl })
      const filterSchedule = R.filter(
        (item) => moment(item.date).format('DD.MM.YYYY').toString() === moment(date).format('DD.MM.YYYY').toString(),
        scheduleAppointment
      )
      R.map(({ _doc }) => ({
        idPat: _doc.idPat,
        fioPat: findPat(_doc.idPat).fullName,
        date: _doc.date,
      }), R.filter(
        (item) => moment(item.date).format('DD.MM.YYYY').toString() === moment(date).format('DD.MM.YYYY').toString(),
        scheduleAppointment
      ))

      const planned = R.map(({ _doc }) => ({
        idPat: _doc.idPat,
        fioPat: findPat(_doc.idPat).fullName,
        date: moment(_doc.date).format('HH:mm'),
      }), R.filter((item) => {
        if (moment(new Date()).format('DD.MM.YYYY').toString() === moment(date).format('DD.MM.YYYY').toString()) {
          return moment(item.date).isSameOrBefore(moment(date).add(15, 'm'), 'minute')
        }
      }, filterSchedule))

      const adopted = R.map(({ _doc }) => ({
        idPat: _doc.idPat,
        fioPat: findPat(_doc.idPat).fullName,
        date: moment(_doc.date).format('HH:mm'),
      }), R.filter((item) => {
        if (moment(new Date()).format('DD.MM.YYYY').toString() === moment(date).format('DD.MM.YYYY').toString()) {
          return moment(item.date).isAfter(moment(date).add(15, 'm'), 'minute')
        }
        return item
      }, filterSchedule))

      res.status(200).json({
        status: '0', items: [{
          planned: R.sort(R.ascend(R.prop('date')), planned),
          adopted: R.sort(R.ascend(R.prop('date')), adopted),
        }]
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

// /schedule_appointment/remove/:id
router.get(
  '/remove/:id',
  async (req, res) => {
    try {
      const scheduleAppointment = await ScheduleAppointment.findByIdAndDelete(req.params.id)

      if (scheduleAppointment) res.status(200).json({ status: '2', message: 'Прием отменен' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

module.exports = router
