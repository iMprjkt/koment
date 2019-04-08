const express = require('express')
const router = express.Router()

const access = require('../middleware/access')
const commentController = require('../controller/comment')

router.get('/user/:userId', commentController.get_comment_by_user)
router.post('/', commentController.create_a_comment)
router.delete('/:id/:userId', access, commentController.delete_a_comment)
router.put('/:id/:userId', access, commentController.update_a_comment)

module.exports = router
