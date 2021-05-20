/* eslint-disable consistent-return */
const { Router } = require('express')
const R = require('ramda');

const Diagnosis = require('../../../models/Diagnosis')

const router = Router()


// /directories/diagnoses
router.get(
  '/diagnoses',
  async (req, res) => {
    try {
      const findDiagn = await Diagnosis.find()

      const sortById = R.sortBy(R.prop('id'))
      res.status(200).json({ status: '0', items: sortById(R.flatten(R.map((item) => item.diagnlist, findDiagn))), })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


module.exports = router
