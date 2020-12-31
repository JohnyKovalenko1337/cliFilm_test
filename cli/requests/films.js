const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3001,
    headers: {
        'Content-Type': 'application/json'
    }
};

exports.addFilm = (title, released, format, actors) => {

    options.path = '/server/add';
    options.method = 'POST';

    const postData = JSON.stringify({
        'title': title,
        'released': released,
        'format': format,
        'actors': actors
    });

    http.request(options, (res) => {
        res.on('data', (chunk) => {
        });
    }).end(postData);

};

exports.filmByName = (title) => {
    options.path = `/server/film/name`;
    options.method = 'POST';


    const postData = JSON.stringify({
        'name': title,
    });

    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let film;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                film = data.film;
            });
            res.on('end', () => {
                resolve(film);
            })
        })
            .on('error', reject)
            .end(postData);
    });
};

exports.deleteFilm = (name) => {
    options.path = `/server/deleteByName`;
    options.method = 'POST';

    const postData = JSON.stringify({
        'title': name,

    });

    const req = http.request(options, (res) => {
        console.log(name)
        res.on('data', (chunk) => {
            { }
        });
    }).end(postData);


};

exports.films = () => {
    options.path = `/server/film`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let films;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                films = data.films;
            });
            res.on('end', () => {
                resolve(films);
            })
        })
            .on('error', reject)
        req.end();
    })

};

exports.filmByActor = (actor) => {
    options.path = `/server/film/actor`;
    options.method = 'POST';


    const postData = JSON.stringify({
        'name': actor,
    });

    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let film;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                film = data.film;
            });
            res.on('end', () => {
                resolve(film);
            })
        })
            .on('error', reject)
            .end(postData);
    });
};

exports.importFromFile = () => {
    options.path = `/server/film/file/import`;
    options.method = 'GET';

    const req = http.request(options, (res) => {
        res.on('data', (chunk) => {
            { }
        });
    })
    req.end()

};

