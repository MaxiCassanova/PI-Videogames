import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { searchVideogames } from "../../actions";
import Banner from "../Utils/Banner/Banner.jsx";
import SearchResults from "./SearchResults.jsx";
import s from "./Search.module.css";


export default function Search(){
    const params = useParams();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(searchVideogames(params.search));
    }, [dispatch, params.search]);
    const videogames = useSelector(state => state.searchVideogames);
    return(
            <div className={s.container}>
              <Banner/>
                <>
                {
                    videogames.length > 0 ? (
                        <>
                    <SearchResults videogames={videogames}/>
                    </>
                    ) : (<></>)
                        
                }
                </>
            </div>
    )
}