var db = require('./axios')

var axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    "api_key": process.env.TMDB
  }
});

module.exports = axiosInstance;