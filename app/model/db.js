const mysql = require('mysql')

const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
})

const connect2 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb',
  port: '3000'
})

connect.query('CREATE DATABASE mydb', function (err, result) {
  if (err) {
    console.log('Database Exists')
  } else {
    console.log('Database created')
    result()
    connect.end()
  }
})

connect2.connect(function (err, result) {
  if (err) {
    console.error('error: ' + err.message)
  }
  console.log('Db Connected Success ')
  connect.end()
})

module.exports = connect2
