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

router.post('/deleteByName', deleteById);

router.post('/film/name', filmByName);

router.post('/film/actor', filmByActor);

router.get('/film/file/import', importFromFile);

module.exports = router;

