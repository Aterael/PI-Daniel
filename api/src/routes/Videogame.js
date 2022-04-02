const {
    Router
} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    Genre,
    Videogame
} = require("../db")


const router = Router();

const axios = require('axios');

const {
    getAllVideogames
} = require("../../Controllers/VideogamesController");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogame/:id", async (req, res) => {


    try {
        const {
            DB_KEY
        } = process.env;

        let {
            id
        } = req.params;

        if (id.length > 6) {
            let videogameDb = await Videogame.findOne({
                where: {
                    id: id
                },
                include: Genre
            })

            let game = {
                id: videogameDb.id,
                name: videogameDb.name,
                description: videogameDb.description,
                released: videogameDb.released,
                rating: videogameDb.rating,
                platforms: videogameDb.platforms,
                genres: videogameDb.genres
            }
            res.send(game)
        } else {

            let gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`);

            let gameFromApi = {
                id: gameApi.id,
                name: gameApi.name,
                description: gameApi.description,
                released: gameApi.released,
                rating: gameApi.rating,
                platforms: gameApi.platforms,
                genres: gameApi.genres
            }

            res.send(gameFromApi);

        }
    } catch (error) {
        console.log(error)
    }


})


module.exports = router;