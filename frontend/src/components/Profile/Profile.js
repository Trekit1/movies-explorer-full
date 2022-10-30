import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import React from "react";
import {useEffect, useState} from 'react';

function Profile({onOpen, getOut, useFormWithValidation, changeUserInfo}) { 

  const currentUser = React.useContext(CurrentUserContext);



  const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);


  function handleSubmit(e) {
    e.preventDefault();
    changeUserInfo({
      name,
      email
    });
    resetForm();
  }

  const buttonClassName = `profile__edit-button page__link $ ${isValid ? ' ' : 'profile__edit-button_disabled'}`

    return(
        <>
          <Header onOpen={onOpen}/>
          <main>
            <section className='profile'>
              <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
              <form className='profile__form' onChange={handleChange} onSubmit={handleSubmit}>
                <div className='profile__box_name'>
                  <p className='profile__name-string'>Имя</p>
                  <input type='text' name='userName' value={name || ""} className='profile__user-info' onChange={handleChangeName} minLength="2" maxLength="30" required/>
                </div>
                <div className='profile__box_email'>
                  <p className='profile__name-string'>E-mail</p>
                  <input type='email' name='userEmail' value={email || ""} className='profile__user-info' onChange={handleChangeEmail} minLength="2" required/>
                </div>
                <button type='submit' className={buttonClassName} disabled={isValid ? false : true}>Редактировать</button>
              <p className='profile__logout-button page__link' onClick={getOut}>Выйти из аккаунта</p>
              </form>
        
            </section>
          </main>
        </>
    )
}

export default Profile