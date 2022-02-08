const crypto = require('crypto');
const sql = require('./sql');

const hashPassword = (password, salt) => {
    if (!salt) salt = createSalt();

    return crypto.createHmac('sha256', salt).update(password).digest('hex'); 
}

const createSalt = (size) => {
    if (!size) size = getRandomNumber();

    return crypto.randomBytes(size).toString('hex').slice(0, size);
}

function getRandomNumber() {
    return Math.floor(Math.random() * sql.SALT_MAX_SIZE) + sql.SALT_MIN_SIZE;
}

module.exports = {
    hashPassword,
    createSalt
};
