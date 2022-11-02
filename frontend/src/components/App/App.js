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
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';


function App() {

  const history = useHistory();

  const [isMenu, setIsMenu] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [currentUserMovies, setCurrentUserMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(false);
  const [filteredUserMovies, setFilteredUserMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textErrorApiRegister, setTextErrorApiRegister] = useState('');
  const [textErrorApiLogin, setTextErrorApiLogin] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)

  function useFormWithValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
  
    const handleChange = (event) => {
      const EMAIL_REGEXP = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/iu;
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
      if (EMAIL_REGEXP.test(values.email)) {
        setIsValidEmail(true)
      } else {
        setIsValidEmail(false)
      }
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
    return { values, handleChange, errors, isValid, resetForm, setValues, isValidEmail};
  }

  

  let filterUserMovie = localStorage.getItem('filterUserMovie');
  let filterMovie = localStorage.getItem('filterMovie');
  let localMovies = JSON.parse(localStorage.getItem('movies'));
  



  useEffect(() => {
    if (filterMovie === 'true') {
      setFilteredMovies(true)
    } else {
      setFilteredMovies(false)
    }
  }, [isSearch])

  useEffect(() => {
    if (filterUserMovie === 'true') {
      setFilteredUserMovies(true)
    } else {
      setFilteredUserMovies(false)
    }
  }, [isSearch])

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
    if (localMovies === null) {
      setCurrentMovies(movies)
    } else {
      setCurrentMovies(localMovies)
      if (localMovies.length === 0 && isSearch === true)  {setNotFound(true)} else {setNotFound(false)}
    }
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
        if (err === 'Ошибка: 409') {
          setTextErrorApiRegister('Данный email уже существует')
        }
        if (err === 'Ошибка: 400') {
          setTextErrorApiRegister('Введены некорректные данные')
        }
        if (err === 'Ошибка: 500') {
          setTextErrorApiRegister('Ошибка сервера')
        }
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
        console.log(err)
        if (err === 'Ошибка: 401') {
          setTextErrorApiLogin('Некорректные email или пароль')
        }
        if (err === 'Ошибка: 400') {
          setTextErrorApiLogin('Введены некорректные данные')
        }
        if (err === 'Ошибка: 500') {
          setTextErrorApiLogin('Ошибка сервера')
        }
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
    localStorage.clear();
    setFilteredMovies(false);
    setMovies([]);
    mainApi.deleteHeaders();
    setLoggedIn(false);
    history.push("/");
  }

  function changeUserInfo(email, name) {
    mainApi.changeUserInfo(email, name)
    .then((res) => {
      setCurrentUser(res)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 2000)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function filterMovies() {
    setFilteredMovies(!filteredMovies)
  }

  function filterUserMovies() {
    setFilteredUserMovies(!filteredUserMovies)
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
        localStorage.setItem('filterMovie', filteredMovies)
        localStorage.setItem('movies', JSON.stringify(movies));
        if (filteredMovies === false) {
          localStorage.setItem('movies', JSON.stringify(movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()))));
          setMovies(movies)
          setMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())));
        } else {
          localStorage.setItem('movies', JSON.stringify(movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) && movie.duration <= 40)));
          setMovies(movies)
          setMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) && movie.duration <= 40));
        }
        setIsSearch(true) 
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true)
      })
      .finally(() => {
        setLoading(false)
      });
  }
  
  function searchUserMovies(values) {
    localStorage.setItem('filterUserMovie', filteredUserMovies)
    if (filteredUserMovies === false) {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())));
    } else {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) && movie.duration <= 40));
    }
  }
  
    return(
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route exact path='/'>
                <Main loggedIn={loggedIn}/>
              </Route>
              <ProtectedRoute exact path='/movies' component={Movies} loggedIn={loggedIn} loading={loading} onOpen={openMenu} filterMovies={filterMovies} movies={currentMovies} saveMovie={saveMovie} useFormWithValidation={useFormWithValidation} searchMovies={searchMovies} userMovies={userMovies} deleteMovie={deleteMovie} searchError={searchError} notFound={notFound}/>
              <ProtectedRoute exact path='/saved-movies' component={SavedMovies} loggedIn={loggedIn} loading={loading} onOpen={openMenu} filterMovies={filterUserMovies} deleteMovie={deleteMovie} movies={currentUserMovies} useFormWithValidation={useFormWithValidation} searchUserMovies={searchUserMovies} userMovies={userMovies}/>
              <ProtectedRoute exact path='/profile' component={Profile} loggedIn={loggedIn} onOpen={openMenu} getOut={getOut}  useFormWithValidation={useFormWithValidation} changeUserInfo={changeUserInfo} isSuccess={isSuccess}/>
              <Route path='/signup'>
                <Register userRegister={userRegister} useFormWithValidation={useFormWithValidation} textErrorApiRegister={textErrorApiRegister}/>
              </Route>
              <Route path='/signin'>
                <Login userAuthorization={userAuthorization} useFormWithValidation={useFormWithValidation} textErrorApiLogin={textErrorApiLogin}/>
              </Route>
              <Route>
                <ErrorNotFound/>
              </Route>
            </Switch>
            <Menu isOpen={isMenu} onClose={closeMenu}/>
          </CurrentUserContext.Provider>
        </div>
    )
}

export default App