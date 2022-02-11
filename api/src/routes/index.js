const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Importamos las funciones
const {concatVideogames, searchVideogames, searchVideogamesByID, getGenresFromDb} = require('./utils.js');
const { Videogame, Genre } = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/videogames', async function(req, res){
    let name = req.query.name;
    if(name){
        const videogames = await searchVideogames(name);
        res.json(videogames);
    }
    else{
    const videogames = await concatVideogames();
    const total = videogames.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            rating: game.rating,
            released: game.released,
            genres: game.genres.map(genre => genre),
            createInDb: game.createInDb? true: false
        }
    });
    res.status(200).json(total);
    }
})

router.get('/videogames/:id', async function(req, res){
    let id = req.params.id;
    const videogames = await searchVideogamesByID(id);
    if (videogames) res.status(200).json(videogames);
    else res.status(404).send({msg: 'Videogame not found'});
})

router.get('/genres', async function(req, res){
    const genres = await getGenresFromDb();
    res.status(200).json(genres);
})

router.post('/videogames', async function(req, res){
    let {name, description, image, released, rating, platforms, genres, createInDb} = req.body;
    if(!name || ! description || !platforms || !genres) res.status(400).send({msg: 'No estan todos los campos obligatorios'});
    const videogame = await Videogame.create({
        name: name,
        description: description,
        image: image,
        released: released,
        rating: rating,
        platforms: platforms.map(platform => platform),
        createInDb: createInDb,
    });
    const genreDB = await Genre.findAll({
        where: { name: genres.map(genre => genre) }
    })
    videogame.setGenres(genreDB);
    res.status(201).json('Videogame created');
})


module.exports = router;
