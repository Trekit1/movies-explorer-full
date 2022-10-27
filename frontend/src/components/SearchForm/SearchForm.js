import './SearchForm.css'
import '../App/App.css';

function SearchForm({moviesFilter}) {

    return(
        <section className='searchForm'>
            <form className='searchForm__search'>
              <input className='serchForm__input' placeholder='Фильм' required/>
              <button type='submit' className='searchForm__button page__link'>Найти</button>
            </form>
            <div className='searchForm__filter'>
              <input type='checkbox' className='searchForm__checkbox' onClick={moviesFilter}/>
              <p className='searchForm__filter-text'>Короткометражки</p>
            </div>
        </section>
    )
}

export default SearchForm