import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postVideogame, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input){  //usado para validad errores 
    let errors = {};
    if (!input.name){
        errors.name = "Se requiere un nombre";
    } else if (!input.description){
        errors.description = "Se requiere una descripcion";
    } else if (!input.released){
        errors.released = "Se requiere una fecha de lanzamiento";
    } else if (!input.rating){
        errors.rating = "Se requiere una puntuacion de Rating";
    } else if (!input.image){
        errors.image = "Se requiere una imagen";
    }

    return errors;
}

export default function VideogameCreated(){

    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);

    const [errors, setErrors] = useState({});

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
      ];

    const [input, setInput] = useState({
        name: "",
	    description: "",
	    released:"",
        rating:"",
        platforms: [],
        genres:[],
	    image: "" 
    });

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value //ademas de lo que tiene agrega el target.value de lo que esta modificando segun el target.name
        });
        setErrors(validate({ //tambien setea el estado de error usando la funcion creada arriba
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value] //cuando le mando un genero, me trae lo que ya habia y me concatena el nuevo genero a agregar
        })
    }

    function handlePlatforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input));
        alert("Videojuego creado con exito!");
        setInput({
            name: "",
	    description: "",
	    released:"",
        rating:"",
        platforms: [],
        genres:[],
	    image: "" 
        });
    }

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(data => data !==e)
        })
    }

    function handleDeleteGenre(e){  //funcion para eliminar generos que no queremos crear
        setInput({
            ...input,
            genres: input.genres.filter(data => data !== e) //filtro los generos por todo lo que no sea el elemento a eliminar
        })
    }

    return (
        <div>
            <Link to="/home">
                <button>Volver</button>
            </Link>
            <h1>Crea tu Videojuego</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={e => handleChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>  //renderiza el texto de error
                    )}
                </div>
                <div>
                    <label>Descripcion</label>
                    <input
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={e => handleChange(e)}
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Lanzamiento</label>
                    <input
                    type="text"
                    value={input.released}
                    name="released"
                    onChange={e => handleChange(e)}
                    />
                    {errors.released && (
                        <p>{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating</label>
                    <input
                    type="text"
                    value={input.rating}
                    name="rating"
                    onChange={e => handleChange(e)}
                    />
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={e => handleChange(e)}
                    />
                    {errors.image && (
                        <p>{errors.image}</p>
                    )}
                </div> {/* falta generos y plataformas */}
                <select onChange={e => handleGenres(e)}>
                    <option>Genero del Videojuego a crear</option> {/* COMO HACER PARA QUE NO MARQUE ESTO <<<------------------*/}
                    {genres.map(data => (
                        <option value={data.name}>{data.name}</option>
                    ))}
                </select>
                <select onChange={e => handlePlatforms(e)}>
                    <option>Plataforma del Videojuego a crear</option>
                    {platforms.map(data => ( /* PENDIENTEEEEEEEEEE <-------------------------- */
                        <option value={data}>{data}</option>
                    ))}
                </select>
                <button type="submit">Crear Videojuego</button>
            </form>
            {input.genres.map(data => (
                    <div>
                        <p>{data}</p>
                        <button onClick={() => handleDeleteGenre(data)}>X</button>
                    </div>
                ))} {/* agarra mis generos y va renderizando cada cosa que selecciono */}
                {input.platforms.map(data => (
                    <div>
                        <p>{data}</p>
                        <button onClick={() => handleDeletePlatforms(data)}>X</button>
                    </div>
                ))}
        </div>
    )
}