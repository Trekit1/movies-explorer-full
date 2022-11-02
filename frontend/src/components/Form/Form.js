import './Form.css';
import '../Register/Register.css'
import logo from '../../images/logoPromoHeader.svg';
import '../App/App.css';
import { Link, Route } from "react-router-dom";

function Form({title, buttonName, question, linkName, children, to, handleSubmit, handleChange, isValid, errors, textErrorApiRegister, textErrorApiLogin, isValidEmail}) 
    {

    const buttonClassName = `form__button ${children ? 'register__button' : ' '} ${isValid && isValidEmail ?  'page__link' : 'form__button_disabled'}`
    const errorText = `form__error-text ${isValid ? ' ' : 'form__error-text_visible'}`
    const inputEmailClassName = `form__input form__input_email ${errors.email === '' && isValidEmail ? ' ' : 'form__input_error'}`
    const inputPasswordClassName = `form__input form__input_password ${errors.password === '' ? ' ' : 'form__input_error'}`

    return (
        <form className='form' onSubmit={handleSubmit} onChange={handleChange} noValidate>
            <Link to='/' className='form__logo page__link'><img src={logo} alt='logoForm'/></Link>
            <h2 className='form__title'>{title}</h2>
            {children}
            <label htmlFor='email' className='form__input-name'>E-mail</label>
            <input name='email'  className={inputEmailClassName} type="email" minLength="2" required></input>
            <label htmlFor='password' className='form__input-name'>Пароль</label>
            <input type='password' name='password' className={inputPasswordClassName} minLength="2" maxLength="30" required></input>
            <span className={errorText}>Что-то пошло не так...</span>
            <div className= {`form__box ${children ? 'register__box' : ' '}`}>
                <Route path='/signup'><span className='form__api-error form__api-error_register'>{textErrorApiRegister}</span></Route>
                <Route path='/signin'><span className='form__api-error form__api-error_login'>{textErrorApiLogin}</span></Route>
                <button type="submit" className={buttonClassName} disabled={isValid ? false : true}>{buttonName}</button>
            </div>
            <div className='form__under-text'>
              <p className="form__question">{question}</p>
              <Link to={to} className='form__link page__link'>{linkName}</Link>
            </div>
            
        </form>
    )
}

export default Form

