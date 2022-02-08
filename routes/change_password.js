const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Get a random book')
    })
    .get((req, res) => {
        res.send('Get a random book')
    });


module.exports = router;

