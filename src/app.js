// .env definition
require('./config/environment');
require('./config/database');

const express = require('express');
const routes = require('./config/routes');

const app = express();

// To use Json requests
app.use(express.json());
app.use(routes);

// System port
const port = process.env.APP_PORT;

app.listen(port);