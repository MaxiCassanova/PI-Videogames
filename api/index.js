//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
// import axios
const Axios = require('axios');
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Genre } = require('./src/db.js')
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    // Precargamos los generos en la base de datos al iniciar el servidor
    getGenresFromApi();
    console.log('Generos cargados');

  });
});

async function getGenresFromApi() {
  //Hacemos una petición a la API con Axios
  const { data } = await Axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  const genres = data.results;
  //Cargamos los generos en la base de datos
  for (let i = 0; i < genres.length; i += 1) {
    const genre = genres[i];
    const { name } = genre;
    await Genre.findOrCreate( { where: { name } } );
  }
}