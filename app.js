require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, DataNotFound } = require('./middlewares/error');

const { NODE_ENV, DB_ADRESS } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://127.0.0.1:27017/devfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use((req, res, next) => {
  next(new DataNotFound());
});
app.use(errorHandler);

app.listen(3000);
