const express = require('express');
const bodyParser = require('body-parser');

const dbConnect = require('./mongoConnect/connect');
const filmRoutes = require('./routes/film-routes');

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

app.use('/server', filmRoutes);

app.use((req, res, next) => {
    return res.json({ message: 'Couldnt find this route' });
})

dbConnect();

app.listen(port, () => {
    console.log('server');
});