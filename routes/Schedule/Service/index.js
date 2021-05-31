/* eslint-disable consistent-return */
const { Router } = require('express')
const moment = require('moment')
const R = require('ramda');
const Staff = require('../../../models/Staff')
const Service = require('../../../models/Service')
const ScheduleService = require('../../../models/ScheduleService')

const router = Router()


// /schedule/service/:petID
router.get(
  '/:petID',
  async (req, res) => {
    try {

      const staff = await Staff.find()
      const services = await Service.find()
      const findService = await ScheduleService.find({ petID: req.params.petID }).sort({ date: 'desc' })


      if (!findService) {
        return res.status(400).json({ status: '0', items: [] })
      }

      res.status(200).json({
        items: R.map((item) => ({
          id: item.id,
          serviceID: item.serviceID,
          service: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.serviceID))(services) || { name: '' })).name,
          date: moment(item.date).format('DD.MM.YYYY HH:mm').toString(),
          price: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.serviceID))(services) || { price: '' })).price,
          emplID: item.emplID,
          empl: JSON.parse(JSON.stringify(R.find(R.propEq('id', item.emplID))(staff) || { fioEmpl: '' })).fioEmpl,
        }), findService), status: '0'
      })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

module.exports = router
