'use strict';

const readline = require('readline');
const {
    addFilm, deleteFilm,  films, filmByName, filmByActor, importFromFile
} = require('./requests/films');

const { Film } = require('./cli-quers/films');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

console.log('                | Welcome to Film App |');

const commands = {

    menu() {
        console.clear();
        console.log('Available commands: ', Object.keys(commands).join(', '));
        rl.prompt();
    },
    // ======================== add Film =======================================
    add() {
        let title;
        let released;
        let format;
        let formats = ['VHS', 'DVD', 'Blu-Ray'];
        let actors = []
        console.clear()
        rl.question(Film.title,
            (line) => {
                rl.prompt();
                title = line;       // getting title
                rl.question(Film.release,
                    (line) => {
                        rl.prompt();
                        released = line;       // getting released year
                        rl.question(Film.format,
                            (line) => {
                                if(formats.indexOf(line) == -1){
                                    console.log("format not found start again")
                                    return;
                                }
                                else{
                                    format = line;     //getting format
                                }
                                rl.question(Film.actors,
                                    (line) => {
                                        actors = line.split(',');
                                        addFilm(title, released, format, actors); // saving Film
                                        console.log('Film has been added');
                                        rl.prompt();
                                    });
                            });

                    });
            });
    },
    // =================================== delete Films ===========================
    delete() {
        let id;
        console.clear();

        films()     // getting Films by username
            .then(Films => {
                Films.forEach(el => {
                    delete el._id;
                    delete el.__v;
                })
                console.table(Films);
                rl.question("input index of your Film\n> ", (line) => {
                    rl.prompt();
                    id = line;        //getting index of my Films array
                    if (Films[id]) {
                        deleteFilm(Films[id].title)
                        console.log("Successfuly deleted");
                        rl.prompt();
                    }
                    else {
                        console.log("Film With that Id not Found\n>")
                    }
                })
            })
    },
    //========================= get Film by id ======================================
    filmId() {
        let id;
        console.clear();

        films()     // getting Films by username
            .then(Films => {
                Films.forEach(el => {
                    delete el._id;
                    delete el.__v;
                })
                console.table(Films);
                rl.question("input index of your Film\n> ", (line) => {
                    rl.prompt();

                    id = line;        //getting index of my Films array
                    if (Films[id]) {
                        console.table(Films[id]);
                        rl.prompt();
                    }
                    else {
                        console.log("Film With that Id not Found\n>")
                    }

                });


            })
    },
    // ================================ get sorted Films ===================================
    get() {
        console.clear();
        films()     // getting Films by username
            .then(Films => {
                Films.forEach(el => {
                    delete el._id;
                    delete el.__v;
                })
                console.table(Films);
                rl.prompt();
            });
    },
    findByName() {
        let name;
        rl.question("input index of your Film\n> ", (line) => {
            rl.prompt();

            name = line;        //getting index of my Films array
            filmByName(name)
                .then((film) => {
                    console.table(film)
                    rl.prompt();
                })
        });
    },
    filmByActor() {
        let name;
        rl.question("input index of your Film\n> ", (line) => {
            rl.prompt();

            name = line;        //getting index of my Films array
            filmByActor(name)
                .then((film) => {
                    console.table(film)
                    rl.prompt();
                })
        });
    },
    import() {
        importFromFile();
        console.log("Successfuly imported");
    }
}

// outputting commands, when programm starts
console.log('Available commands: ', Object.keys(commands).join(', '))

rl.prompt();

rl.on('line', line => {
    const command = commands[line];
    if (command) command();
    else console.log('Unknown command, type "menu" for available commands');
    rl.prompt();
});