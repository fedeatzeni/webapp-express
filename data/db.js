const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "movies_db"
})

module.exports = connection;