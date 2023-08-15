const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Пользователь не авторизован');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
