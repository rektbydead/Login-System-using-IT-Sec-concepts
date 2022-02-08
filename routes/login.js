const express = require('express');
const sql = require('../utils/sql');
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

    console.log(result);
    
});

module.exports = router;