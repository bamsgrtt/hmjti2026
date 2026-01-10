const express = require('express');
const router = express.Router();
const db = require('../db');

// Halaman list proker
router.get("/", (req, res) => {
   const limit = 8;
   const page = parseInt(req.query.page) || 1;
   const offset = (page - 1) * limit;

   const dataQuery = `
SELECT 
    k.id, 
    k.judul,
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

            res.render('proker', {
                title: 'PROGRAM KERJA',
                kegiatan: dataResult,
                currentPage: page,
                totalPages
            });
        });
    });
});

// Halaman detail proker
router.get('/program-kerja/:id', (req, res) => {
    const prokerId = req.params.id;

    const prokerQuery = `
    SELECT id, judul, deskripsi, tanggal, tahun
    FROM kegiatan
    WHERE id = ?
    `;

    const gambarQuery = `
    SELECT file_url
    FROM proker_gambar
    WHERE proker_id = ?
    LIMIT 4
    `;

    db.query(prokerQuery, [prokerId], (err, prokerResult) => {
        if (err) return res.status(500).send('Terjadi kesalahan server');
        if (prokerResult.length === 0) return res.status(404).send('Proker tidak ditemukan');

        db.query(gambarQuery, [prokerId], (err, gambarResult) => {
            if (err) return res.status(500).send('Terjadi kesalahan server');
            
            res.render('proker-detail', {
                proker: prokerResult[0],
                gambar: gambarResult
            });
        });
    });
});

module.exports = router;
