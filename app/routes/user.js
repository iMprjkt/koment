const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

router.get('/:id', userController.get_user)
router.post('/', userController.create_user)
router.post('/login/:id', userController.log_in_user)

module.exports = router
