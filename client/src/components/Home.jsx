import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames, filterCreated, orderByName, orderByRating, filterByGenre, getGenres } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home (){

    const dispatch = useDispatch();

    const allVideogames = useSelector (state => state.videogames); //con useSelector me trae a esta constante todo lo que esta en el estado de videogames ---- ES LO MISMO que usar mapStateToProps

    //---------------------- PAGINADO ---------------------------

    const [currentPage, setCurrentPage] = useState(1);  //con este estado local me guardo la pagina actual, arrancando en la 1

    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //con este estado local me guardo cuantos videojuegos tendre por pagina

    const indexOfLastVideogame = currentPage * videogamesPerPage; //indice del ultimo personaje

    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; //indice del primer personaje

    const currentVideogame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame); //tomo todos los juegos y selecciono los juegos que quiero, en este caso el indice del primero al ultimo indice con las variables creadas 1 al 15

    //-------------------------------------------------------------------

    const [orden, setOrden] = useState("");

    const genres = useSelector((state) => state.genres);

    const paginado = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{ //lo manda al store para hacer la logica
        dispatch(getGenres());
        dispatch(getVideogames()); //esto es lo mismo que usar mapDispatchToProps
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //al ordenar seteo para que comience en la primera pagina
        setOrden(e.target.value) //se usa para que haga la modificacion, la setee y renderice 
    }

    function handleRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleGenres(e){
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    return (
        <div>
            <Link to="/videogame">Crear Videojuego</Link>
            <h1>VIDEOGAMES HOME H1</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value="asc">Orden alfabetico de A hasta Z</option> {/* el value nos permite acceder y ver que opciones va a ejecutar la logica segun el value dado */}
                    <option value="desc">Orden alfabetico de Z hasta A</option>
                </select>
                <select onChange={e => handleRating(e)}>
                    <option value="peor">Rating del Peor al Mejor</option>
                    <option value="mejor">Rating del Mejor al Peor</option>
                </select>
                <select onChange={e => handleGenres(e)}>
                    <option value="">Todos los Generos</option>
                    {genres?.map(data => (
                        <option value={data.name} key={data.id}>{data.name}</option>
                    ))}
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="All">Todos los Videojuegos</option>
                    <option value="created">Videojuegos Creados</option>
                    <option value="api">Videojuegos Existente</option>
                </select>
                <Paginado videogamesPerPage={videogamesPerPage} //renderizamos el paginado 
                allVideogames={allVideogames.length}    //estos serian los params para el componente
                paginado={paginado} 
                />
                <SearchBar/>
                {
                    currentVideogame?.map(data => {
                        return (
                            <div>
                                <Link to={"/home/" + data.id}>
                                <Card name={data.name}
                                image={data.image}
                                genres={data.genres + " "}
                                rating={data.rating}
                                key={data.id} />
                                </Link>
                            </div> 
                        )
                    })
                }
            </div>
        </div>
    )
}