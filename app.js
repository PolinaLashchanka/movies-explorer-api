const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/filmprojectdb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.listen(3000);
