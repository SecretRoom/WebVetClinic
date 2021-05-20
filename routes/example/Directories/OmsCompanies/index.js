/* eslint-disable consistent-return */
const { Router } = require('express')
const Oms_company = require('../../../../models/OmsCompany')

const router = Router()


// /directories/omsCompanies
router.get(
  '/omsCompanies',
  async (req, res) => {
    try {
      const findCompany = await Oms_company.find().sort({ name: 1 })

      res.status(200).json({ status: '0', items: findCompany })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


module.exports = router
