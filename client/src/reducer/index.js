const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                    allVideogames: action.payload
            }
            case "FILTER_CREATED":
                let createdFilter;
                if (action.payload === "api") {
                    let apiGame = state.allVideogames.filter(data => data.id.toString().length < 7)
                    createdFilter = apiGame
                }
                if (action.payload === "created") {
                    let createdGame = state.allVideogames.filter(data => data.id.toString().length > 7)
                    createdFilter = createdGame
                }
                if (action.payload === "All") {
                    let allFiltered = state.allVideogames;
                    createdFilter = allFiltered
                }
                return {
                    ...state,
                    videogames: createdFilter
                }
                case "ORDER_BY_NAME":
                    let sortedArr = action.payload === "asc" ? state.videogames.sort(function (a, b) { //si es ascendente
                            if (a.name > b.name) { // accede al estado videogames y le hace un sort
                                return 1; // los ordena de manera ascendente
                            }
                            if (b.name > a.name) {
                                return -1;
                            }
                            return 0
                        }) :
                        state.videogames.sort(function (a, b) {
                            if (a.name > b.name) {
                                return -1
                            }
                            if (b.name > a.name) {
                                return 1
                            }
                            return 0
                        })
                        if (action.payload === "All") {
                            let allFiltered = state.allVideogames;
                            sortedArr = allFiltered
                        }
                    return {
                        ...state,
                        videogames: sortedArr
                    }
                    case "GET_NAME_VIDEOGAMES":
                        return {
                            ...state,
                            videogames: action.payload
                        }
                        case "POST_VIDEOGAME":
                            return {
                                ...state
                            }
                            case "GET_GENRES":
                                return {
                                    ...state,
                                    genres: action.payload
                                }
                                case "FILTER_BY_GENRE":
                                    let filterGenre = state.allVideogames.filter(p => {
                                        if(p.genres?.includes(action.payload)) return p
                                    })
                                    return {
                                        ...state,
                                        videogames: filterGenre
                                    }
                                    case "ORDER_BY_RATING":
                                        let sortedArrRating = action.payload === "peor" ? state.videogames.sort(function (a, b) { //si es ascendente
                                                if (a.rating > b.rating) { // accede al estado videogames y le hace un sort
                                                    return 1; // los ordena de manera ascendente
                                                }
                                                if (b.rating > a.rating) {
                                                    return -1;
                                                }
                                                return 0
                                            }) :
                                            state.videogames.sort(function (a, b) {
                                                if (a.rating > b.rating) {
                                                    return -1
                                                }
                                                if (b.rating > a.rating) {
                                                    return 1
                                                }
                                                return 0
                                            })
                                        return {
                                            ...state,
                                            videogames: sortedArrRating
                                        }
                                        case "GET_DETAIL":
                                            return {
                                                ...state,
                                                detail: action.payload
                                            }
                                        default:
                                            return state;
    }
}

export default rootReducer;