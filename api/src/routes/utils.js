// Importamos todo lo necesario para las funciones
require('dotenv').config();
const Axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');


//Creamos las funciones para las Rutas

async function getVideogamesFromApi(){
    let videogames = [];
    // Usamos un ciclo for para pedir 100 videojuegos porque la Api los da de 20 en 20
    for (let i = 1; i <= 5; i++){
        let { data } = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        data.results.forEach(game => {
            videogames.push({
                id: game.id,
                name: game.name,
                image: game.background_image,
                released: game.released,
                rating: game.rating,
                platforms: game.platforms.map(platform => platform.platform.name),
                genres: game.genres.map(genre => genre.name),
                createInDb: false,
            })
        });
    }
    return videogames;
};

async function getVideogamesFromDb(){
    //Obtenemos todos los juegos de la DB
    let gamesFromDb = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
    //Convertimos los juegos de la DB a una lista de objetos
    let videogames = gamesFromDb.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(platform => platform.name),
            genres: game.genres.map(genre => genre.name),
            createInDb: true,
        }
    });
    return videogames;
};

async function concatVideogames(){
    //Concatenamos la informacion de la Api con la proveniente de la DB
    const apiInfo = await getVideogamesFromApi();
    const dbInfo = await getVideogamesFromDb();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;
};

async function searchVideogamesInApi(name){
    let videogame = [];
    // Trae todos los resultados de la busqueda en la Api
    let { data } = await Axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
    data.results.forEach(game => {
        videogame.push({
            id: game.id,
            name: game.name,
            image: game.background_image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms && game.platforms.map(platform => platform.platform.name),
            genres: game.genres && game.genres.map(genre => genre.name),
            })
        });
    return videogame;
}  

async function searchVideogames(name){
    // Trae los Videojuegos de la DB
    const dbVideogames = await getVideogamesFromDb();
    
    // Filtra los juegos de la DB
    let filterDbVideogames = dbVideogames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));

    // Ahora traemos los juegos de la api y los concatenamos con los de la DB
    const apiVideogames =  await searchVideogamesInApi(name);
    const concatVideogames = filterDbVideogames.concat(apiVideogames);

    //Finalmente, devolvemos los juegos, hasta un maximo de 15.
    if(concatVideogames.length>15)
        return concatVideogames.slice(0,15);
    else
        return concatVideogames;
};

async function searchVideogamesByID(id){
    //Primero buscamos si el ID pertenece a la base de datos
    const dbVideogames = await getVideogamesFromDb();
    let videogame = dbVideogames.find(game => game.id === id);
    //Si lo encuentra, lo devolvemos
    if (videogame) return videogame;

    //Si no, lo buscamos en la api
    //Usamos Try/Catch para capturar el 404 de la api en caso de que no encuentre el ID
    try{
    let { data } = await Axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&`)
    let videogame = {
        id: data.id,
        name: data.name,
        description: data.description_raw,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map(platform => platform.platform.name),
        genres: data.genres.map(genre => genre.name),
        }
    return videogame;
    }
    //Si no lo encuentra, utilizamos el error 404 para retornar un Undefined 
    catch(error){
        return undefined;
    }

}

async function getGenresFromDb(){
    return await Genre.findAll();
}

module.exports = {
    concatVideogames,
    searchVideogames,
    searchVideogamesByID,
    getGenresFromDb,
};
