export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";


class MoviesApi {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
  
    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  
    getInitialMovies() {
      return fetch(this._url, {
        headers: this._headers,
      }).then(this._handleResponse);
    }
    
    removeMovie(movieId) {
      return fetch(this._url + "/movies/" + movieId, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    likeMovie(movieId) {
      return fetch(this._url + `/movies/` + movieId + "/likes", {
        method: "PUT",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    dislikeMovie(movieId) {
      return fetch(this._url + `/movies/` + movieId + "/likes", {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    changeLikeMovieStatus(movieId, isLiked) {
      if (isLiked) {
        return fetch(this._url + `/movies/` + movieId + "/likes", {
          method: "DELETE",
          headers: this._headers,
        }).then(this._handleResponse);
      } else {
        return fetch(this._url + `/movies/` + movieId + "/likes", {
          method: "PUT",
          headers: this._headers,
        }).then(this._handleResponse);
      }
    }
  }
  
  const token = localStorage.getItem('token');
  
  export const moviesApi = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
