const express = require('express');
const sql = require('../utils/sql');
const encrypt = require('../utils/encrypt');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.get('/', async function(req, res) {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send("Empty body");    

    let email = body.email.toLowerCase();
    let password = body.password;

    // Something is missing
    if (!email) return res.status(400).send(constants.EMAIL_IS_MISSING);
    if (!password) return res.status(400).send(constants.PASSWORD_IS_MISSING);

    // Input check
    if (!inputChecker.checkEmail(email)) return res.status(400).send(constants.EMAIL_IS_NOT_VALID);

    // User does not exists
    let result = await sql.getLoginInformation(email);
    if (!result) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);

    // Verify password is correct
    if (!encrypt.verifyPassword(result.password, password, result.salt)) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);
    
    // Get user information and returns (in this case just returns the username)
    let userInformation = await sql.getUserInformation(email);

    // Report success
    return res.status(200).send(userInformation);
});

module.exports = router;