const express = require('express');
const route = require('./routes/routing');
const bodyParser = require('body-parser');

const app = express();

const errorLogger = require('./utilities/errorLogger')
const requestLogger = require('./utilities/requestLogger');

app.use(bodyParser.json());
app.use(express.json());
app.use(requestLogger);
app.use('/',route);

app.use(errorLogger)

app.listen(3000);