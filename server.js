const express = require('express')
const mysql = require("mysql2")
const app = express()
// const path = require('path')

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.static('public'));

const db = mysql.createConnection({
    host: "127.0.0.1",
    database: "hmj",
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

    // Home Route
    app.get("/", (req, res) => {
        res.render("index", { title: "HOME" })
    })

    app.get("/berita", (req, res) => {
    const sql = `
        SELECT 
            artikel.*, 
            kategori.nama_kategori, 
            TO_BASE64(picture) as base64Image 
        FROM artikel 
        JOIN kategori ON artikel.id_kategori = kategori.id_kategori
    `

        db.query(sql, (err, result) => {
            if (err) throw err
            
            const datas = result.map(item => ({
            ...item,
            base64Image: item.base64Image 
            ? `data:image/jpeg;base64,${item.base64Image}` 
            : null
        }))

            res.render("berita", { 
                datas: datas, 
                title: "ARTIKEL", 
                formatDate: (dateString) => {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    });
                }
            })
        })
    })
})

app.get("/departemen", (req, res) => {
    res.render("departemen", { title: "DEPARTEMEN" })
})

app.listen(8000, () => {
    console.log("server ready");
})