import './SearchForm.css'
import '../App/App.css';
import {Route} from 'react-router-dom';
import { useState } from 'react';

function SearchForm({useFilterMovies, useFormWithValidation, searchMovies, searchUserMovies}) {

  const {values, handleChange, isValid} = useFormWithValidation();

  const [noValid, setNoValid] = useState(false)


  function handleSubmitSearchMovies(evt) {
    evt.preventDefault();
    if (evt.target.closest("form").checkValidity()) {
      setNoValid(false)
      searchMovies(values);
      localStorage.setItem('valSearchMovies', values.search);
    } else {
      setNoValid(true)
      return
    }
  }

  localStorage.setItem('test', JSON.stringify(values))

  let valSearchMovies = localStorage.getItem('valSearchMovies');


  function handleSubmitSearchUserMovies(evt) {
    evt.preventDefault();
    if (evt.target.closest("form").checkValidity()) {
      setNoValid(false)
      searchUserMovies(values)
    } else {
      setNoValid(true)
      return
    }
  }


  const errorText = `searchForm__error ${noValid ? 'searchForm__error_visible'  :  ' '}`

  let filterMovie = localStorage.getItem('filterMovie');


    return(
        <section className='searchForm'>
          <Route path='/movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм' defaultValue={valSearchMovies || ""}  required/>
              <button type='submit' className='searchForm__button page__link'>Найти</button>
            </form>
            <span className={errorText}>Поле должно быть заполнено...</span>
            <div className='searchForm__filter'>
              <input type='checkbox' className='searchForm__checkbox' onChange={useFilterMovies} defaultChecked={filterMovie === 'true' ? true : false}/>
              <p className='searchForm__filter-text'>Короткометражки</p>
          </div>
          </Route>
          <Route path='/saved-movies'>
            <form className='searchForm__search' onSubmit={handleSubmitSearchUserMovies} noValidate onChange={handleChange}>
              <input name='search' className='serchForm__input' placeholder='Фильм' required/>
              <button type='submit' className='searchForm__button page__link'>Найти</button>
            </form>
            <span className={errorText}>Поле должно быть заполнено...</span>
            <div className='searchForm__filter'>
            <input type='checkbox' className='searchForm__checkbox' onChange={useFilterMovies}/>
              <p className='searchForm__filter-text'>Короткометражки</p>
           </div>
          </Route>
          
        </section>
    )
}

export default SearchForm