module.exports = {
    // input checker constants
    PASSWORD_LENGTH: 8,

    EMAIL_MATCH: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,


    // error constants
    PASSWORD_IS_MISSING: "Password is missing",
    EMAIL_IS_MISSING: "Email is missing",
    USERNAME_IS_MISSING: "User name is missing",

    PASSWORD_TOO_SMALL: "Password has less than 8 characters",
    PASSWORD_HAS_NO_DIGIT: "Password has to have at least one digit",
    PASSWORD_CONTAINS_USERNAME: "Password cannot contain username",

    EMAIL_IS_NOT_VALID: "Email is invalid",
    EMAIL_ALREADY_EXITS: "User already exits",

    // success constants
    USER_ADD_SUCCESS: "User added successfully",
}