var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');
/* DB configuration */
var mongoose = require('mongoose');
var movieData = require("../models/movies");
var url = require("../config/config");

/* Adding a new movie */
router.post('/', function(req, res, next){
console.log("Inside add movie method");
mongoose.connect(url);
var db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error:"));
db.open('open',function(){
  var movie = new movieData({
    Title: req.body.Title,
    Year:req.body.Year,
    Released:req.body.Released,
    Director:req.body.Director,
    Actors:req.body.Actors,
    Plot:req.body.Plot,
    Awards:req.body.Awards,
    Poster:req.body.Poster,
    imdbRating:req.body.imdbRating
  });
    movie.save(function (err) {
      if (err) {
        return err;
      }
      else {
        console.log("New movie has been saved successfully !!!");
      }
    });
    res.redirect("/");
   });
});


module.exports = router;
