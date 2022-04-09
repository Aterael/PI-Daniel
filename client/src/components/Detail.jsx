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

    console.log(myVideogame)

    if (myVideogame) {
        return (
          <div>
            <div>
            <h1>{myVideogame.name}</h1>
                <img src={myVideogame.image} alt="Imagen no encontrada"/>
                <h2>Rating: {myVideogame.rating}</h2>
                <p dangerouslySetInnerHTML={{__html: myVideogame.description}}></p>
                <h4>Fecha de lanzamiento: {myVideogame.released}</h4>
                <h4>Plataformas: {myVideogame.platforms}</h4> {/* COMO SEPARARLOS */}
                <h4>Géneros: {myVideogame.genres}</h4>  {/* COMO SEPARARLOS */}
              <Link to="/home">
                <button>Volver</button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            Cargando...
            <Link to="/home">
              <button>Volver</button>
            </Link>
          </div>
        );
      }

}