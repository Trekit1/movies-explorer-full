import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import React from "react";

function Profile({onOpen, getOut}) { 

  const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
          <Header onOpen={onOpen}/>
          <main>
            <section className='profile'>
              <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
                <div className='profile__box_name'>
                  <p className='profile__name-string'>Имя</p>
                  <p className='profile__user-info'>{currentUser.name}</p>
               </div>
              <div className='profile__box_email'>
                <p className='profile__name-string'>E-mail</p>
                <p className='profile__user-info'>{currentUser.email}</p>
              </div>
              <p className='profile__edit-button page__link'>Редактировать</p>
              <p className='profile__logout-button page__link' onClick={getOut}>Выйти из аккаунта</p>
            </section>
          </main>
        </>
    )
}

export default Profile