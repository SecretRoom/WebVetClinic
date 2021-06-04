const { Router } = require('express')
const Category = require('../../models/Category')
const Profile = require('../../models/Profile')

const router = Router()

// /directories/profile
router.get(
  '/profile',
  async (req, res) => {
    try {
      const profile = await Profile.find()
      res.status(200).json({ items: profile, status: '0' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /directories/category
router.get(
  '/category',
  async (req, res) => {
    try {
      const category = await Category.find()
      res.status(200).json({ items: category, status: '0' })
    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)
  

module.exports = router