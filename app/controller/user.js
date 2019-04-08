const User = require('../model/user')

exports.create_user = (req, res) => {
  const newUser = new User(req.body)

  if (!newUser.name || !newUser.role) {
    res.status(404).json({
      error: true,
      message: 'Provide user details, please'
    })
  } else {
    User.createUser(newUser, (err, user) => {
      if (err) {
        res.status(401).send(err)
      }
      res.status(201).json(user)
    })
  }
}

exports.log_in_user = function (req, res) {
  User.logInUser(req.params.id, (err, user) => {
    if (err) {
      res.status(401).send(err)
    }
    res.status(200).json(user)
  })
}

exports.get_user = function (req, res) {
  User.getUser(req.params.id, (err, user) => {
    if (err) {
      res.status(401).send(err)
    }
    res.status(200).json(user)
  })
}
