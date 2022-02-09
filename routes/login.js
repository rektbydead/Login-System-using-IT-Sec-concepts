const express = require('express');
const sql = require('../utils/sql');
const encrypt = require('../utils/encrypt');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.get('/', async function(req, res) {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send({status: false, status_msg: constants.BODY_IS_MISSING});    

    let email = body.email.toLowerCase();
    let password = body.password;

    // Something is missing
    if (!email) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_MISSING});
    if (!password) return res.status(400).send({status: false, status_msg: constants.PASSWORD_IS_MISSING});

    // Input check
    if (!inputChecker.checkEmail(email)) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_NOT_VALID});

    // Get user login info, return if user does not exists
    let result = await sql.getLoginInformation(email);
    if (!result) return res.send({status: false, status_msg: constants.EMAIL_PASSWORD_NOT_CORRECT});

    // Verify if password is correct
    if (!encrypt.verifyPassword(result.password, password, result.salt)) return res.send({status: false, status_msg: constants.EMAIL_PASSWORD_NOT_CORRECT});
    
    // Get user information from database
    let userInformation = await sql.getUserInformation(email);

    // Report success and success userInformation
    return res.status(200).send({status: true, status_msg: constants.LOGIN_SUCCESS, info: userInformation});
});

module.exports = router;