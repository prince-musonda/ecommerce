const mysql = require('mysql2')


const connectionPool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'ecommerce',
    password: '#1step@Time'
}).promise()

module.exports = connectionPool