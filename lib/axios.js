var axios = require('axios')

var axiosInstance = axios.create({
  baseURL: 'http://api.themoviedb.org/3/',
  params: {
    "api_key": process.env.TMDB
  }
});


module.exports = axiosInstance;