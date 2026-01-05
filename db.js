const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "127.0.0.1",
    database: "hmjc7517_db_hmjpolije",
    user: "root",
    password: "",
    port: 3306
})

db.connect((err) => {
    if (err) {
        console.log("Dataabase connection error:", err)
        return
    } 
    console.log("Database connected")   
})

module.exports = db