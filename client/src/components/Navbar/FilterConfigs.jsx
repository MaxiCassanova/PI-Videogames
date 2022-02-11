import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getGenres } from "../../actions/index";
import { filterVideogames, filterSearchVideogames } from "../../actions/index";
import { useLocation } from "react-router-dom";

export default function FilterConfigs() {
    
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    const [checks, setChecks] = useState(new Array(genres.length).fill(false));
    const location = useLocation();

    const [filterOptions, setFilterOptions] = useState({
        genres: [],
        created: 'all',
        ordenation: 'releasedDesc',
    });

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        if(target.type === 'checkbox'){
            let value = target.checked;
            let updatedChecks =checks.map((check, index) => {
                return index === target.index ? !check : check
            });
            setChecks(updatedChecks);
            if(value){
                setFilterOptions({
                    ...filterOptions,
                    genres: [...filterOptions.genres, name]
                });
            }else{
                setFilterOptions({
                    ...filterOptions,
                    genres: filterOptions.genres.filter(genre => genre !== name)
                });
            }
        }else{
            const value = target.value;
            setFilterOptions({
                ...filterOptions,
                [name]: value
            });
        }
    }

    function handleClick(e) {
        e.preventDefault();
        if(location.pathname === '/home'){
        dispatch(filterVideogames(filterOptions));
        }
        else {
            dispatch(filterSearchVideogames(filterOptions));
        }
    }

    


    return (
        <div>
            <>
              <h5>Configs</h5>
              <form>
                <select name="created" onChange={handleChange} value={filterOptions.created}>
                    <option value="all">All</option>
                    <option value="true">Created</option>
                    <option value="false">Not Created</option>
                </select>
                <select name="ordenation" onChange={handleChange} value={filterOptions.ordenation}>
                    <option value="releasedDesc">Newest</option>
                    <option value="releasedAsc">Oldest</option>
                    <option value="nameAsc">A-Z</option>
                    <option value="nameDesc">Z-A</option>
                    <option value="ratingDesc">Highest Rated</option>
                    <option value="ratingAsc">Lowest Rated</option>
                </select>
                <div>
                    <span>Genres:</span>
                    {genres?.map((genre,index) => {
                        return (
                        <div>
                        <input type="checkbox" name={genre.name}
                                               onChange={handleChange} 
                                               index={index}
                                               checked={checks[index]}
                                               key={genre.name}
                                            />
                            {genre.name}
                        </div>
                    )
                    })}
                <input type="submit" value="Filter" onClick={handleClick}/>

                </div>
                </form>
            </>
        </div>
    )
}