/* eslint-disable consistent-return */
const { Router } = require('express')
const Exam_type = require('../../../models/ExamType')

const router = Router()


// /directories/examTypes
router.get(
  '/examTypes',
  async (req, res) => {
    try {
      const findTypes = await Exam_type.find().sort({ name: 'asc' })

      res.status(200).json({ status: '0', items: findTypes })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


module.exports = router
