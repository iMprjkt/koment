const sql = require('./db')

const User = function (user) {
  ;(this.name = user.name), (this.loggedIn = null), (this.role = user.role)
}

User.createUser = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

User.logInUser = (id, result) => {
  const loggedIn = new Date()
  sql.query(
    'UPDATE users SET loggedIn = ? WHERE id = ?',
    [loggedIn, id],
    (err, res) => {
      if (err) {
        ;``
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

User.getUser = (userId, result) => {
  sql.query('SELECT * FROM `users` WHERE `id` = ?', [userId], (err, res) => {
    if (err) {
      result(err, null)
    } else {
      result(null, res[0])
    }
  })
}

module.exports = User
