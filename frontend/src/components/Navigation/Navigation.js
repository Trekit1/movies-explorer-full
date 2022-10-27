import './Navigation.css';
import { Link} from "react-router-dom";
import '../App/App.css';


function Navigation({onOpen}) {

    return(
        <section className='navigation'>
            <Link to='/movies' className='navigation__films page__link'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__save-films page__link'>Сохраненные фильмы</Link>
            <Link to='/profile'>
              <button type='button' className='navigation__button-profile page__link'></button>
            </Link>
            <button type='button' className='navigation__button-menu page__link' onClick={onOpen}/>
        </section>
    )
}

export default Navigation