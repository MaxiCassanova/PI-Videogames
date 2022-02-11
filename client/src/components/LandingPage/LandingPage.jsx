import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";
import logo from "../../images/logo.png";
import { useState } from "react";

export default function LandingPage() {
    const [flag, setFlag] = useState(false);

    function handleClick() {
        setFlag(true);
    }

    return (
        <div className={s.backgroundImage}>
            <a href="https://www.youtube.com/watch?v=iclPAx8jMOA" target="_blank" onClick={handleClick} >
                <div className={flag ? s.displayNone : s.advertisement}>
                </div>
            </a>
            <div className={s.container}>
                <div className={s.title}>
                    <img src={logo} alt="Logo"/>
                </div>
                <div>
                    <Link to="/home">
                        <button className={s.myButton}>Enter</button>
                    </Link>
                </div>
            </div>
        </div>
    );}