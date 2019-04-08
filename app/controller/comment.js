const Comment = require('../model/comment')

exports.create_a_comment = (req, res) => {
  const newComment = new Comment(req.body)

  if (!newComment.comment || !newComment.author) {
    res.status(404).json({
      error: true,
      message: 'Please provide comment details'
    })
  } else {
    Comment.createComment(newComment, (err, comment) => {
      if (err) {
        res.error(err)
      }
      res.status(201).json(comment)
    })
  }
}

exports.update_a_comment = function (req, res) {
  Comment.editById(req.params.id, req.body, (err, comment) => {
    if (err) {
      res.status(404).send(err)
    }
    res.status(200).json({
      message: 'Comment updated successfully'
    })
  })
}

exports.get_comment_by_user = function (req, res) {
  Comment.getCommentByUser(req.params.userId, function (err, comment) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(comment)
  })
}

exports.delete_a_comment = function (req, res) {
  Comment.remove(req.params.id, function (err, comment) {
    if (err) {
      res.status(404).send(err)
    }
    res.status(200).json({
      message: 'Comment deleted successfully'
    })
  })
}
