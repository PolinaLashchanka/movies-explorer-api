const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/filmprojectdb', {
  useNewUrlParser: true,
});

app.listen(3000);
