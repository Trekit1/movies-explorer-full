import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';



function SavedMovies({onOpen, filterMovies, movies, deleteMovie, loading, userMovies, useFormWithValidation, searchUserMovies, filter}) {

  function handleMoviesList() {
    return (
        <>
        <MoviesCardList movies = {movies} deleteMovie={deleteMovie} userMovies={movies}/>
        <div className='savedMovies__saveddevider'></div>
        </>
    )
}

    return(
        <>
        <Header onOpen={onOpen}/>
        <main>
          <SearchForm filterMovies={filterMovies} userMovies={userMovies} useFormWithValidation={useFormWithValidation} searchUserMovies={searchUserMovies} filter={filter}/>
          {loading ? <Preloader/> :  handleMoviesList()}
        </main>
        <Footer/>
        </>
    )
}

export default SavedMovies