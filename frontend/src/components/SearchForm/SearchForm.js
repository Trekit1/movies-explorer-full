import './SearchForm.css'
import '../App/App.css';
import {Route} from 'react-router-dom';

function SearchForm({filterMovies, useFormWithValidation, searchMovies, searchUserMovies}) {

  const {values, handleChange, isValid} = useFormWithValidation();

  function handleSubmitSearchMovies(evt) {
    evt.preventDefault();
    searchMovies(values)
    localStorage.setItem('valSearchMovies', values.search)
  }

  let valSearchMovies = localStorage.getItem('valSearchMovies');


  function handleSubmitSearchUserMovies(evt) {
    evt.preventDefault();
    searchUserMovies(values)
  }


  const errorText = `searchForm__error ${isValid ? ' ' : 'searchForm__error_visible'}`
  const buttonClassName = `searchForm__button ${isValid ? 'page__link' : 'searchForm__button_disabled'}`

  let filterMovie = localStorage.getItem('filterMovie');




    return(
        <section className='searchForm'>
          <Route path='/movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм' defaultValue={valSearchMovies || ""}  required/>
              <button type='submit' className={buttonClassName} disabled={isValid ? false : true}>Найти</button>
            </form>
            <span className={errorText}>Поле должно быть заполнено...</span>
            <div className='searchForm__filter'>
              <input type='checkbox' className='searchForm__checkbox' onChange={filterMovies} defaultChecked={filterMovie === 'true' ? true : false}/>
              <p className='searchForm__filter-text'>Короткометражки</p>
          </div>
          </Route>
          <Route path='/saved-movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchUserMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм' required/>
              <button type='submit' className={buttonClassName} disabled={isValid ? false : true}>Найти</button>
            </form>
            <span className={errorText}>Поле должно быть заполнено...</span>
            <div className='searchForm__filter'>
            <input type='checkbox' className='searchForm__checkbox' onChange={filterMovies}/>
              <p className='searchForm__filter-text'>Короткометражки</p>
           </div>
          </Route>
          
        </section>
    )
}

export default SearchForm