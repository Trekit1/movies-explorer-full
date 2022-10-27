import './AboutProject.css'
import '../Main/Main.css'

function AboutProject() {
    return(
        <section className='aboutProject' id='aboutProject'>
            <p className='main__subtitle'>О проекте</p>
            <div className='aboutProject__box'>
                <div className='aboutProject__column'>
                  <p className='aboutProject__title'>Дипломный проект включал 5 этапов</p>
                  <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='aboutProject__column'>
                  <p className='aboutProject__title'>На выполнение диплома ушло 5 недель</p>
                  <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='aboutProject__strings'>
              <p className='aboutProject__string aboutProject__string_back aboutProject__string-text'>1 неделя</p>
              <p className='aboutProject__string aboutProject__string_front aboutProject__string-text'>4 недели</p>
            </div>
              <div className='aboutProject__under-strings'>
              <p className='aboutProject__under-string aboutProject__under-string_back aboutProject__under-text'>Back-end</p>
              <p className='aboutProject__under-string aboutProject__under-string_front aboutProject__under-text'>Front-end</p>
            </div>
        </section>
    )

}

export default AboutProject