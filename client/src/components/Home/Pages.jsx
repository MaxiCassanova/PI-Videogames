import React from "react";
import Cards from "../Utils/Cards/Cards.jsx";
import { useSelector,} from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import s from "./Pages.module.css";

export default function Pages() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") || 1);
    const [flag, setFlag] = useState(false);
    const [pagedGames, setPagedGames] = useState([]);
    const PAGE_SIZE = 15;
    const videogames = useSelector(state => state.videogames);
    const filterVideogames = useSelector(state => state.filteredVideogames);
    const filterOptions = useSelector(state => state.filterOptions);

    function createPages(videogames, page) {
        if(!videogames) return [];
        if(page < 1) setPage(1);
        if(page !== Math.floor(page)){
            setPage(Math.floor(page));
        }
        if(videogames.length < PAGE_SIZE){
            return videogames;
        }
        let start = (page - 1) * PAGE_SIZE;
        let end = page * PAGE_SIZE;
        if (end > videogames.length) {
            return videogames.slice(start);
        }
        return videogames.slice(start, end);
    }

    function nextPage(page, setPage){
        if(page < Math.ceil(filterVideogames.length / PAGE_SIZE)){
            setPage(page + 1);
        }
        setFlag(true);
    }

    function prevPage(page, setPage){
        if(page > 1){
            setPage(page - 1);
        }
        setFlag(true);
    }

    useEffect(() => {
        if( flag || page !== 1 ) navigate(`/home?page=${page}`);
        setPagedGames(createPages(filterVideogames, page));
    }, [filterVideogames, page, filterOptions, flag, navigate]);
    

    return (
        <div className={s.container}>
            <h1>Pages</h1>
            
            {videogames?.length > 0 ? (
            <div className={s.pages}>
            <div className={s.cards}>
           {pagedGames?.map(videogame => { 
               return <Cards key={videogame.id} id={videogame.id} name={videogame.name} image={videogame.image} genres={videogame.genres} />
            })}
            </div> </div>) : (<div className={s.loading}>
                                <div className={s.loadingWrap}>
                                    <div className={s.triangle1}></div>
                                    <div className={s.triangle2}></div>
                                    <div className={s.triangle3}></div>
                                </div>
                              </div>)
            }
           
            <div>
                <a href="#top">
                <button className={s.invisibleButton} onClick={() => prevPage(page, setPage)}>{'<<'}</button>
                </a>
                <button className={s.invisibleButton}>{page}</button>
                <a href="#top">
                <button className={s.invisibleButton} onClick={() => nextPage(page, setPage)}>{'>>'}</button>
                </a>
            </div>
        </div>
    )
}