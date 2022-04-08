import React from "react";

export default function Card({name, image, genres, rating}){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <h5>{rating}</h5>
            <img src={image} alt="img not found" width="250px" height="200px" />
        </div>
    )
}