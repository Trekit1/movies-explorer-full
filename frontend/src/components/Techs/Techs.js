import './Techs.css'
import '../Main/Main.css'

function Techs() {
    return(
        <section className='techs' id='techs'>
            <p className='main__subtitle'>Технологии</p>
            <div className='techs__main'>
              <p className='techs__title'>7 технологий</p>
              <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
              <ul className='techs__techs'>
                <li className='techs__tech'>HTML</li>
                <li className='techs__tech'>CSS</li>
                <li className='techs__tech'>JS</li>
                <li className='techs__tech'>React</li>
                <li className='techs__tech'>Git</li>
                <li className='techs__tech'>Express.js</li>
                <li className='techs__tech'>mongoDB</li>
              </ul>
            </div>
        </section>

    )
}

export default Techs
