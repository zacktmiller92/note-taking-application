const path = require('path');
const fs = require("fs");

const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const db = require("../../db/db.json");

router
    .route('/notes')
    .get((req, res) => {
        res.json(db);
    })
    .post((req, res) => {
        // add unique id
        req.body.id = uuidv4();
        // update db
        db.push(req.body);
        // write to db
        fs.writeFileSync(
            path.join(__dirname, "../../db/db.json"),
            JSON.stringify(db, null, 2)
        );
        // render response on screen
        res.render(res)

    });

module.exports = router;