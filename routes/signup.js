const encrypt = require('../utils/encrypt');
const express = require('express');
const sql = require('../utils/sql');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.post('/', async (req, res) => {
    let body = req.body;

    if (!Object.keys(body).length) {
        return res.send("Empty body");   
    }

    let username = body.username;
    let email = body.email ? String(body.email).toLowerCase() : undefined;
    let password = body.password;

    if (!username) return res.status(400).send(constants.USERNAME_IS_MISSING);
    if (!email) return res.status(400).send(constants.EMAIL_IS_MISSING);
    if (!password) return res.status(400).send(constants.PASSWORD_IS_MISSING);

    if (!inputChecker.checkEmail(email)) return res.status(400).send(constants.EMAIL_IS_NOT_VALID);
    if (await sql.checkUserExists(email)) return res.status(400).send(constants.EMAIL_ALREADY_EXITS);

    let passwordCheck = inputChecker.checkPassword(password, username);
    if (passwordCheck) return res.status(400).send(passwordCheck);

    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(password, salt);

    sql.addUser(username, email, hashedPassword, salt);

    res.status(200).send(constants.USER_ADD_SUCCESS);
});

module.exports = router;