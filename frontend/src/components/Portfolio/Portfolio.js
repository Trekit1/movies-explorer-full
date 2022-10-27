import './Portfolio.css'
import strelka from '../../images/portfolioStr.svg';

function Portfolio() {

    const staticSiteLink = 'https://github.com/Trekit1/how-to-learn'
    const adaptivSiteLink = 'https://github.com/Trekit1/russian-travel'
    const singlePageAppLink ='https://github.com/Trekit1/react-mesto-api-full'

    return(
        <section className='portfolio'>
            <p className='portfolio__title'>Портфолио</p>
            <ul className='portfolio__links'>
              <li className='portfolio__link-box'>
                <a href={staticSiteLink} target='_blank' className='portfolio__link  page__link' rel="noreferrer">
                  <p className='portfolio__link-name'>Статичный сайт</p>
                  <img src={strelka} className='portfolio__link-img' alt='strelka'/>
                </a>
              </li>
              <li className='portfolio__link-box'>
                <a href={adaptivSiteLink} target='_blank' className='portfolio__link  page__link' rel="noreferrer">
                  <p className='portfolio__link-name'>Адаптивный сайт</p>
                  <img src={strelka} className='portfolio__link-img' alt='strelka'/>
                </a>
              </li>
              <li className='portfolio__link-box'>
                <a href={singlePageAppLink} target='_blank' className='portfolio__link  page__link' rel="noreferrer">
                  <p className='portfolio__link-name'>Одностраничное приложение</p>
                  <img src={strelka} className='portfolio__link-img' alt='strelka'/>
                </a>
              </li>
            </ul>
        </section>
    )
}

export default Portfolio

