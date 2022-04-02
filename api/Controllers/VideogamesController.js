const axios = require("axios");

const {
    Genre,
    Videogame
} = require("../src/db")

const getApiInfo = async function () {

    try {
        const {
            DB_KEY
        } = process.env;

        let {
            data: pageOne
        } = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}`);
        let {
            data: pageTwo
        } = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=2`);
        let {
            data: pageThree
        } = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=3`);
        let {
            data: pageFour
        } = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=4`);
        let {
            data: pageFive
        } = await axios.get(`https://api.rawg.io/api/games?key=${DB_KEY}&page=5`);

        /* Promise.all([pageOne, pageTwo.results, pageThree.results, pageFour.results, pageFive.results]).then(data => {
            console.log(data.pageOne)
        }) */

        let fullApiUrl = pageOne.results.concat(pageTwo.results, pageThree.results, pageFour.results, pageFive.results)


        let apiInfo = await fullApiUrl.map(data => {
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
        return apiInfo
    } catch (error) {
        console.log(error)
    }


}

const getDbInfo = async function () { //busca en la base de datos cualquier info que incluya el modelo genero y su atributo name y que sea un array

    try {
        return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
    } catch (error) {
        console.log(error)
    }

}

const getAllVideogames = async function () {
    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDbInfo();
        let infoTotal = apiInfo.concat(dbInfo);
        return infoTotal;
    } catch (error) {
        console - log(error)
    }
}

module.exports = {
    getAllVideogames
}