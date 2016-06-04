rantvar should = require("chai").should(),
expect = require("chai").expect,
assert = require("chai").assert,
supertest = require("supertest"),
app = require("../bin/www");

var url = supertest("http://localhost:8080");

// Checking whether json data has been fetched
describe("Testing the json data", function(err){
  it("Should check whether json data is being fetched", function(done){
    url
      .get("/readjson")
      .expect(200)
      .expect('Content-type', /json/)
      .end(function(err,res){
        should.not.exist(err);
        var myObj = JSON.parse(res.text);
        var jsondata=JSON.parse(myObj);
        jsondata[0].Title.should.be.equal("X-Men");
        done();
      });
  });
});

// Validating the addMovie Method
describe("Testing the addMovie method", function(err){
  it("Should add the movie details", function(done){
    url
      .post("/addMovie")
      .expect(302)
      .expect('Location', '/')
      .send({Title:"Hulk", Poster:"http://ia.media-imdb.com/images/M/MV5BMTQxNzUxNTE4Nl5BMl5BanBnXkFtZTYwMjcyNTk5._V1_SX300.jpg",Year:"2003", Actors:"Eric Bana, Jennifer Connelly, Sam Elliott, Josh Lucas",Director:"Ang Lee",Plot:"Bruce Banner, a genetics researcher with a tragic past, suffers an accident that causes him to transform into a raging green monster when he gets angry.",Released:"20 Jun 2003",imdbRating:"5.7",Awards:"2 wins & 10 nominations."})
      .end(function(err, res){
        should.not.exist(err);
        done();
      });
  });

  after(function(done){
    url
      .get("/readjson")
      .expect(200)
      .expect('Content-type', /json/)
      .end(function(err,res){
        should.not.exist(err);
        var myObj = JSON.parse(res.text);
        var jsondata=JSON.parse(myObj);
        jsondata[jsondata.length-1].Title.should.be.equal("Hulk");
        done();
      });
});
});

/* Validating the deleteMovie Method
describe("Testing the deleteMovie method", function(err){
  it("Should delete the movie", function(done){
    url
      .post("/deleteMovie")
      .expect(302)
      .end(function(err, res){
        should.not.exist(err);
        done();
      });
  });
});
*/
// Validating the updateMovie Method
describe("Testing the updateMovie method", function(err){
 it("Should update the movie details", function(done){
   url
     .post("/updateMovie")
     .expect(302)
     .expect('Location', '/')
     .send({Title:"Hulk", Poster:"http://ia.media-imdb.com/images/M/MV5BMTQxNzUxNTE4Nl5BMl5BanBnXkFtZTYwMjcyNTk5._V1_SX300.jpg",Year:"updated 2014", Actors:"updated Eric Bana, Jennifer Connelly, Sam Elliott, Josh Lucas",Director:"updated Ang Lee",Plot:"updated Bruce Banner, a genetics researcher with a tragic past, suffers an accident that causes him to transform into a raging green monster when he gets angry.",Released:"20 Jun 2003",imdbRating:"5.7",Awards:"2 wins & 10 nominations."})
     .end(function(err, res){
       should.not.exist(err);
       done();
     });
 });
 after(function(done) {
   console.log('after');
   url
     .get("/readjson")
     .expect(200)
     .expect('Content-type', /json/)
     .end(function(err,res){
       should.not.exist(err);
       var myObj = JSON.parse(res.text);
       var json = JSON.parse(myObj);
       for(var i=0;i<json.length;i++)
       {
         if(json[i].Title == "Hulk")
         {
           json[i].Year.should.be.equal("updated 2014");
         }
       }
       done();
     });
 });
});
