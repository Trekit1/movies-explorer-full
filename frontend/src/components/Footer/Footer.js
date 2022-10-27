import './Footer.css'

function Footer() {
    return(
        <footer className='footer'>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__under'>
                <p className='footer__text footer__text_copyright'>© 2020</p>
                <div className='footer__box'>
                    <p className='footer__text'>Яндекс.Практикум</p>
                    <p className='footer__text footer__text_gitHub'>Github</p>
                </div>
            </div>
        </footer>
    ) 
}

export default Footer