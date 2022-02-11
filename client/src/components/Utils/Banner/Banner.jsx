import React from "react";
import NavBar from "../../Navbar/NavBar.jsx";
import s from "./Banner.module.css";
import logo from "../../../images/logo.png";
import { useState } from "react";
import FilterConfigs from "../../Navbar/FilterConfigs"

export default function Banner() {
    const [filterFlag, setFilterFlag] = useState(true);

    function handleFilter(e){
        e.preventDefault();
        setFilterFlag(!filterFlag);
    }
    return (
      <div>
        <div className={s.banner}>
            <img src={logo} alt="logo" />
            <div>
                <NavBar handleFilter={handleFilter}/>
            </div> 
        </div>
        <div className={filterFlag ? s.hide : s.show}>
                    <FilterConfigs />
        </div>  
      </div>
    )
}