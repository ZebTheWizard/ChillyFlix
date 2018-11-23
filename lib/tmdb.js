var fetch = require('node-fetch')

// var axiosInstance = axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
//   params: {
//     "api_key": process.env.TMDB
//   }
// });

module.exports = {
  get(path, params={}) {
    var query = ["?api_key=" + process.env.TMDB]
    Object.keys(params).forEach(key => {
      query.push(key + "=" + params[key])
    })
    query = query.join('&')
    return new Promise(function(resolve, reject) {
      fetch("https://api.themoviedb.org/3" + path + query)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
    });
  }
};