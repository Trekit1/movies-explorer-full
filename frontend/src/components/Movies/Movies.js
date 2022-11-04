import './Movies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../App/App.css';
import Preloader from '../Preloader/Preloader';


function Movies({onOpen, movies, useFilterMovies, saveMovie, loading, useFormWithValidation, searchMovies, userMovies, deleteMovie, searchError, notFound}) {

    function handleMoviesList() {
        return (
            <>
            <MoviesCardList movies = {movies} saveMovie={saveMovie} userMovies={userMovies} deleteMovie={deleteMovie} searchError={searchError} notFound={notFound}/>
            </>
        )
    }
 
    return(
        <>
        <Header onOpen={onOpen}/>
        <main>
          <SearchForm useFilterMovies={useFilterMovies} useFormWithValidation={useFormWithValidation} searchMovies={searchMovies}/>
          {loading ? <Preloader/> :  handleMoviesList()}
        </main>
        <Footer/>
        </>
    )
}

export default Movies