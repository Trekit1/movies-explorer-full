import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({onOpen, moviesFilter, movies, deleteMovie}) {

    return(
        <>
        <Header onOpen={onOpen}/>
        <main>
          <SearchForm moviesFilter={moviesFilter}/>
          <MoviesCardList movies = {movies} deleteMovie={deleteMovie}/>
          <div className='savedMovies__saveddevider'></div>
        </main>
        <Footer/>
        </>
    )
}

export default SavedMovies