import React from "react";
import Axios from "axios";
import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Banner from "../Utils/Banner/Banner";
import s from "./Details.module.css";

function toString(value) {
    console.log(value);
    if(value !== undefined) {
    return value.join(", ");
    }
    return undefined
}
    
export default function Details() {
    const [details, setDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        Axios.get(`http://localhost:3001/videogames/${id}`)
            .then(res => { setDetails(res.data); return res.data })
            .catch(err => console.log(err))
    }, [id])


    return (
      <div className={s.background}>
        <Banner />
        <div className={s.container}>
            <button className={s.invisibleButton}>{details.name}</button>
            <div>
                <img src={details.image} alt={details.name} height="70%" width="50%" />
                <span>
                    <p>Released Date: {details.released}</p>
                    <p>Platforms: {toString(details.platforms)}</p>
                    <p>Genres: {toString(details.genres)}</p>
                    <p>Rating: {details.rating}</p>
                </span>
            </div>
            <p>{details.description}</p>
        </div>
      </div>
    );
}