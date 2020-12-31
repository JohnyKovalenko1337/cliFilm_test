const Film = require('../models/Film');

const fs = require('fs');
const path = require('path');

// path of txt file 
const p = path.join(
    path.dirname(require.main.filename),
    'import.txt'
);


exports.getFilms = async (req, res, next) => {
    try {
        let films = await Film.find();
        if (films.length > 0) {
            films = films.sort((film1, film2) => {          // sorting films
                if (film1.title.toLocaleLowerCase() > film2.title.toLocaleLowerCase()) {
                    return 1;
                }
                else if (film1.title.toLocaleLowerCase() < film2.title.toLocaleLowerCase()) {
                    return -1;
                }
                else { return 0; }
            })
        }
        return res.json({ films });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "server error" });
    }
};

exports.addFilm = async (err, req, res, next) => {
    if (err.length > 1) {
        return res.status(500).json({ error: err });    // if no validation errors
    }
    else {
        const { title, released, format, actors } = req.body;

        try {

            const foundFilm = await Film.findOne({ title: title });

            if (foundFilm) {
                return res.status(400).json({ error: "Film with this title already exists" });
            };

            const film = await Film.create({
                title: title,
                released: released,
                format: format,
            })

            actors.forEach(el => {
                film.actors.push(el);
            });
            await film.save();

            return res.json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ error: error });
        }
    }
};

exports.getFilmById = async (req, res, next) => {
    const id = req.params.id;

    try {

        const foundFilm = await Film.findById(id);

        if (!foundFilm) {
            return res.status(400).json({ error: "Film with id not found" });
        };

        return res.json({ message: "success", film: foundFilm });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.deleteById = async (req, res, next) => {
    const title = req.body.title;
    try {
        await Film.findOneAndDelete({title:title});
        return res.json({ message: "success", });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.filmByName = async (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    try {

        const foundFilm = await Film.findOne({ title: name });

        if (!foundFilm) {
            return res.status(400).json({ error: "Film with this title not found" });
        };

        return res.json({ message: "success", film: foundFilm });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.filmByActor = async (req, res, next) => {
    const actor = req.body.name;
    try {

        const films = await Film.find();

        let film;

        films.forEach(el => {
            if (el.actors.indexOf(actor) > -1) {
                film = el;
            }
        });

        if (!film) {
            return res.status(400).json({ error: "Film with this actor not found" });
        };

        return res.json({ message: "success", film: film });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.importFromFile = async (req, res, next) => {

    try {
        getFromFile((items) => {
            let array = [];
            let i = 0;
            for (let j = 1; j <= items.length / 5; j++) {
                let obj = []

                while ((i + 1) % 5 != 0 && i < items.length) {
                    let item = items[i].split(': ')[1];
                    obj.push(item.substring(0, item.length-1))
                    i++;
                }
                i++;
                array.push(obj);


            }
            array.forEach(async(el)=>{
                let find = await Film.findOne({title:el[0]});
                if(!find){
                    let film = new Film({
                        title: el[0],
                        released: el[1],
                        format: el[2],
                    });
                    let actors = el[3].split(', ');
                    console.log(actors);
                    actors.forEach(act=>{
                        film.actors.push(act);
                    });
    
                    await film.save();
                }
            })
            return res.json({message:"success"});

        })
    }

    catch (error) {
        console.log(error);
        return res.status(500);
    }

};

const getFromFile = cb => {
    fs.readFile(p, "utf8", (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(fileContent.split('\n'));
        }
    });
};