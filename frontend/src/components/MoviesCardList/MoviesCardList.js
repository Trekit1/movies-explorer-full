import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React from 'react';



function MoviesCardList({movies, saveMovie, deleteMovie, userMovies}) {
   
    return(
        <section className='moviesCardList'>
            {movies.map((movie, index) => (
                <MoviesCard movie={movie} key={index} saveMovie={saveMovie} deleteMovie={deleteMovie} userMovies={userMovies}/>))}
        </section>
    )
}

export default MoviesCardList