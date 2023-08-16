require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, DataNotFound } = require('./middlewares/error');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/filmprojectdb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new DataNotFound());
});
app.use(errorHandler);

app.listen(3000);
