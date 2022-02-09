const encrypt = require('../utils/encrypt');
const express = require('express');
const sql = require('../utils/sql');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.post('/', async (req, res) => {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send({status: false, status_msg: constants.BODY_IS_MISSING});    

    let username = body.username;
    let email = body.email ? String(body.email).toLowerCase() : undefined;
    let password = body.password;

    // Something is missing
    if (!username) return res.status(400).send({status: false, status_msg: constants.USERNAME_IS_MISSING});
    if (!email) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_MISSING});
    if (!password) return res.status(400).send({status: false, status_msg: constants.PASSWORD_IS_MISSING});

    // Input check
    if (!inputChecker.checkEmail(email)) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_NOT_VALID});

    // Check if email already exists
    if (await sql.checkUserExists(email)) return res.status(400).send({status: false, status_msg: constants.EMAIL_ALREADY_EXITS});

    // Check if password is good enough
    let passwordCheck = inputChecker.checkPassword(password, username);
    if (passwordCheck) return res.status(400).send({status: false, status_msg: passwordCheck});

    // Create Salt
    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(password, salt);

    // Add user to database
    sql.addUser(username, email, hashedPassword, salt);

    // Report success
    return res.status(200).send({status: true, status_msg: constants.USER_ADD_SUCCESS});
});

module.exports = router;