const path = require('path');
const router = require('express').Router();

const db = require("../../db/db.json");

router.get('/notes', (req, res) => {
    console.log(db)
    res.json(db);
});

module.exports = router;