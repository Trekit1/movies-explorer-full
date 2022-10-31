import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Menu from '../Menu/Menu';
import React, { useState, useEffect, useCallback} from "react";
import { Route, Switch, useHistory} from "react-router-dom";
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
  const [userMovies, setUserMovies] = useState([])
  const [currentUserMovies, setCurrentUserMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(false)
  const [filteredUserMovies, setFilteredUserMovies] = useState(false)

  const [loading, setLoading] = useState(false)

  const [textErrorApiRegister, setTextErrorApiRegister] = useState('');
  const [textErrorApiLogin, setTextErrorApiLogin] = useState('')

  function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
    return { values, handleChange, errors, isValid, resetForm, setValues };
  }

  useEffect(() => {
    setLoading(true)
    mainApi.getUserMovies()
    .then((res) => {
      setUserMovies(res)

    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    });
  },[loggedIn])

  useEffect(() => {
    setCurrentUserMovies(userMovies)
  },[userMovies]);

  useEffect(() => {
    setCurrentMovies(movies)
  },[movies]);

 
  function openMenu() {
    setIsMenu(true)
  }

  function closeMenu() {
    setIsMenu(false)
  }

  function userRegister(email, password, name) {
    mainApi
      .register(email, password, name)
      .then((res) => {
        history.push('/signin')
        setTextErrorApiRegister('')
      })
      .catch((err) => {
        setTextErrorApiRegister(err)
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
        setTextErrorApiLogin('')
        history.push("/movies");
      })
      .catch((err) => {
        setTextErrorApiLogin(err)
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
    mainApi.deleteHeaders();
    setLoggedIn(false);
    history.push("/");
  }

  function changeUserInfo(email, name) {
    mainApi.changeUserInfo(email, name)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function filterMovies() {
    if (filteredMovies) {
      setCurrentMovies(movies)
      setFilteredMovies(false)
    } else {
      setCurrentMovies((movies) => movies.filter((movie) => movie.duration <= 40))
      setFilteredMovies(true)
    }
  }

  function filterUserMovies() {
    if (filteredUserMovies) {
      setCurrentUserMovies(userMovies)
      setFilteredUserMovies(false)
    } else {
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.duration <= 40))
      setFilteredUserMovies(true)
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

  function searchMovies(values) {
    setLoading(true)
    moviesApi
      .getInitialMovies()
      .then((movies) => {
        setMovies(movies)
        setMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      });
  }

  function searchUserMovies(values) {
    setCurrentUserMovies(userMovies)
    setCurrentUserMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())))
  }
  
    return(
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route exact path='/'>
                <Main loggedIn={loggedIn}/>
              </Route>
              <ProtectedRoute path='/movies' component={Movies} loggedIn={loggedIn} loading={loading} onOpen={openMenu} filterMovies={filterMovies} movies={currentMovies} saveMovie={saveMovie} useFormWithValidation={useFormWithValidation} searchMovies={searchMovies} filter={filteredMovies} userMovies={userMovies} deleteMovie={deleteMovie}/>
              <ProtectedRoute path='/saved-movies' component={SavedMovies} loggedIn={loggedIn} loading={loading} onOpen={openMenu} filterMovies={filterUserMovies} deleteMovie={deleteMovie} movies={currentUserMovies} useFormWithValidation={useFormWithValidation} searchUserMovies={searchUserMovies} filter={filteredUserMovies} userMovies={userMovies}/>
              <ProtectedRoute path='/profile' component={Profile} loggedIn={loggedIn} onOpen={openMenu} getOut={getOut}  useFormWithValidation={useFormWithValidation} changeUserInfo={changeUserInfo}/>
              <Route path='/signup'>
                <Register userRegister={userRegister} useFormWithValidation={useFormWithValidation} textErrorApiRegister={textErrorApiRegister}/>
              </Route>
              <Route path='/signin'>
                <Login userAuthorization={userAuthorization} useFormWithValidation={useFormWithValidation} textErrorApiLogin={textErrorApiLogin}/>
              </Route>
            </Switch>
            <Menu isOpen={isMenu} onClose={closeMenu}/>
          </CurrentUserContext.Provider>
        </div>
    )
}

export default App