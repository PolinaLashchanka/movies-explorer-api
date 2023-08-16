const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      User.create({ email, name, password: hashPassword })
        .then((user) => res.status(201).send({
          data: user.deletePassword(),
        }))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Неверное имя пользователя или пароль'))
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((isValid) => {
          if (isValid) {
            const jwt = jsonWebToken.sign({ _id: user._id }, 'secret-key');
            res.send({ ...user.deletePassword(), token: jwt });
          } else {
            throw new Error('Неверное имя пользователя или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  login,
};
