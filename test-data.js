const connect = require('./app/model/db')

const createUsers = `CREATE TABLE IF NOT EXISTS users(
   id INT(11) PRIMARY KEY AUTO_ INCREMENT,
   NAME VARCHAR(30) NOT NULL,
   logged_in DATETIME DEFAULT NULL,
   role INT(11) NOT NULL
)`

const createComments = `CREATE TABLE IF NOT EXISTS comments(
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    comment VARCHAR(255)NOT NULL,
    parent INT(11) DEFAULT NULL,
    author INT(11)NOT NULL,
    created_at DATETIME DEFAULT NULL
)`

try {
  connect.query(createUsers, function(err, results, fields) {
    if (err) {
      console.log(err.message)
    }
  })

  connect.query(createComments, function(err, results, fields) {
    if (err) {
      console.log(err.message)
    }
  })

  let user1 = `INSERT INTO users(name,role)
                   VALUES('user1',3)`

  let user2 = `INSERT INTO users(name,role)
                    VALUES('user2',2)`
  let user3 = `INSERT INTO users(name,role)
                    VALUES('user3',1)`

  let comment1 = `INSERT INTO comments(comment,author)
                        VALUES('First Comment',1)`

  let comment2 = `INSERT INTO comments(comment,author)
                        VALUES('Seconds Comment',2)`

  let comment3 = `INSERT INTO comments(comment,author)
                        VALUES('Third Comment',3)`

  let comment4 = `INSERT INTO comments(comment,author)
                        VALUES('Third Comment',1)`

  connect.query(user1)
  connect.query(user2)
  connect.query(user3)

  connect.query(comment1)
  connect.query(comment2)
  connect.query(comment3)
  connect.query(comment4)

  connect.end()
  console.log('All data and tables created Successfully')
} catch {
  console.log('Error Occured')
}
