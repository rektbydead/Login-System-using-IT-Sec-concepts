const express = require('express');
const encrypt = require('../utils/encrypt');
const constants = require('../utils/constants');
const inputChecker = require('../utils/input_checker');

const router = express.Router();

router.put('/', async function(req, res) {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send({status: false, status_msg: constants.BODY_IS_MISSING});    

    let email = body.email.toLowerCase();
    let password = body.password;
    let newPassword = body.new_password;

    // Something is missing
    if (!email) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_MISSING});
    if (!password) return res.status(400).send({status: false, status_msg: constants.PASSWORD_IS_MISSING});
    if (!newPassword) return res.status(400).send({status: false, status_msg: constants.NEW_PASSWORD_IS_MISSING});

    // Input check 
    if (!inputChecker.checkEmail(email)) return res.status(400).send({status: false, status_msg: constants.EMAIL_IS_NOT_VALID});

    // Check if new password is good enough
    let passwordCheck = inputChecker.checkPassword(newPassword, username);
    if (passwordCheck) return res.status(400).send({status: false, status_msg: passwordCheck});

    // Get user info, return if user does not exists
    let result = await sql.getLoginInformation(email);
    if (!result) return res.send({status: false, status_msg: constants.EMAIL_PASSWORD_NOT_CORRECT});

    // Verify if old password is correct
    if (!encrypt.verifyPassword(result.password, password, result.salt)) return res.send({status: false, status_msg: constants.EMAIL_PASSWORD_NOT_CORRECT});

    // Create new Salt password and encrypt password
    let salt = encrypt.createSalt();
    let hashedPassword = encrypt.hashPassword(password, salt);
    
    // Update password and salt in database
    sql.changeUserPassword(email, hashedPassword, salt);

    // Report success
    return res.status(200).send({status: true, status_msg: constants.PASSWORD_CHANGE_SUCCESS});
});


module.exports = router;

