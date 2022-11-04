import './Navigation.css';
import { Link, NavLink} from "react-router-dom";
import '../App/App.css';


function Navigation({onOpen}) {

    return(
        <section className='navigation'>
            <NavLink to='/movies'  activeStyle={{ fontWeight: 500}} className='navigation__films page__link'>Фильмы</NavLink>
            <NavLink to='/saved-movies' activeStyle={{ fontWeight: 500}} className='navigation__films navigation__films_saved page__link'>Сохраненные фильмы</NavLink>
            <Link to='/profile'>
              <button type='button' className='navigation__button-profile page__link'></button>
            </Link>
            <button type='button' className='navigation__button-menu page__link' onClick={onOpen}/>
        </section>
    )
}

export default Navigation