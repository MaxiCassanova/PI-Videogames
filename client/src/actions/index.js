import axios from 'axios';


export function getAllVideogames (){
    return function (dispatch) {
        axios.get('http://localhost:3001/videogames')
        .then(videogames => dispatch({
            type: 'GET_ALL_VIDEOGAMES',
            payload: videogames.data,
        }))
        .catch(error => console.log(error));
    }
}
export function filterVideogames(filterOptions){
    if (!filterOptions) {
        filterOptions = {
            genres: [], 
            created:'all', 
            ordenation: 'releasedDesc',
        }
    }
    return {
        type: 'FILTER_VIDEOGAMES',
        payload: filterOptions,
    }
}
export function filterSearchVideogames(filterOptions){
    if (!filterOptions) {
        filterOptions = {
            genres: [], 
            created:'all', 
            ordenation: 'releasedDesc',
        }
    }
    return {
        type: 'FILTER_SEARCH_VIDEOGAMES',
        payload: filterOptions,
    }
}
export function getGenres(){
    return function(dispatch){
        axios.get('http://localhost:3001/genres')
        .then(genres => dispatch({
            type: 'GET_GENRES',
            payload: genres.data,
        }))
        .catch(error => console.log(error));
    }
}
export function searchVideogames(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/videogames?name=${search}`)
        .then(videogames => dispatch({
            type: 'SEARCH_VIDEOGAMES',
            payload: videogames.data,
        }))
        .catch(error => console.log(error));
    }
}



export function postVideogames(payload){
    return function(dispatch){
    axios.post('http://localhost:3001/videogames', payload)
    .then(response => dispatch({
        type: 'POST_VIDEOGAMES',
        payload: response.data}))
    .catch(error => console.log(error));
    }
}