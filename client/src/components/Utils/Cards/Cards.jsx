import React from "react";
import { Link } from "react-router-dom";
import s from "./Cards.module.css";

export default function Cards(props){
    return (
        <div className={s.container}>
            <Link to={`/videogame/${props.id}`}>
                <button className={s.title}>{props.name}</button>
                <img src={props.image} alt='Img not found' width="200px" height="250px"/>
            </Link>
            <p>
            {props.genres.map(genre => {return <button>{genre}</button>})}
            </p>
        </div>
    )
}