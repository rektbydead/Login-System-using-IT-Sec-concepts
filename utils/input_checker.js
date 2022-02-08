const constants = require('./constants');

function checkPassword(password, username) {
    if (password.length < constants.PASSWORD_LENGTH) return constants.PASSWORD_TOO_SMALL;

    if (password.includes(username)) return constants.PASSWORD_CONTAINS_USERNAME;

    console.log(password.includes(username));
}

function checkEmail(email) {
    return String(email).toLowerCase().match(constants.EMAIL_MATCH);
}

module.exports = {
    checkPassword,
    checkEmail,
}