const encrypt = require('../encrypt');
const express = require('express');
const sql = require('../sql');

const router = express.Router();

router.post('/', async (req, res) => {
    if (!Object.keys(req.body).length) {
        return res.send("Empty body");   
    }

    if (!req.body.username) return res.status(400).send("Username is missing");
    if (!req.body.email) return res.status(400).send("Email is missing");
    if (!req.body.password) return res.status(400).send("Password is missing");

    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(req.body.password, salt);
    console.log(hashedPassword);

    let userExists = await sql.checkUserExists(req.body.email);
    if (userExists._results.length == 0) {
        return;
    }

    console.log(2);

    res.send(hashedPassword);
});

module.exports = router;