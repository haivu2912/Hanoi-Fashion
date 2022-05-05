const express = require('express');
const app = express();
const port = 5000;
const db = require('./config/db');
const dotenv = require('dotenv');
const route = require('./routers');
const cors = require('cors');

db.connect();
dotenv.config();

app.use(express.json());
app.use(cors());

route(app);

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})