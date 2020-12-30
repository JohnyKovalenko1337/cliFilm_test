'use strict';

const readline = require('readline');
const {
    addFilm, deleteFilm,filmById, filmSorted, filmByName, filmByActor, importFromFile
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
        let description;
        console.clear()
        rl.question(Film.title,
            (line) => {
                rl.prompt();
                title = line;       // getting title
                rl.question(Film.description,
                    (line) => {
                        rl.prompt();
                        description = line;       // getting description
                        addFilm(title, description, currentUser.username); // saving Film
                        console.log('Film has been added');
                        rl.prompt();
                    });
            });
    },
    // =================================== delete Films ===========================
    delete() {
        deleteFilm()
            .then(Films => {
                console.table(Films);
                rl.prompt();
            })
    },
    //========================= get Film by id ======================================
    filmId() {
        let id;
        let newTitle;
        let newDescription;
        console.clear();
        filmById(currentUser.username)     //getting Films by username
            .then(Films => {
                console.table(Films);

                rl.question("input index of your Film\n> ", (line) => {
                    rl.prompt();

                    id = line;        //getting index of my Films array
                    if (Films[id]) {      // if that index exists
                        rl.question("Input new title for your Film\n> ", (line) => {
                            newTitle = line;      // setting title

                            rl.question("Input new description for your Film\n> ", (line) => {
                                rl.prompt();
                                newDescription = line;      //setting description
                                updateMyFilm(currentUser.username, id, newTitle, newDescription)    // saving Film
                                    .then(() => {
                                        console.log('Film has been updated');
                                        rl.prompt();
                                    })

                            });
                        });
                    } else {
                        console.log('No Film with this index found');
                        rl.prompt();
                    }
                })

            })
    },
    // ================================ get sorted Films ===================================
    get() {
        let id;
        console.clear();
        filmSorted(currentUser.username)     // getting Films by username
            .then(Films => {
                console.table(Films);

                rl.question("input id of your Film\n", (line) => {
                    rl.prompt();

                    id = line;      //getting index of my Films array
                    if (Films[id]) {        // if that Film exists
                        deleteMyFilm(currentUser.username, id)      // deleting Film
                            .then(() => {
                                console.log('Film has been deleted');
                                rl.prompt();
                            })
                    }
                    else {
                        console.log('No Film with this index found');
                        rl.prompt();
                    }
                });
            });
    },
    findByName(){
        filmByName();
    },
    filmByActor(){
        filmByActor();
    },
    import(){
        importFromFile();
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