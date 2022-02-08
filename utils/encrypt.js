const crypto = require('crypto');
const sql = require('./sql');
const constants = require('./constants');


const hashPassword = (password, salt) => {
    if (!salt) salt = createSalt();

    // Salt the password "constants.ITERATIONS" times, "constants.LENGTH" length with "constants.ALGORITHM"
    return crypto.pbkdf2Sync(password, salt, constants.ITERATIONS, constants.LENGTH, constants.ALGORITHM).toString('hex');
}

const createSalt = (size) => {
    if (!size) size = getRandomNumber();

    return crypto.randomBytes(size).toString('hex').slice(0, size);
}

const verifyPassword = (hashedPassword, password, salt) => {
    // Salt the password "constants.ITERATIONS" times, 64 length with "constants.ALGORITHM"
    const newHash = crypto.pbkdf2Sync(password, salt, constants.ITERATIONS, constants.LENGTH, constants.ALGORITHM).toString('hex');
    
    // Verify password
    return hashedPassword == newHash;
}

function getRandomNumber() {
    return Math.floor(Math.random() * sql.SALT_MAX_SIZE) + sql.SALT_MIN_SIZE;
}

module.exports = {
    hashPassword,
    createSalt,
    verifyPassword
};
