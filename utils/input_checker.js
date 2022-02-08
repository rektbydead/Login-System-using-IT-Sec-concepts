const constants = require('./constants');

function checkPassword(password, username) {
    // Smaller than PASSWORD_LENGTH (8)
    if (password.length < constants.PASSWORD_LENGTH) return constants.PASSWORD_TOO_SMALL;

    // Contains only letters
    if (password.match(constants.ONLY_LETTERS_MATCH)) return constants.PASSWORD_HAS_NO_DIGIT;

    // Contains only letters and numbers
    if (password.match(constants.ONLY_LETTERS_NUMBERS_MATCH)) return constants.PASSWORD_HAS_NO_SPECIAL_DIGIT;

    // Password contains username
    if (password.includes(username)) return constants.PASSWORD_CONTAINS_USERNAME;
}

function checkEmail(email) {
    //Email is valid
    return email.match(constants.EMAIL_MATCH);
}

module.exports = {
    checkPassword,
    checkEmail,
}