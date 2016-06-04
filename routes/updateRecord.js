var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');
/* DB configuration */
var mongoose = require('mongoose');
var movieData = require("../models/movies");
var url = require("../config/config");

/* Updating a movie */
router.post('/', function(req, res){
  console.log("Inside update movie method");
  mongoose.connect(url);
  var db=mongoose.connection;
  db.on("error",console.error.bind(console,"Connection error:"));
  db.open('open',function(){
    console.log(req.body.Title);
    movieData.update({Title : {$eq: (req.body.Title)}},
      {$set: {
              Title: req.body.Title,
              Year:req.body.Year,
              Released: req.body.Released,
              Director: req.body.Director,
              Actors: req.body.Actors,
              Plot: req.body.Plot,
              Awards: req.body.Awards,
              Poster: req.body.Poster,
              imdbRating: req.body.imdbRating
            }
      },
     function(err, result){
       console.log("Movie has been updated successfully !!!");
       console.log(result);
    });
  });
  res.redirect("/");
});

module.exports = router;
