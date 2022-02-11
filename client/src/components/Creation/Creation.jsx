import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Utils/Banner/Banner";
import { getGenres, postVideogames} from "../../actions/index";
import { Link } from "react-router-dom";
import s from "./Creation.module.css";

function validateDay(day, month){
  let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let numberMonth = parseInt(month);
  let numberDay = parseInt(day);
  if(numberDay > monthDays[numberMonth-1]){
    return false;
  }
  if(numberDay < 1){
    return false;
  }
  return true;
}

export default function Creation() {
  const dispatch = useDispatch();
  const genres = useSelector(state => state.genres);
  const [checks, setChecks] = useState(new Array(19).fill(false));
  const [auxPlatform, setAuxPlatform] = useState("");
  const [videogame, setVideogame] = useState({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        platforms: [],
        createInDb: true,
        genres: []
      });
  const [avaibleButton, setAvaibleButton] = useState(true);
  const [error, setError] = useState({});
  const [successName, setSuccessName] = useState(false);
  const [successDetails, setSuccessDetails] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  
  useEffect(() => {
      setAvaibleButton(validateSubmit());
  }, [videogame, checks, videogame.platforms]);
  
  function validate(value, field){
    switch(field){
      case "name":
        if(value.length < 3){
          setError({...error, name: "Name must be at least 3 characters long", nameValid: false});
          return false;
        }
        setError({...error, name: "", nameValid: true});
        return true;
      case "description":
        if(value.length < 10){
          setError({...error, description: "Description must be at least 10 characters long", descriptionValid: false});
          return false;
        }
        setError({...error, descriptionValid: true, description: ""});
        return true;
      case "image":
        if(value.length < 3){
          setError({...error, image: "Image must be at least 3 characters long", imageValid: false});
          return false;
        }
        setError({...error, imageValid: true, image: ""});
        return true;
      case "released":
        let regex = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
        if(value.length < 8){
          setError({...error, released: "Released must have the following format: yyyy-mm-dd", releasedValid: false});
          return false;
        }
        if(!regex.test(value)){
          setError({...error, released: "Released must have the following format: yyyy-mm-dd", releasedValid: false});
          return false;
        }
        let dateSplit = value.split("-");
        if(dateSplit[1] > 12 || dateSplit[1] < 1){
          setError({...error, released: "Must be a valid month", releasedValid: false});
          return false;
        }
        if(dateSplit[2] > 31 || dateSplit[2] < 1){
          setError({...error, released: "Must be a valid day", releasedValid: false});
          return false;
        }
        if(!validateDay(dateSplit[2], dateSplit[1])){
          setError({...error, released: "Must be a valid day", releasedValid: false});
          return false;
        }
        setError({...error, releasedValid: "valid", released: ""});
        return true;
      case "rating":
        if(value.length < 1){
          setError({...error, rating: "Rating must be at least 1 character long", ratingValid: false});
          return false;
        }
        if(value.length > 4){
          setError({...error, rating: "Rating must be at most 4 characters long", ratingValid: false});
          return false;
        }
        if(value.length > 1){
        let regexRating = new RegExp(/[0-5]{1}[.]{1}[0-9]{1,2}/);
        if(!regexRating.test(value)){
          setError({...error, rating: "Rating must be a real number with up to 2 decimal places, between 0 and 5. Example: 4.23", ratingValid: false});
          return false;
        }
        let ratingSplit = value.split(".");
        if(ratingSplit[0] > 5 && ratingSplit[1] > 0){
          setError({...error, rating: "Rating cannot be higher than 5.00", ratingValid: false});
          return false;
        }}
        setError({...error, ratingValid: "valid", rating: ""});
        return true;
      case "platforms":
        if(!value){
          setError({...error, platforms: "You must select at least one platform", platformsValid: false});
          return false;
        }
        setError({...error, platforms: "", platformsValid: true});
        return true;
      case "genres":
        if(!value){
          setError({...error, genres: "You must select at least one genre", genresValid: false});
          return false;
        }
        setError({...error, genres: "", genresValid: true});
        return true;
      default:
        return true;
    }
  }

  function handleChangeName (e) {
    setSuccessName(validate(e.target.value, "name"));
    setVideogame({
      ...videogame,
      name: e.target.value
    });
  }  

  function handleSubmitName (e) {
    e.preventDefault();
    setFlag(true);
  }

  function handleChangeDetails (e) {
    const name = e.target.name;
    const value = e.target.value;
    validate(value, name);
    setVideogame({
      ...videogame,
      [name]: value
    });
  }

  function handleChangePlatforms (e) {
    validate(e.target.value, "platforms");
    setAuxPlatform(e.target.value);
  }

  function submitPlatforms(e){
    e.preventDefault();
    const value = auxPlatform;
    const flag = videogame.platforms.includes(value);
    if(!flag){
      setVideogame({
        ...videogame,
        platforms: [...videogame.platforms, value]
      });
    }
    validate(value, "platforms");
    setAuxPlatform("");
    
  }

  function removePlatforms(e){
    e.preventDefault();
    const value = e.target.value;
    let newPlatforms = videogame.platforms.filter(platform => platform !== value);
    setVideogame({
      ...videogame,
      platforms: newPlatforms
    });
    validate(videogame.platforms.length-1, "platforms");
  }

  function handleChangeGenres (e) {
    const target = e.target;
    const name = e.target.name;
    const value = e.target.checked;
    setChecks((prevChecks) => {
      prevChecks[target.id] = value;
      return prevChecks;
    })
    console.log(checks);
    if(value){
      setVideogame({
        ...videogame,
        genres: [...videogame.genres, name],
      });
    }else{
      setVideogame({
        ...videogame,
        genres: videogame.genres.filter(genre => genre !== name)
      });
    }
    if(value) validate(true, "genres");
    else validate(videogame.genres.length-1, "genres");
  }

  function validateSubmit(){
      if(!error.nameValid) return true;
      if(!error.descriptionValid) return true;
      if(!error.imageValid) return true;
      if(!error.releasedValid) return true;
      if(!error.ratingValid) return true;
      if(!error.platformsValid) return true;
      if(!error.genresValid) return true;
      
      return false;
  }

  function returnToName(){
    setFlag(false);
  }

  function handleSubmitDetails (e) {
    e.preventDefault();
    //dispatch(postVideogames(videogame));
    setSuccessDetails(true);
    console.log(videogame);
    dispatch(postVideogames(videogame));
    setChecks(new Array(genres.length).fill(false));
    setVideogame({
      name: "",
      description: "",
      image: "",
      released: "",
      rating: "",
      platforms: [],
      createInDb: true,
      genres: []
      });
  }

  function newCreation(e){
    e.preventDefault();
    setSuccessDetails(false);
    setSuccessName(false);
    setFlag(false);
    setError({});
  }
  
  return (
    <div className={s.background}>
      <Banner />
      {(!successDetails) ? (!flag ? (
      <div className={s.containerName}>
        <button className={s.invisibleButton}>Create your Videogame!</button>
          <form onSubmit={handleSubmitName}>
            <label>Name your Creation</label>
            <p>
            <input type="text" name="name" onChange={handleChangeName} value={videogame.name} placeholder="name your videogame"/>
            {error.name && <span>   {error.name}</span>}
            <input type="submit" value="Submit name" disabled={successName ? false:true}/>
            </p>
          </form>
      </div>
      ) : (
      <div className={s.containerDetails}>
        <button className={s.invisibleButton}>Create your Videogame!</button>
        <form onSubmit={handleSubmitDetails}>
          <div>
            <label>Description    </label>
            <input type="text" name="description" onChange={handleChangeDetails} value={videogame.description} placeholder="description" />
            {error.description && <span>   {error.description}</span>}
          </div>
          <div>
            <label>Image    </label>
            <input type="text" name="image" onChange={handleChangeDetails} value={videogame.image} placeholder="Image"/>
            {error.image && <span>   {error.image}</span>}
          </div>
          <div>
            <label>Released    </label>
            <input type="text" name="released" onChange={handleChangeDetails} value={videogame.released} placeholder="Released date"/>
            {error.released && <span>   {error.released}</span>}
          </div>
          <div>
            <label>Rating    </label>
            <input type="text" name="rating" onChange={handleChangeDetails} value={videogame.rating} placeholder="Rating"/>
            {error.rating && <span>   {error.rating}</span>}
          </div>
          <div>
            <label>Platforms    </label>
            <input type="text" name="platforms" onChange={handleChangePlatforms} value={auxPlatform} placeholder="Enter a platform"/>
            <button onClick={submitPlatforms}>Add Platform</button>
            <div>
              Platforms:
              {videogame.platforms.length > 0 ? videogame.platforms.map((platform, index) => {return (
                <div key={index}>
                  <button onClick={removePlatforms} value={platform}>x</button>
                  {platform}
                </div>
              )}) : <span>No platforms added. Platform is required</span> }
            </div>
          </div>
          <div>
            <label>Genres
            {genres.map((genre, index) => {return (
              <div key={index}>
                <label htmlFor={genre.name}> {genre.name}</label>
                <input id={index} type="checkbox" name={genre.name} index={index} onChange={handleChangeGenres} checked={checks[index]}/>
              </div>
              )})}
            </label>
          </div>
          <div>
            <button onClick={returnToName}>Return to name</button>
            <span>         </span>
            <button disabled={avaibleButton} onClick={handleSubmitDetails}>Submit your creation!</button>
          </div>
        </form>
      </div>
      )) : (
        <div>
          <h1>Your creation has been submitted!</h1>
          <Link to="/home">
            <button>Return to homepage</button>
          </Link>
          <button onClick={newCreation}>Create another videogame</button>
        </div>
      )}
    </div>
  );
}