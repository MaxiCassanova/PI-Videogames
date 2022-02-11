import React from "react";
import { useEffect } from "react";
import Banner from "../Utils/Banner/Banner.jsx";
import {useDispatch} from "react-redux";
import Pages from "./Pages.jsx";
import { getAllVideogames } from "../../actions/index.js";
import s from "./Home.module.css";


export default function Home(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllVideogames());
    }, [dispatch]);

    return (
        <div className={s.home}>
                <Banner/>
                <Pages/>
        </div>
    )
}