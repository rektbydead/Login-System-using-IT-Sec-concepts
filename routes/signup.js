const encrypt = require('../utils/encrypt');
const express = require('express');
const sql = require('../utils/sql');

const router = express.Router();

router.post('/', async (req, res) => {
    let body = req.body;

    if (!Object.keys(body).length) {
        return res.send("Empty body");   
    }

    if (!body.username) return res.status(400).send("Username is missing");
    if (!body.email) return res.status(400).send("Email is missing");
    if (!body.password) return res.status(400).send("Password is missing");

    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(body.password, salt);

    let userExists = await sql.checkUserExists(body.email);

    if (userExists == true) {
        res.status(400).send({ err: "User already exits."})
        return;
    }

    sql.addUser(body.username, body.email, hashedPassword, salt);
    res.status(200).send({ err: "Add successfully."});
});

module.exports = router;