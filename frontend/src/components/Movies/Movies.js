import './Movies.css';
import Header from '../Header/Header'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../App/App.css';


function Movies({onOpen, movies, moviesFilter, saveMovie}) {

    return(
        <>
        <Header onOpen={onOpen}/>
        <main>
          <SearchForm moviesFilter={moviesFilter}/>
          <MoviesCardList movies = {movies} saveMovie={saveMovie}/>
          <div className='movies__more'>
              <button type='button' className='movies__more-button page__link'>Еще</button>
          </div>
        </main>
        <Footer/>
        </>
    )
}

export default Movies