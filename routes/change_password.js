const express = require('express');
const encrypt = require('../utils/encrypt');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.put('/', async function(req, res) {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send("Empty body");    

    let email = body.email.toLowerCase();
    let password = body.password;
    let newPassword = body.new_password;

    // Something is missing
    if (!email) return res.status(400).send(constants.EMAIL_IS_MISSING);
    if (!password) return res.status(400).send(constants.PASSWORD_IS_MISSING);
    if (!newPassword) return res.status(400).send(constants.NEW_PASSWORD_IS_MISSING);

    // Input check
    if (!inputChecker.checkEmail(email)) return res.status(400).send(constants.EMAIL_IS_NOT_VALID);

    // Check Password
    let passwordCheck = inputChecker.checkPassword(newPassword, username);
    if (passwordCheck) return res.status(400).send(passwordCheck);

    // User does not exists
    let result = await sql.getLoginInformation(email);
    if (!result) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);

    // Verify password is correct
    if (!encrypt.verifyPassword(result.password, password, result.salt)) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);

    // Create new Salt password
    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(password, salt);
    
    // Update value in database
    await sql.changeUserPassword(email, hashedPassword, salt);

    // Report success
    res.status(200).send(constants.PASSWORD_CHANGE_SUCCESS);
});


module.exports = router;

