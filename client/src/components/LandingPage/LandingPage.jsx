import React from "react";
import {Link} from "react-router-dom";
import style from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={style.container}>
            <div className={style.container_botton}>
            <h1 className={style.h1}>A jugar!</h1>
                <button className={style.boton}>
                    <Link to="/home" className={style.link}>START</Link>
                </button>
            
            </div>
        </div>
    )
}