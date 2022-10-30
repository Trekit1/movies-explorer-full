import './MoviesCard.css';
import {useState} from 'react'
import { Route } from "react-router-dom";

function MoviesCard({movie, saveMovie, deleteMovie}) {

    const [isLiked, setIsLiked] = useState(false)

    function removeMovie() {
        deleteMovie(movie)
    }

    function like() {
        saveMovie(movie);
        setIsLiked(true);
    }
    
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч' + ' ' + minutes + 'мин';
    };;

    const cardLikeButtonClassName = `card__like-button page__link ${
        isLiked ? "card__like-button_active" : " "}`;
    
    return(
        <div className='card'>
            <Route path='/movies'>
                <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                    <img src={` https://api.nomoreparties.co/` + movie.image.url} className='card__image' alt='card'/>
                </a>
            </Route>
            <Route path='/saved-movies'>
                <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                    <img src={` https://api.nomoreparties.co/` + movie.image} className='card__image' alt='card'/>
                </a>
            </Route>
            <div className='card__under'>
                <div className='card__info'>
                  <h2 className='card__name'>{movie.nameRU}</h2>
                  <Route path='/movies'><button type='button' className={cardLikeButtonClassName} onClick={like}/></Route>
                  <Route path='/saved-movies'><button type='button' className='card__delete-button page__link' onClick={removeMovie}/></Route>
                </div>
                <p className='card__time'>{getTimeFromMins(movie.duration)}</p>
            </div>
        </div>
    )
}

export default MoviesCard