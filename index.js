const express = require('express');
const sql = require('./sql');

const app = express();
const port = 3000;

sql.createDatabase();

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

app.use(express.json());

app.use("/api/login", require("./routes/login"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/change_password", require("./routes/change_password"));

app.get('/', (req, res) => {
    return res.sendStatus(404);
});

app.get('/api', (req, res) => {
    return res.sendStatus(404);
});