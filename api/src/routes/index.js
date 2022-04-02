const {
    Router
} = require('express');
const genreRoute = require("./Genre")
const videogamesRoute = require("./Videogames.js")
const videogameRoute = require("./Videogame.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genre", genreRoute)
router.use("/videogames", videogamesRoute)
router.use("/videogame", videogameRoute)
/* router.use("/videogame", videogameRoute) */


module.exports = router;