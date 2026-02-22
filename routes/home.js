const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. HOME PAGE - Menampilkan Kegiatan dengan Pagination
router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    const dataQuery = `
        SELECT k.id, k.judul, k.divisi, k.deskripsi, k.tanggal, k.tahun,
        (SELECT file_url FROM proker_gambar pg WHERE pg.proker_id = k.id LIMIT 1) AS thumbnail
        FROM kegiatan k
        ORDER BY k.tanggal DESC
        LIMIT ? OFFSET ?
    `;

    const countQuery = `SELECT COUNT(*) AS total FROM kegiatan`;

    const anggotaQuery = `
        SELECT * FROM anggota
        WHERE id BETWEEN 2 AND 7`;


    db.query(countQuery, (err, countResult) => {
        if (err) return res.status(500).send("Database Error (Count)");

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [limit, offset], (err, dataResult) => {
            if (err) return res.status(500).send("Database Error (Data)");
        
        db.query(anggotaQuery, (err, anggotaResult) => {
            if (err) 
                return res.status(500).send("Database Error (Anggota)");
            
            res.render('index', {
                title: 'HOME PAGE',
                kegiatan: dataResult,
                anggota: anggotaResult,
                currentPage: page,
                totalPages: totalPages
                });
            });
        });
    });
});


module.exports = router;
