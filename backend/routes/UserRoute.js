const express = require('express')
const { userRegister, userLogin,userProfile, logout } = require('../controllers/UserController')

const router = express.Router()


router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/profile',userProfile)
router.post('/logout',logout)

module.exports = router;