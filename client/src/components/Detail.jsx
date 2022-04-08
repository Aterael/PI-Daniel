import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

export default function Detail(){

    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id)); //de esta forma accedo al ID
    }, [dispatch,id]);

    const myVideogame = useSelector(state => state.detail);

    /* let platforms = myVideogame.platforms

    let hola = platforms.split(", ").join(", ")

    console.log(hola) */

    if (myVideogame) {
        return (
          <div>
            <div>
            <h1>{myVideogame.name}</h1>
                <img src={myVideogame.image} alt="Imagen no encontrada"/>
                <h2>Rating: {myVideogame.rating}</h2>
                <p>{myVideogame.description}</p>
                <h4>Fecha de lanzamiento: {myVideogame.released}</h4>
                <h4>Plataformas: {myVideogame.platforms}</h4>
                <h4>Generos: {myVideogame.genres}</h4>
              <Link to="/home">
                <button>Go back</button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            Loading...
            <Link to="/home">
              <button>Go back</button>
            </Link>
          </div>
        );
      }

    /* (
        <div>
            {myVideogame.length > 0 ?
            <div>
                <h1>{myVideogame[0].name}</h1>
                <img src={myVideogame[0].image} alt="Imagen no encontrada"/>
                <h2>Rating: {myVideogame[0].rating}</h2>
                <p>{myVideogame[0].description}</p>
                <h4>Fecha de lanzamiento: {myVideogame[0].released}</h4>
                <h4>Plataformas: {myVideogame[0].platforms.map(data => data + (" "))}</h4>
                <h4>Generos: {myVideogame[0].genres.map(data => data + (" "))}</h4>
            </div> : 
            <p>Loading...</p>}
            <Link to="/home">Volver</Link>
        </div>
    ) */

}