var express = require('express');
var router = express.Router();
const random = require('random')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/movie', function(req, res, next) {
  res.render('movie-query');
});

router.get('/tv', function(req, res, next) {
  res.render('tv-query');
});

router.get('/movie/random', function(req, res, next) {
  var q = req.query
      q.genre = q.genre || []
  var db = require("../lib/axios")
  var show;
  var query = { 
    "vote_count.gte": 100,
    "vote_average.lte": q["vote-max"], 
    "vote_average.gte": q["vote-min"], 
    "primary_release_date.lte": q["year-max"] + '-12-31',
    "primary_release_date.gte": q["year-min"] + '-01-01', 
    "with_genres": q.genre.join('|'),
    "orginal_language": "en"
  }

  db.get('/discover/movie', query)
  .then(({data}) => {
    query.page = random.int(1, data.total_pages)
    return db.get('/discover/movie', query)
  })
  .then(({data}) => {
    var index = random.int(0, data.results.length - 1)
    var temp = data.results[index]
    if (!temp) return res.render('specific')
    return db.get(`/movie/${temp.id}`)
  })
  .then(({data}) => {
    show = data
    return db.get(`/movie/${show.id}/videos`)
  })
  .then(({data}) => {
    show.videos = data.results
    if(q.json) return res.json({ req: q, query, data: show})
    else return res.render('movie', show)
  })
  
})



router.get('/tv/random', function(req, res, next) {
  var q = req.query
      q.genre = q.genre || []
  var db = require("../lib/axios")
  var query = { 
    "vote_count.gte": 100,
    "vote_average.lte": q["vote-max"], 
    "vote_average.gte": q["vote-min"], 
    "primary_release_date.lte": q["year-max"] + '-12-31',
    "primary_release_date.gte": q["year-min"] + '-01-01', 
    "with_genres": q.genre.join('|'),
  }

  db.get('/discover/tv', query)
  .then(({data}) => {
    query.page = random.int(1, data.total_pages)
    return db.get('/discover/tv', query)
  })
  .then(({data}) => {
    var index = random.int(0, data.results.length - 1)
    var temp = data.results[index]
    if (!temp) return res.render('specific')
    return db.get(`/tv/${temp.id}`)
  })
  .then(({data}) => {
    show = data
    return db.get(`/tv/${show.id}/videos`)
  })
  .then(({data}) => {
    show.videos = data.results
    if(q.json) return res.json({ req: q, query, data: show})
    else return res.render('tv', show)
  })
  
});

module.exports = router;
