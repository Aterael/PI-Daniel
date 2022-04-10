import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import style from "./Detail.module.css"

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
          <div className={style.container}>
            <div>
            <h1>{myVideogame.name}</h1>
                <img className={style.imagen} src={myVideogame.image} alt="Imagen no encontrada"/>
                <h2>Rating: {myVideogame.rating}</h2>
                <p dangerouslySetInnerHTML={{__html: myVideogame.description}}></p>
                <h4>Fecha de lanzamiento: {myVideogame.released}</h4>
                <h4>Plataformas: {myVideogame.platforms?.join(", ")}</h4>
                <h4>Géneros: {myVideogame?.genres?.join(", ")}</h4>
              <Link to="/home">
                <button className={style.boton}>Volver al Home</button>
              </Link>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            Ups! Algo malo ha pasao, regresa al Home!
            <Link to="/home">
              <button>Volver</button>
            </Link>
          </div>
        );
      }

}