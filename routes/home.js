const express = require('express');
const router = express.Router();
const db = require('../db');

const divisiValid = [
    "BPH",
    "Administrasi",
    "Keilmuan",
    "Perhubungan",
    "Kominfo",
    "Kewirausahaan"
];

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

    db.query(countQuery, (err, countResult) => {
        if (err) return res.status(500).send("Database Error (Count)");

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataQuery, [limit, offset], (err, dataResult) => {
            if (err) return res.status(500).send("Database Error (Data)");

            res.render('index', {
                title: 'HOME PAGE',
                kegiatan: dataResult,
                currentPage: page,
                totalPages: totalPages
            });
        });
    });
});

// 2. DIVISI PAGE - Menampilkan Anggota per Divisi
router.get("/anggota/:divisi", (req, res) => {
    const divisiParam = req.params.divisi;

    // Mencari apakah divisi yang diketik di URL ada di array divisiValid (Abaikan besar/kecil huruf)
    const namaDivisi = divisiValid.find(d => d.toLowerCase() === divisiParam.toLowerCase());

    if (!namaDivisi) {
        return res.status(404).render("404", { title: "404 - Not Found" });
    }

    res.render("anggota", {
        divisi: namaDivisi,
        title: `DIVISI ${namaDivisi.toUpperCase()}`
    });
});

module.exports = router;
