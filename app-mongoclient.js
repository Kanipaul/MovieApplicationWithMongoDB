var MongoClient = require('mongodb').MongoClient;
var url='mongodb://localhost:27017/MovieDatabase';

var findData=function(db,callback){
  var cursor=db.collection('MovieCollection').find();
  console.log(typeof cursor);
  cursor.each(function(err,doc){
    if(doc!=null){
      console.dir(doc);
    }else{
      callback();
    }
  });
};

MongoClient.connect(url,function(err,db){
  console.log("Connected to server:");
  findData(db,function(){
    db.close();
  });
});
