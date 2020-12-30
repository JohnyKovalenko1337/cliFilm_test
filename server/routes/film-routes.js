const express = require('express');

const {
    getFilms,
    addFilm,
    getFilmById,
    deleteById,
    filmByName,
    filmByActor,
    importFromFile
} = require('../controllers/film-controllers');

const { addFilmSchema } = require('../validation/addFilm');

const router = express.Router();

router.get('/film', getFilms);

router.post('/add', addFilmSchema, addFilm);

router.get('/film/:id', getFilmById);

router.delete('/deleteById/:id', deleteById);

router.get('/film/name/:name', filmByName);

router.get('/film/actor/:actor', filmByActor);

router.get('/film/file/import', importFromFile);

module.exports = router;

