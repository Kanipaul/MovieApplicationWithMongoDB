var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');
/* DB configuration */
var mongoose = require('mongoose');
var movieData = require("../models/movies");
var url = require("../config/config");

/* Deleting a movie */
router.post('/', function(req, res){
  console.log("Inside delete movie method");
  mongoose.connect(url);
  var db=mongoose.connection;
  db.on("error",console.error.bind(console,"Connection error:"));
  db.open('open',function(){
    var Title = {
        Title: req.body.Title
    };
    console.log(Title);
    movieData.remove(Title, function(err){
      if(err){
           console.log("Error" + err);
       }
       else{
           console.log("Movie has been deleted successfully !!!");
       }
    });
  });
  res.redirect("/");
});

module.exports = router;
