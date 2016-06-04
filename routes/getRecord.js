var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');
/* DB configuration */
var mongoose = require("mongoose");
var movieData = require("../models/movies");
var url = require("../config/config");

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Reading json for getting movie details*/
router.get('/readjson', function(req, res){
  console.log("Inside get movie method");
mongoose.connect(url);
var db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error:"));
db.open('open',function(){
  movieData.find({},function(err,data){
    if(err){
      console.log("Error="+err);
    }
    res.send(JSON.stringify(data));
  });
});
});

module.exports = router;
