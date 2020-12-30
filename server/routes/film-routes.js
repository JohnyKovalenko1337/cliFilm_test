const express = require('express');

const {
    addFilm
    } = require('../controllers/film-controllers');

const router = express.Router();

router.get('/add', addFilm);



module.exports = router;