const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. HOME PAGE - Menampilkan Kegiatan dengan Pagination
router.get("/", (req, res) => {
    // Query 1: Ambil semua data anggota untuk kartu
    const anggotaQuery = `SELECT * FROM anggota WHERE id >= 2 ORDER BY id ASC`;

    // Query 2: Ambil daftar divisi unik untuk tombol filter
    const divisiQuery = `
        SELECT DISTINCT divisi
        FROM anggota
        ORDER BY
        CASE divisi
        WHEN 'BPH' THEN 1
        WHEN 'Administrasi' THEN 2
        WHEN 'Keilmuan' THEN 3
        WHEN 'Perhubungan' THEN 4
        WHEN 'Kominfo' THEN 5
        WHEN 'Kewirausahaan' THEN 6
        ELSE 99
        END
        `;

    db.query(anggotaQuery, (err, anggotaResult) => {
        if (err) return res.status(500).send("Database Error (Anggota)");

        db.query(divisiQuery, (err, divisiResult) => {
            if (err) return res.status(500).send("Database Error (Divisi)");

            res.render('departemen', {
                title: 'DEPARTEMEN',
                anggota: anggotaResult,
                daftarDivisi: divisiResult // Kirim data divisi ke EJS
            });
        });
    });
});

module.exports = router;
