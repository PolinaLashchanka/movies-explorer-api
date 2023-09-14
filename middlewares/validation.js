const { Joi, celebrate } = require('celebrate');

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .regex(
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
      ),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
});

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .regex(
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
      ),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .regex(
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
      ),
    name: Joi.string(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailerLink: Joi.string()
      .required()
      .regex(/https?:\/\/(www.)?[a-z0-9\W_]+#?/i),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  updateUserValidation,
  deleteMovieValidation,
  createMovieValidation,
};
