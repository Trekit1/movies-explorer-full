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
import ProtectedRouteAuth from '../ProtectedRoute/ProtectedRouteAuth';


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
    return { values, handleChange, errors, isValid, resetForm, setValues, isValidEmail, setValues};
  }

  

  let filterUserMovie = localStorage.getItem('filterUserMovie');
  let filterMovie = localStorage.getItem('filterMovie');
  let localMovies = JSON.parse(localStorage.getItem('movies'));
  let logIn = localStorage.getItem('loggedIn');
  let isLocalSearch = localStorage.getItem('isSearch');
  let allMovies = JSON.parse(localStorage.getItem('allMovies'));
  let valSearchMovies = localStorage.getItem('valSearchMovies');
  let valSearchUserMovies = localStorage.getItem('valSearchUserMovies');

  const afterFirstSearch = true;
  const filteredMoviesTrue = true;
  const filteredMoviesFalse = false;
  

   useEffect(() => {
    if (filterMovie === 'true') {
      setFilteredMovies(true)
    } else {
      setFilteredMovies(false)
    }
  })


  useEffect(() => {
    if (filterUserMovie === 'true') {
      setFilteredUserMovies(true)
    } else {
      setFilteredUserMovies(false)
    }
  })


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

  const [isErrorSubmitReg, setIsErrorSubmitReg] = useState(false);
  const [isErrorSubmitLog, setIsErrorSubmitLog] = useState(false);

  function register(email, password, name) {
    mainApi
      .register(email, password, name)
      .then((res) => {
        authorization(email, password)
        setTextErrorApiRegister('')
        setIsErrorSubmitReg(false)
      })
      .catch((err) => {
        console.log(err)
        setIsErrorSubmitReg(true)
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

  function authorization(email, password) {
    mainApi
      .authorization(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem('token')
        mainApi.updateHeaders(token)
        localStorage.setItem('loggedIn', true)
      })
      .then((res) => {
        setLoggedIn(true);    
        setTextErrorApiLogin('')
        setIsErrorSubmitLog(false)
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err)
        setIsErrorSubmitLog(true)
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
      localStorage.setItem('loggedIn', loggedIn)
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

  function useFilterMovies() {
    setFilteredMovies(!filteredMovies)
    if (localMovies !== null) {
      if (filterMovie === 'true') {
        localStorage.setItem('movies', JSON.stringify(allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valSearchMovies.toLowerCase()))));
        setMovies(allMovies)
        localStorage.setItem('filterMovie', filteredMoviesFalse)
      } else {
        localStorage.setItem('movies', JSON.stringify(allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valSearchMovies.toLowerCase()) && movie.duration <= 40)));
        setMovies((movies) => movies.filter((movie) => movie.duration <= 40));
        localStorage.setItem('filterMovie', filteredMoviesTrue)
      }
    }
  }


  function useFilterUserMovies() {
    setFilteredUserMovies(!filteredUserMovies)
    if (filterUserMovie === 'true') {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((userMovies) => userMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valSearchUserMovies.toLowerCase())));
      localStorage.setItem('filterUserMovie', filteredMoviesFalse)
    } else {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((userMovies) => userMovies.filter((movie) => movie.nameRU.toLowerCase().includes(valSearchUserMovies.toLowerCase()) && movie.duration <= 40));
      localStorage.setItem('filterUserMovie', filteredMoviesTrue)
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

  function searchMoviesWithApi(values) {
    setLoading(true)
    moviesApi
      .getInitialMovies()
      .then((movies) => {
        localStorage.setItem('isSearch', afterFirstSearch)
        localStorage.setItem('allMovies', JSON.stringify(movies));
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
    if (filterUserMovie === 'true') {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())  && movie.duration <= 40));
    } else if (filterUserMovie !== 'true') {
      setCurrentUserMovies(userMovies)
      setCurrentUserMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())));
    }
  }

  function searchMovies(values) {
    if (isLocalSearch === null || isLocalSearch === 'false') {
      searchMoviesWithApi(values)
    } else {
      searchMoviesLocal(values)
    }
  }

  function searchMoviesLocal(values) {
        localStorage.setItem('filterMovie', filteredMovies)
        localStorage.setItem('movies', JSON.stringify(allMovies));
        if (filteredMovies === false) {
          localStorage.setItem('movies', JSON.stringify(allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()))));
          setMovies(allMovies)
          setMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase())));
        } else {
          localStorage.setItem('movies', JSON.stringify(allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) && movie.duration <= 40)));
          setMovies(allMovies)
          setMovies((movies) => movies.filter((movie) => movie.nameRU.toLowerCase().includes(values.search.toLowerCase()) && movie.duration <= 40));
        }
  }

    return(
        <div className="page">
          <CurrentUserContext.Provider value={currentUser}>
            <Switch>
              <Route exact path='/'>
                <Main loggedIn={loggedIn} onOpen={openMenu}/>
              </Route>
              <ProtectedRoute path='/movies' component={Movies} loggedIn={logIn} loading={loading} onOpen={openMenu} useFilterMovies={useFilterMovies} movies={currentMovies} saveMovie={saveMovie} useFormWithValidation={useFormWithValidation} searchMovies={searchMovies} userMovies={userMovies} deleteMovie={deleteMovie} searchError={searchError} notFound={notFound}/>
              <ProtectedRoute path='/saved-movies' component={SavedMovies} loggedIn={logIn} loading={loading} onOpen={openMenu} useFilterMovies={useFilterUserMovies} deleteMovie={deleteMovie} movies={currentUserMovies} useFormWithValidation={useFormWithValidation} searchUserMovies={searchUserMovies} userMovies={userMovies}/>
              <ProtectedRoute path='/profile' component={Profile} loggedIn={logIn} onOpen={openMenu} getOut={getOut}  useFormWithValidation={useFormWithValidation} changeUserInfo={changeUserInfo} isSuccess={isSuccess}/>
              <ProtectedRouteAuth path='/signup' loggedIn={logIn} component={Register} register={register} useFormWithValidation={useFormWithValidation} textErrorApiRegister={textErrorApiRegister} errorSumbit={isErrorSubmitReg}/>
              <ProtectedRouteAuth path='/signin' loggedIn={logIn} component={Login} authorization={authorization} useFormWithValidation={useFormWithValidation} textErrorApiLogin={textErrorApiLogin} errorSumbit={isErrorSubmitLog}/>
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