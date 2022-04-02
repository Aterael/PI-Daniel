const {
    Router
} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const {
    getAllVideogames
} = require("../../Controllers/VideogamesController");


const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {


    try {


        const {
            DB_KEY
        } = process.env;

        const {
            name
        } = req.query;

        let videogameAllName = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${DB_KEY}`);

        if (name) {

            let videogameName = await videogameAllName.data.results.filter(data => data.name.toLowerCase().includes(name.toLowerCase()))

            videogameName = videogameName.slice(0, 15);

            videogameName = videogameName.map(data => {
                return {
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    released: data.released,
                    rating: data.rating,
                    platforms: data.platforms.map(data => data.platform.name),
                    genres: data.genres.map(data => data.name)
                }
            })

            if (videogameName.length) {
                res.status(200).send(videogameName)
            } else {
                res.status(404).send("No existe ese videojuego");
            }
        } else {

            let allVideogames = await getAllVideogames();

            res.status(200).send(allVideogames);
        }

    } catch (error) {
        console.log(error)
    }

})


module.exports = router;