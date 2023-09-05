const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { deleteMovieValidation, createMovieValidation } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
