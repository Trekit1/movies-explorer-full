import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Menu from '../Menu/Menu';
import React, { useState, useEffect} from "react";
import { Route, Switch, useHistory, Redirect} from "react-router-dom";
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../CurrentUserContext/CurrentUserContext'
import { moviesApi } from '../../utils/MoviesApi';


function App() {

  const history = useHistory();

  const [isMenu, setIsMenu] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [filter, setFilter] = useState(false)
  const [userMovies, setUserMovies] = useState([])
  const [currentUserMovies, setCurrentUserMovies] = useState([]);
  const [userMoviesfilter, setUserMoviesFilter] = useState(false)

  useEffect(() => {
    mainApi.getUserMovies()
    .then((res) => {
      setUserMovies(res)
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  },[loggedIn])

  useEffect(() => {
    setCurrentUserMovies(userMovies)
  },[userMovies]);

 
  function openMenu() {
    setIsMenu(true)
  }

  function closeMenu() {
    setIsMenu(false)
  }

  useEffect(() => {
    moviesApi
      .getInitialMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  useEffect(() => {
    setCurrentMovies(movies)
  },[movies]);



  function userRegister(email, password, name) {
    mainApi
      .register(email, password, name)
      .catch((err) => {
        console.log(err);
      });
  }

  function userAuthorization(email, password) {
    mainApi
      .authorization(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem('token')
        mainApi.updateHeaders(token)
      })
      .then((res) => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function authoriz(token) {
    const content = mainApi.getContent(token)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res)
      }
    })
    .catch((err) => {
      console.log(err);
    })
    return content;
  }

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authoriz(token);
    }
  }, [loggedIn]);

  function getOut() {
    localStorage.removeItem("token");
    moviesApi.deleteHeaders();
    setLoggedIn(false);
    history.push("/");
  }

  function moviesFilter() {
    if (filter) {
      setCurrentMovies(movies)
      setFilter(false)
    } else {
      setCurrentMovies((movies) => movies.filter((movie) => movie.duration <= 40))
      setFilter(true)
    }
  }

  function userMoviesFilter() {
    if (userMoviesfilter) {
      setCurrentUserMovies(userMovies)
      setUserMoviesFilter(false)
    } else {
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.duration <= 40))
      setUserMoviesFilter(true)
    }
  }

  function saveMovie(movie) {
    mainApi.likeMovie(movie)
    .then((res) => {
      setUserMovies([res, ...userMovies,])
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function deleteMovie(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        setUserMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }



    return(
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route exact path='/'>
                <Main loggedIn={loggedIn}/>
              </Route>
              <ProtectedRoute path='/movies' component={Movies} onOpen={openMenu} moviesFilter={moviesFilter} movies={currentMovies} saveMovie={saveMovie} loggedIn={loggedIn}/>
              <ProtectedRoute path='/saved-movies' component={SavedMovies} onOpen={openMenu} moviesFilter={userMoviesFilter} deleteMovie={deleteMovie} movies={currentUserMovies} loggedIn={loggedIn}/>
              <ProtectedRoute path='/profile' component={Profile} onOpen={openMenu} getOut={getOut} loggedIn={loggedIn}/>
              <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/movies" />}
              </Route>
              <Route path='/signup'>
                <Register userRegister={userRegister}/>
              </Route>
              <Route path='/signin'>
                <Login setLoggedIn={setLoggedIn} userAuthorization={userAuthorization}/>
              </Route>
            </Switch>
            <Menu isOpen={isMenu} onClose={closeMenu}/>
          </CurrentUserContext.Provider>
        
        </div>
    )
}

export default App