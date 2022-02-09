const encrypt = require('../utils/encrypt');
const express = require('express');
const sql = require('../utils/sql');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.post('/', async (req, res) => {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send(constants.BODY_IS_MISSING);   

    let username = body.username;
    let email = body.email ? String(body.email).toLowerCase() : undefined;
    let password = body.password;

    // Something is missing
    if (!username) return res.status(400).send(constants.USERNAME_IS_MISSING);
    if (!email) return res.status(400).send(constants.EMAIL_IS_MISSING);
    if (!password) return res.status(400).send(constants.PASSWORD_IS_MISSING);

    // Input check
    if (!inputChecker.checkEmail(email)) return res.status(400).send(constants.EMAIL_IS_NOT_VALID);
    if (await sql.checkUserExists(email)) return res.status(400).send(constants.EMAIL_ALREADY_EXITS);

    // Password check
    let passwordCheck = inputChecker.checkPassword(password, username);
    if (passwordCheck) return res.status(400).send(passwordCheck);

    // Create Salt
    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(password, salt);

    // Add user and report success
    sql.addUser(username, email, hashedPassword, salt);

    // Report success
    res.status(200).send(constants.USER_ADD_SUCCESS);
});

module.exports = router;