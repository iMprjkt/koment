const User = require('../model/user')
const Comment = require('../model/comment')

module.exports = (req, res, next) => {
  let method = req.method
  Comment.getAuthor(req.params.id, (err, author) => {
    if (err) {
      res.status(401).json({
        error: 'Error Occured'
      })
    } else {
      if (req.params.userId === author.id) {
        next()
      } else {
        User.getUser(req.params.userId, (err, user) => {
          if (err) {
            res.status(401).json({
              error: 'Invalid User'
            })
          } else {
            if (method === 'PUT' && user.role > 2) {
              next()
            } else if (method === 'DELETE' && user.role > 1) {
              next()
            } else {
              res.status(401).json({
                error: 'Access Denied'
              })
            }
          }
        })
      }
    }
  })
}
