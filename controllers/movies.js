const Movie = require('../models/movie');

const { BASE_URL } = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  } = req.body;

  const imageUrl = `${BASE_URL}${image.url}`;
  const thumbnail = `${BASE_URL}${image.formats.thumbnail.url}`;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image: imageUrl,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId: id,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
