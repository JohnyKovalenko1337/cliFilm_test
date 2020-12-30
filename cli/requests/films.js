const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

exports.addFilm = (title, description, creator) => {

    options.path = '/server/add-film';
    options.method = 'POST';

    const postData = JSON.stringify({
        'title': title,
        'description': description,
        'creator': creator
    });

    http.request(options, (res) => {
        res.on('data', (chunk) => { });
    }).end(postData);

};

exports.filmById = (id) => {
    options.path = `/server/film/${id}`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
    })

};


exports.deleteFilm = (id) => {
    options.path = `/server/deleteById/${id}`;
    options.method = 'GET';

    return new Promise((resolve, reject) => {

        http.request(options, (res) => {
            res.on('data', (chunk) => {
                resolve(chunk)
             });
        })
    })
};

exports.filmSorted = () => {
    options.path = `/server/film`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
    })

};

exports.filmByName = (name) => {
    options.path = `/server/film/${name}`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
    })

};

exports.filmByActor = (actor) => {
    options.path = `/server/film/${actor}`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
    })

};

exports.importFromFile = () => {
    options.path = `/server/film/import`;
    options.method = 'GET';


    return new Promise((resolve, reject) => {
        http.request(options, (res) => {
            let tasks;
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk)
                tasks = data.tasks;
            });
            res.on('end', () => {
                resolve(tasks);
            })
        })
            .on('error', reject)
    })

};

