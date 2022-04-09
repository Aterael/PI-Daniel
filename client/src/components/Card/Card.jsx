import React from "react";
import "./Card.css"

export default function Card({name, image, genres, rating}){
    return (
        <div className="container_videogame">
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            <img className="img_videogame" src={image} alt="img not found"/>
        </div>
    )
}