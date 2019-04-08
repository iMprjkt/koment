const sql = require('./db')
const User = require('./user')

const Comment = function (comment) {
  ;(this.comment = comment.comment),
  (this.parent = null),
  (this.author = comment.author),
  (this.created_at = new Date())
}

Comment.createComment = (newComment, result) => {
  sql.query('INSERT INTO comments SET ?', newComment, (err, res) => {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Comment.getCommentByUser = (userId, result) => {
  sql.query(
    'SELECT * FROM `comments` WHERE `author` = ?',
    [userId],
    (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

Comment.editById = (id, comment, result) => {
  sql.query(
    'UPDATE comments SET comment = ? WHERE id = ?',
    [comment.comment, id],
    (err, res) => {
      if (err) {
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

Comment.remove = function (id, result) {
  sql.query('DELETE FROM comments WHERE id = ? ', id, (err, res) => {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

Comment.getAuthor = function (id, result) {
  sql.query('Select author from comments where id = ?', [id], (err, res) => {
    if (err) {
      result(err, null)
    } else {
      let authorId = res[0].author
      result(null, res)
      User.getUser(authorId, (err, user) => {
        if (err) {
          result(err, null)
        } else {
          let user = users[0]
          result(null, user)
        }
      })
    }
  })
}

module.exports = Comment
