import './HeaderLending.css';
import '../Header/Header.css';
import logo from '../../images/logoPromoHeader.svg';
import '../App/App.css';
import { Link } from "react-router-dom";

function HeaderLending() {
    return(
        <header className='header-lending'>
          <Link to='/'>
          <img src={logo} className='header__logo page__link' alt='Logo'/>
          </Link>
          <div className='header-lending__links'>
            <Link to='/signup' className='header-lending__link page__link'>Регистрация</Link>
            <Link to='/signin'><button type='button' className='header-lending__button header-lending__link page__link' >Войти</button></Link>
          </div>
        </header>
    )
}

export default HeaderLending