const express = require('express');
const router = express.Router();
const db = require('../db')

router.get("/", (req, res) => {
        // 1. Definisikan pagination (ambil dari query string, misal: ?page=1)
    const page = parseInt(req.query.page) || 1;
    const limit = 6; // Jumlah data per halaman
    const offset = (page - 1) * limit;
         const dataQuery = `
    SELECT 
        k.id, 
        k.judul,
        k.divisi,
        k.deskripsi,
        k.tanggal,
        k.tahun,
        (
        SELECT file_url 
        FROM proker_gambar pg 
        WHERE pg.proker_id = k.id 
        LIMIT 1
        ) AS thumbnail
    FROM kegiatan k
    ORDER BY k.tanggal DESC
    LIMIT ? OFFSET ?
    `;

    const countQuery = `SELECT COUNT(*) AS total FROM kegiatan`;

        db.query(countQuery, (err, countResult) => {
            if (err) throw err;

            const totalItems = countResult[0].total;
            const totalPages = Math.ceil(totalItems / limit);

            db.query(dataQuery, [limit, offset], (err, dataResult) => {
                if (err) throw err;

                res.render('index', {
                    title: 'HOME PAGE',
                    kegiatan: dataResult,
                    currentPage: page,
                    totalPages
                });
            });
        });
    })

module.exports = router;