const path = require('path');
const fs = require("fs");

const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const db = require("../../db/db.json");

let readNotes = () => {
    const notes = fs.readFileSync(
        path.join(__dirname, "../../db/db.json"),
        'utf-8'
    );

    return JSON.parse(notes);
}

router
    .route('/notes')
    .get((req, res) => {
        let db = readNotes()
        res.json(db);
    })
    .post((req, res) => {
        let db = readNotes()
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
        res.json(req.body)

    })

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    let db = readNotes()
    let deletedDb = db.filter(element => {
        return element.id != id;
    })

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(deletedDb, null, 2)
    );

    res.json({ ok: true });

})

module.exports = router;