import './Menu.css';
import '../App/App.css';
import { Link, NavLink} from "react-router-dom";

function Menu({isOpen, onClose}) {

    return(
        <div className={ isOpen ? `menu menu_opened` : `menu` }>
            <div className='menu__content'>
                <button type='button' className='menu-nav__close-button page__link' onClick={onClose}></button>
                <div className='menu-nav'>
                    <NavLink exact to='/' activeStyle={{ borderBottom: 'solid'}} className='menu-nav__tab page__link'>Главная</NavLink>
                    <NavLink to='/movies' activeStyle={{ borderBottom: 'solid'}} className='menu-nav__tab menu-nav__tab_movies page__link '>Фильмы</NavLink>
                    <NavLink to='/saved-movies' activeStyle={{ borderBottom: 'solid'}} className='menu-nav__tab menu-nav__tab_saved-movies page__link'>Сохраненные фильмы</NavLink>
                    <Link to='/profile'><button type='button' className='menu-nav__profile-button page__link'></button></Link>
                </div>
            </div>
        </div>
    )
}

export default Menu