import './MoviesCard.css';
import { Route } from "react-router-dom";

function MoviesCard({movie, saveMovie, deleteMovie, userMovies}) {

    const isLiked = userMovies.some((i) => i.movieId === movie.id);

    function handleRemoveMovie() {
        deleteMovie(movie)
    }

    function handleLikeClick() {
        if (isLiked) {
            userMovies.some((i) => {
                if (i.movieId === movie.id) {
                    deleteMovie(i)
                }
            })
        } else {
            saveMovie(movie);
        }
    }
    
    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return hours + 'ч' + ' ' + minutes + 'мин';
    };;

    const cardLikeButtonClassName = `card__like-button page__link ${
        isLiked ? "card__like-button_active" : " "}`;
    
    return(
        <>
        <Route path='/movies'>
            <div className='card'>
                <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                    <img src={` https://api.nomoreparties.co/` + movie.image.url} className='card__image' alt='card'/>
                </a>
            <div className='card__under'>
                <div className='card__info'>
                  <h2 className='card__name'>{movie.nameRU}</h2>
                  <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                </div>
                <p className='card__time'>{getTimeFromMins(movie.duration)}</p>
            </div>
        </div>
        </Route>
        <Route path='/saved-movies'>
            <div className='card'>
                <a href={movie.trailerLink} target='_blank' rel="noreferrer">
                  <img src={` https://api.nomoreparties.co/` + movie.image} className='card__image' alt='card'/>
                </a>
            <div className='card__under'>
                <div className='card__info'>
                  <h2 className='card__name'>{movie.nameRU}</h2>
                  <button type='button' className='card__delete-button page__link' onClick={handleRemoveMovie}/>
                </div>
                <p className='card__time'>{getTimeFromMins(movie.duration)}</p>
            </div>
        </div>      
        </Route>
        </>

     
    )
}

export default MoviesCard