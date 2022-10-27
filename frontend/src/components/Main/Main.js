import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import HeaderLending from '../HeaderLending/HeaderLending';
import Header from '../Header/Header';

function Main({loggedIn}) {
  if (loggedIn) {
    return(
      <>
      <Header/>
      <main>
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
      </main>
      <Footer/>
      </>
    )
  } else {
    return(
      <>
      <HeaderLending/>
      <main>
        <Promo/>
        <NavTab/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
      </main>
      <Footer/>
      </>
      )
  }
}

export default Main