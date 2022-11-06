import './AboutMe.css';
import photo from '../../images/AboutMePhoto.png'

function AboutMe() {
    return(
        <section className='aboutMe' id='student'>
            <p className='main__subtitle'>Студент</p>
            <div className='aboutMe__box'>
              <div className='aboutMe__info'>
                  <p className='aboutMe__name'>Виталий</p>
                  <p className='aboutMe__prof'>Фронтенд-разработчик, 30 лет</p>
                  <p className='aboutMe__about'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
                   Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                    После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                  </p>
                  <p className='aboutMe__gitHub'>Github</p>
              </div>
              <img src={photo} className='aboutMe__photo' alt='foto'/>
            </div>
        </section>
    )
}

export default AboutMe