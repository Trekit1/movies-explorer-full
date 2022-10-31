import './SearchForm.css'
import '../App/App.css';
import {Route} from 'react-router-dom';

function SearchForm({filterMovies, useFormWithValidation, searchMovies, searchUserMovies, filter}) {

  const {values, handleChange, isValid} = useFormWithValidation();

  function handleSubmitSearchMovies(evt) {
    evt.preventDefault();
    searchMovies(values)
  }

  function handleSubmitSearchUserMovies(evt) {
    evt.preventDefault();
    searchUserMovies(values)
  }

  const errorText = `searchForm__error ${isValid ? ' ' : 'searchForm__error_visible'}`
  const buttonClassName = `searchForm__button ${isValid ? 'page__link' : 'searchForm__button_disabled'}`

  const filterButtonClassName = `searchForm__test ${filter ? 'searchForm__test_active' : ''}`

    return(
        <section className='searchForm'>
          <Route path='/movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм'  required/>
              <button type='submit' className={buttonClassName} disabled={isValid ? false : true}>Найти</button>
            </form>
          </Route>
          <Route path='/saved-movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchUserMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм'  required/>
              <button type='submit' className={buttonClassName} disabled={isValid ? false : true}>Найти</button>
            </form>
          </Route>
          <span className={errorText}>Поле должно быть заполнено...</span>
          <div className='searchForm__filter'>
            <button type='button' className={filterButtonClassName} onClick={filterMovies}/>
            <p className='searchForm__filter-text'>Короткометражки</p>
          </div>
        </section>
    )
}

export default SearchForm