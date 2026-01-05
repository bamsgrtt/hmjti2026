const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
        res.render("departemen", { title: "DEPARTEMEN" })
    })

module.exports = router;