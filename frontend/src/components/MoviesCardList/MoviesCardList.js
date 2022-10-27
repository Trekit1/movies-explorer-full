import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'



function MoviesCardList({movies, saveMovie, deleteMovie}) {
   
    return(
        <section className='moviesCardList'>
            {movies.map((movie) => (
                <MoviesCard movie={movie} key={movie.id} saveMovie={saveMovie} deleteMovie={deleteMovie}/>))}
        </section>
    )
}

export default MoviesCardList