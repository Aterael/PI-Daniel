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

        let genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${DB_KEY}`)

        genresApi.data.results.forEach(async data => { //aca se guarda en la base de datos, lo crea si no existe o lo trae
            try {
                await Genre.findOrCreate({
                    where: {
                        name: data.name
                    }
                })
            } catch (error) {
                console.log(error)
            }
        })

        let allGenres = await Genre.findAll(); //aca los busca todos de la DB

        res.send(allGenres);

    } catch (error) {
        console.log(error)
    }


})


module.exports = router;