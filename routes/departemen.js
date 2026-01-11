const express = require('express');
const router = express.Router();

const divisiValid = [
    "BPH",
    "Administrasi",
    "Keilmuan",
    "Perhubungan",
    "Kominfo",
    "Kewirausahaan"
]

router.get("/", (req, res) => {
        res.render("departemen", { title: "DEPARTEMEN" })
});

router.get("/:divisi", (req, res) => {

   const divisi = req.params.divisi;

  if (!divisiValid.includes(divisi)) {
    return res.status(404).render("404");
  }

  res.render("anggota", {
    divisi
    });
});
module.exports = router;