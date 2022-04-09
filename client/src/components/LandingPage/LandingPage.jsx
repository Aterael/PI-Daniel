import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return(
        <div className="container">
            <div className="container_botton">
            <h1 className="h1">A jugar!</h1>
                <button className="boton">
                    <Link to="/home" className="link">START</Link>
                </button>
            
            </div>
        </div>
    )
}