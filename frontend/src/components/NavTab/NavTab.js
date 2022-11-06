import './NavTab.css'
import '../App/App.css';

function NavTab() {
    return (
        <section className = 'navTab'>
            <nav className='navTab__box'>
                <a href='#aboutProject' className='navTab__link page__link'>О проекте</a>
                <a href='#techs' className='navTab__link page__link'>Технологии</a>
                <a href='#student' className='navTab__link page__link'>Студент</a>
            </nav>
        </section>
    )
}

export default NavTab