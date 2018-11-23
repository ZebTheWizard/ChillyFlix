var axios = require('axios')
require('dotenv').config()

var axiosInstance = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    "api_key": process.env.TMDB
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After',
    'Cache-Control': 'public, max-age=21600',
    'Content-Type': 'application/json;charset=utf-8',
    'Server': 'openresty',
    'X-RateLimit-Limit': 40,
    'X-RateLimit-Remaining': 39,
    'X-RateLimit-Reset': 1542996643,
    'Connection': 'keep-alive',
  }
});

module.exports = axiosInstance;