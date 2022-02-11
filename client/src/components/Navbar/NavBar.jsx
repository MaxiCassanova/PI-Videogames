import React from "react";
import SearchBar from "./SearchBar.jsx";
import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css";
import filterImage from "../../images/filter.png";

export default function NavBar({handleFilter}){

    return (
      <div>
        <nav className={s.navBar}>
            <NavLink to="/home">
                <button className={s.homeButton}> Home </button>
            </NavLink>
            <NavLink to="/create">
                <button className={s.homeButton}> Create a game </button>
            </NavLink>
            <div className={s.inline}>
                <SearchBar/>
                <button onClick={handleFilter} className={s.filterButton}>
                <img src={filterImage} alt="Filters"/>
                </button>
            </div>
        </nav>

      </div>
    )
}