const express = require('express');
const sql = require('../utils/sql');
const encrypt = require('../utils/encrypt');
const constants = require('../utils/constants');

const router = express.Router();

router.get('/', async function(req, res) {
    // Body is empty
    let body = req.body;
    if (!Object.keys(body).length) return res.send("Empty body");    

    let email = body.email ? String(body.email).toLowerCase() : undefined;
    let password = body.password;

    // User does not exists
    let result = await sql.getLoginInformation(email);
    if (!result) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);

    if (!encrypt.verifyPassword(result.password, password, result.salt)) return res.send(constants.EMAIL_PASSWORD_NOT_CORRECT);
    
    let userInformation = await sql.getUserInformation(email);
    return res.status(200).send(userInformation);
});

module.exports = router;