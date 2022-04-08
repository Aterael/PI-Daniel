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
} = require("../Controllers/VideogamesController");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/:id", async (req, res) => {


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
                image: videogameDb.image,
                genres: videogameDb.genres?.map((genre) => genre.name)
            }

            res.send(game)
        } else {

            let gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${DB_KEY}`);

            let gameFromApi = {
                id: gameApi.data.id,
                name: gameApi.data.name,
                description: gameApi.data.description,
                released: gameApi.data.released,
                rating: gameApi.data.rating,
                image: gameApi.data.background_image,
                platforms: gameApi.data.platforms?.map(data => data.platform.name),
                genres: gameApi.data.genres?.map(data => data.name)
            }

            res.send(gameFromApi);

        }
    } catch (error) {
        console.log(error)
    }


})

router.post("/", async (req, res) => {

    try {
        let {
            id,
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb,
            genres,
            image
        } = req.body //se busca la info que necesitaremos para crear en el body

        let videogameCreated = await Videogame.create({ //aca creamos el videojuego con lo que nos pasaron por body
            id,
            name,
            description,
            released,
            rating,
            platforms,
            createdInDb,
            image
        })

        let genresDb = await Genre.findAll({ //se busca todas las coincidencias en la DB donde coincida su nombre con lo que me pasan por body
            where: {
                name: genres
            }
        })

        videogameCreated.addGenres(genresDb) //aca le anexamos el genero de la base de datos al videojuego creado

        res.send("Videojuego creado con exito")

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;