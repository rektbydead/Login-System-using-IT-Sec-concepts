module.exports = {
    // input checker constants
    PASSWORD_LENGTH: 8,
    EMAIL_MATCH: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ONLY_LETTERS_MATCH: /^[A-Za-z]+$/,
    ONLY_LETTERS_NUMBERS_MATCH: /^[^a-zA-Z0-9]+$/,

    
    // error constants
    PASSWORD_IS_MISSING: "Password is missing",
    NEW_PASSWORD_IS_MISSING: "New password is missing",
    EMAIL_IS_MISSING: "Email is missing",
    USERNAME_IS_MISSING: "User name is missing",
    BODY_IS_MISSING: "Body is missing",

    PASSWORD_TOO_SMALL: "Password has less than 8 characters",
    PASSWORD_HAS_NO_DIGIT: "Password has to have at least one digit",
    PASSWORD_HAS_NO_SPECIAL_DIGIT: "Password has to have at least one special digit",
    PASSWORD_CONTAINS_USERNAME: "Password cannot contain username",

    EMAIL_IS_NOT_VALID: "Email is invalid",
    EMAIL_ALREADY_EXITS: "User already exits",

    EMAIL_PASSWORD_NOT_CORRECT: "Email or password is not correct",

    // success constants
    USER_ADD_SUCCESS: "User added successfully",
    PASSWORD_CHANGE_SUCCESS: "Password changes successfully",
    LOGIN_SUCCESS: "Login successfully completed",

    // encrypto constants
    ITERATIONS: 1000,
    LENGTH: 64,
    ALGORITHM: 'sha512'
}