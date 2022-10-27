import './Menu.css';
import '../App/App.css';
import { Link} from "react-router-dom";

function Menu({isOpen, onClose}) {

    return(
        <div className={ isOpen ? `menu menu_opened` : `menu` }>
            <div className='menu__content'>
                <button type='button' className='menu-nav__close-button page__link' onClick={onClose}></button>
                <div className='menu-nav'>
                    <Link to='/' className='menu-nav__tab page__link'>Главная</Link>
                    <Link to='/movies' className='menu-nav__tab menu-nav__tab_movies menu-nav__tab_active page__link '>Фильмы</Link>
                    <Link to='/saved-movies' className='menu-nav__tab menu-nav__tab_saved-movies page__link'>Сохраненные фильмы</Link>
                    <Link to='/profile'>
                    <button type='button' className='menu-nav__profile-button page__link'></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Menu