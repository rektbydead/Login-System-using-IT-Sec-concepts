const mysql = require('mysql');
const { resourceLimits } = require('worker_threads');

const DATABASE_NAME = "login_register";
const TABLE_NAME = "users";

const NAME = "name";
const EMAIL = "email"
const PASSWORD = "password";
const SALT = "salt";

const SALT_MIN_SIZE = 12;
const SALT_MAX_SIZE = 36;

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: DATABASE_NAME,
});

const createDatabase = () => {
    const createTableStatement = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (${NAME} VARCHAR(16), ${EMAIL} VARCHAR(255) PRIMARY KEY, ${PASSWORD} VARCHAR(64), ${SALT} VARCHAR(36))`;
    connection.query(createTableStatement);
};

const checkUserExists = (email) => {
    const userExistsStatement = `Select ${EMAIL} from ${TABLE_NAME} where ${EMAIL}=?`;

    return  connection.query(userExistsStatement, 
        [
            email
        ], 
    );
};

const addUser = (username, email, password, salt) => {
    const addUserStatement = `INSERT INTO ${TABLE_NAME} VALUES (?, ?, ?, ?)`;

    connection.query(addUserStatement, [
        username,
        email,
        password,
        salt
    ]);
};

const removeUser = () => {

};

const changeUserPassword = () => {

};

module.exports = {
    createDatabase,
    checkUserExists,
    addUser,
    removeUser,
    changeUserPassword,
    SALT_MIN_SIZE,
    SALT_MAX_SIZE
};
