import './Movies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../App/App.css';
import Preloader from '../Preloader/Preloader';


function Movies({onOpen, movies, filterMovies, saveMovie, loading, useFormWithValidation, searchMovies, filter, userMovies, deleteMovie}) {

    function handleMoviesList() {
        return (
            <>
            <MoviesCardList movies = {movies} saveMovie={saveMovie} userMovies={userMovies} deleteMovie={deleteMovie}/>
            <div className='movies__more'>
              <button type='button' className='movies__more-button page__link'>Еще</button>
            </div>
            </>
        )
    }
 
    return(
        <>
        <Header onOpen={onOpen}/>
        <main>
          <SearchForm filterMovies={filterMovies} useFormWithValidation={useFormWithValidation} searchMovies={searchMovies} filter={filter}/>
          {loading ? <Preloader/> :  handleMoviesList()}
        </main>
        <Footer/>
        </>
    )
}

export default Movies