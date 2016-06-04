var mongoose = require("mongoose");

//Schema
var movieSchema = mongoose.Schema({
  Title:String,
  Year:String,
  Rated:String,
  Released:String,
  Runtime:String,
  Genre:String,
  Director:String,
  Writer:String,
  Actors:String,
  Plot:String,
  Language:String,
  Country:String,
  Awards:String,
  Poster:String,
  Metascore:String,
  imdbRating:String,
  imdbVotes:String,
  imdbID:String,
  Type:String,
  Response:String,
  File_name:String

});

//Model
var movie = mongoose.model("MovieCollection", movieSchema,"MovieCollection")

// Connect to database
mongoose.connect('mongodb://localhost:27017/MovieDatabase')
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error::"));
db.open('open', function(){
movie.find({Title: /^X-Men/}, function(err, data){
      db.movie.insert({"Title":"Kani"});
      console.log(data);
  });
});
