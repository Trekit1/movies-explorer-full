import './Header.css';
import logo from '../../images/logoPromoHeader.svg';
import Navigation from '../Navigation/Navigation';
import '../App/App.css';
import { Link } from "react-router-dom";

function Header({onOpen}) {
    return(
        <header className='header'>
          <Link to='/'>
          <img src={logo} className='header__logo page__link' alt='Logo'/>
          </Link>
          <Navigation onOpen={onOpen}/>
        </header>
    )
}

export default Header
