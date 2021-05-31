/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');
const moment = require('moment')
const Staff = require('../../../models/Staff')
const Service = require('../../../models/Service')
const ScheduleService = require('../../../models/ScheduleService')
const ScheduleAppointment = require('../../../models/ScheduleAppointment')

const router = Router()


// /schedule/appointment/create
router.post(
  '/create',
  [
    check('emplID').notEmpty(),
    check('petID').notEmpty(),
    check('ownerID').notEmpty(),
    check('date').notEmpty(),
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
        emplID,
        petID,
        ownerID,
        date,
        serviceID,
      } = req.body

      const findAppointment = await ScheduleAppointment.find({ petID, date })
      const findAppointmentEmpl = await ScheduleAppointment.find({ petID, date, emplID })

      if (!R.isEmpty(findAppointment) || !R.isEmpty(findAppointmentEmpl)) {
        return res.status(400).json({ status: '1', message: 'Запись на прием невозможна' })
      }

      const newAppointment = new ScheduleAppointment({
        emplID,
        petID,
        ownerID,
        serviceID,
        date,
      })

      const addService = async(id) => {
        const newService = new ScheduleService({
          emplID,
          petID,
          ownerID,
          serviceID: id,
          appointmentID: newAppointment.id,
          date,
        })
        await newService.save()
    }

      if(serviceID){
        R.forEach((item) => {
          addService(item)
        },serviceID)
      }


      await newAppointment.save()

      res.status(200).json({ status: '0', message: 'Пациент записан на прием' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)


// /schedule/appointment/:petID
router.get(
  '/:petID',
  async (req, res) => {
    try {

      const staff = await Staff.find()
      const services = await Service.find()
      const findAppointment = await ScheduleAppointment.find({ petID: req.params.petID }).sort({ date: 'desc' })


      if (!findAppointment) {
        return res.status(400).json({ status: '0', items: [] })
      }

      const findService = (serviceList) => R.map((item) => item.name, R.filter((service) => R.includes(service.id, serviceList),services))

      res.status(200).json({
        items: R.map((item) => ({
          id: item.id,
          emplID:item.emplID,
          serviceID: item.serviceID,
          service: findService(item.serviceID),
          date: moment(item.date).format('DD.MM.YYYY HH:mm').toString(),
          empl: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.emplID))(staff) || { fioEmpl: '' })).fioEmpl,
        }), findAppointment), status: '0'
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
