import React from "react";
import Cards from "../Utils/Cards/Cards";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { filterSearchVideogames} from "../../actions";
import s from "./SearchResults.module.css";

export default function SearchResults(videogames) {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const filterOptions = useSelector(state => state.filterOptions);
  const searchVideogames = useSelector(state => state.filteredSearchVideogames);

  useEffect(() => {
    if (flag) {
    dispatch(filterSearchVideogames(filterOptions));
    }
    else {
    dispatch(filterSearchVideogames());
    setFlag(true);
    }

  }, [dispatch, flag, filterOptions]);

  return (
    <div className={s.container}>
        <h1>Search Results</h1>
        <div className={s.cardsContainer}>
          <div className={s.cards}>
          {
              searchVideogames?.length > 0 ? (
                  searchVideogames.map(videogame => {
                      return (
                            <Cards key={videogame.id} id={videogame.id} name={videogame.name} image={videogame.image} genres={videogame.genres} />
                      );}) 
              ) : 
              ( <h1>No Results</h1> ) 
          }
          </div>
        </div>
    </div>
  );
}