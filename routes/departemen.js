const express = require('express');
const router = express.Router();

router.get("/departemen", (req, res) => {
        res.render("departemen", { title: "DEPARTEMEN" })
    })

module.exports = router;