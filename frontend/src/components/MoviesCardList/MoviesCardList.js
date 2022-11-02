import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';
import { Route } from 'react-router-dom';
import {useEffect, useState} from 'react';



function MoviesCardList({movies, saveMovie, deleteMovie, userMovies, searchError, notFound}) {

    let moviesLength = movies.length;
    const width = window.screen.width;

    let numberOfMovies = 8;

    if (width >= 1280) {numberOfMovies = 12};
    if (width >= 768 && width < 1279) {numberOfMovies = 8};
    if (width <= 320) {numberOfMovies = 5};

    
    const [isNeedMore, setIsNeedMore] = useState(false)
    const [isNumberOfMovies, setIsNumberOfMovies] = useState(numberOfMovies);

    function onResize () {
        if (width >= 1280) {setIsNumberOfMovies(12)};
        if (width >= 768 && width < 1279) {setIsNumberOfMovies(8)};
        if (width <= 320) {setIsNumberOfMovies(5)};
    };

    useEffect (() => {
        if (isNumberOfMovies >= moviesLength) {setIsNeedMore(true)} else {setIsNeedMore(false)}
        window.onresize = onResize;
    })
 
    function handeClick() {
            if (width >= 1280) {setIsNumberOfMovies(isNumberOfMovies + 3)};
            if (width >= 768 && width < 1279) {setIsNumberOfMovies(isNumberOfMovies + 2)};
            if (width <= 320) {setIsNumberOfMovies(isNumberOfMovies + 5)};
            if (isNumberOfMovies >= moviesLength) {setIsNeedMore(true)}            
    }

    const moreButtonClassName = `moviesCardList__more-button page__link ${
        isNeedMore ? "moviesCardList__more-button_invisible" : " "}`;

    const cardListClassName = `moviesCardList ${
        moviesLength === 0 ? "moviesCardList_flex" : " "}`;

    const notFoundClassName = `moviesCardList__text ${
        notFound ? "moviesCardList__text_show" : " "}`;
    
    const searchErrorClassName = `moviesCardList__text ${
        searchError ? "moviesCardList__text_show" : " "}`;

    const notFoundClass = `moviesCardList__text ${
        moviesLength === 0 ? "moviesCardList__text_show" : " "}`;

            
    return(
        <>
        <Route path='/movies'>
            <section className={cardListClassName}>
              {movies.map((movie, index) => {
                if (index >= isNumberOfMovies) { return } 
                  return( 
                    <MoviesCard movie={movie} key={index} saveMovie={saveMovie} deleteMovie={deleteMovie} userMovies={userMovies}/>)})}
                <p className={searchErrorClassName}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
                <p className={notFoundClassName}>Ничего не найдено.</p>
            </section>
            <div className='moviesCardList__more'>
              <button type='button' className={moreButtonClassName} onClick={handeClick}>Еще</button>
            </div>
        </Route>

        <Route path='/saved-movies'>
            <section className={cardListClassName}>
                {movies.map((movie, index) => (
                  <MoviesCard movie={movie} key={index} saveMovie={saveMovie} deleteMovie={deleteMovie} userMovies={userMovies}/>))}
                  <p className={searchErrorClassName}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
                  <p className={notFoundClass}>Ничего не найдено.</p>
            </section>
        </Route>
        </> 
    )
}

export default MoviesCardList