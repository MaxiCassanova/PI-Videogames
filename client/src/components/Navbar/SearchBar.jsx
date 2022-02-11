import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./SearchBar.module.css";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        const value = e.target.value;
        setSearch(value);
    }

    function handleSubmit(e) {
        navigate(`/search/${search}`);
        if(search.length > 0){
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search" value={search} onChange={handleChange} className={s.searchInput}/>
            </form>
        </>
    )
}