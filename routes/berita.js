const express = require('express');
const router = express.Router();
const db = require('../db');

 router.get("/berita", (req, res) => {
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

    module.exports = router;