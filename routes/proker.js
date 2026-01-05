const express = require('express');
const router = express.Router();
const db = require('../db');

// Proker Route
router.get("/proker", (req, res) => {
   const limit = 8;
   const page = parseInt(req.query.page) || 1;
   const offset = (page - 1) * limit;

   const dataQuery = `
        SELECT 
            id, 
            judul,
            deskripsi,
            tanggal,
            tahun
       FROM kegiatan
       ORDER BY tanggal DESC 
       LIMIT ? OFFSET ?
   `;

   const countQuery = `
         SELECT COUNT(*) AS total FROM kegiatan
    `;

    db.query(countQuery, (err, countResult) => {
        if (err) throw err;

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [limit, offset], (err, dataResult) => {
            if (err) throw err;

            res.render('proker', {
                title: 'PROGRAM KERJA',
                kegiatan,
                currentPage: page,
                totalPages
            });
        });
    });
});

router.get('/gambar/:id', (req, res) => {
    const sql = `
    SELECT gambar
    FROM kegiatan
    WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err || result.length === 0 ) {
            return res.status(404).send('Gambar tidak ditemukan');
        }

        res.setHeader('Content-Type', 'image/jpeg');
        res.send(result[0].gambar);
    });
});

module.exports = router;