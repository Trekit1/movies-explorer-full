import './Form.css';
import '../Register/Register.css'
import logo from '../../images/logoPromoHeader.svg';
import '../App/App.css';
import { Link } from "react-router-dom";

function Form({title, buttonName, question, linkName, children, to, handleSubmit, handleChangeEmail, handleChangePassword}) {

    return (
        <form className='form' onSubmit={handleSubmit}>
            <Link to='/' className='form__logo page__link'><img src={logo} alt='logoForm'/></Link>
            <h2 className='form__title'>{title}</h2>
            {children}
            <p className='form__input-name'>E-mail</p>
            <input  className='form__input form__input_email' type="email" minLength="2" required onChange={handleChangeEmail}></input>
            <p className='form__input-name'>Пароль</p>
            <input className='form__input form__input_password' minLength="2" maxLength="30" required onChange={handleChangePassword}></input>
            <button type="submit" className={children ? 'form__button page__link register__button' : 'form__button page__link'}>{buttonName}</button>
            <div className='form__under-text'>
              <p className="form__question">{question}</p>
              <Link to={to} className='form__link page__link'>{linkName}</Link>
            </div>
            
        </form>
    )
}

export default Form

