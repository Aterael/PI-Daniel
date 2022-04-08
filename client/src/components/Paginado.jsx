import React from "react";

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){

    const pageNumbers = []

    for (let i = 1; i < Math.ceil(allVideogames/videogamesPerPage); i++) { //voy a recorrer el arreglo en donde voy a tomar el numero redondeado que resulta dividir todos los juegos por el numero de juegos por pagina que yo quiero y lo pusheo
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers && pageNumbers.map(number => ( //si el arreglo existe, entonces mapeo y devuelvo cada uno de los numeros que devuelva el paginado
                <li className="number" key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                </li>
                ))}
            </ul>
        </nav>
    )
}