const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
        res.render("departemen", { title: "DEPARTEMEN" })
});

router.get("/:divisi", (req, res) => {
    res.render("anggota", {
        divisi: req.params.divisi
    });
});
module.exports = router;