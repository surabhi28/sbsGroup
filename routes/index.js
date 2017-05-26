var express = require('express');
var router = express.Router();

var fs = require("fs");
var http = require("http");
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/sbsdata';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
 MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);

     var collection = db.collection("logindata");
       collection.find({'username':req.body.username , 'password' : req.body.password }).toArray(function(err,docs){
       console.log(req.body);
        if(docs.length<1){
          /*res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('../public/login.html').pipe(res);*/
         // res.send('respond with a resource');
         res.end('Back and Enter valid info!!');

        }
        else{  console.log('login success')
                res.writeHead(200, {'Content-Type': 'text/html'});
             fs.createReadStream(__dirname + '/dashboard.html').pipe(res);
            
            //  res.end('Success');
        }
       db.close()


       });
});

});
router.post('/services', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    var collection = db.collection("services");
    collection.insertOne({'servicename' : req.body.servicename , 'short_desc' : req.body.short_desc  , 'description' : req.body.description}
   , function(err,result){
       assert.equal(err,null);
          
              db.close() ;
      });
    res.end('data saved successfully!!')
 // res.writeHead(200, {'Content-Type': 'text/html'});
 //         fs.createReadStream(__dirname + '/login.html').pipe(res);
 //         console.log('registration username:'+req.body.username+'password:'+req.body.password);
         
  });


});



router.get('/show-service',function(req,res,next){
   MongoClient.connect(url, function (err, db) {
     assert.equal(err,null);
   var collection=db.collection("services");
   collection.find({}).toArray(function (err, result) {
                       var data = '';
                var dataArr = [];
                var i = result.length;
                //check for error
                if(err){return res.end('error!'+err);}
                //Data
                if (result) {
                    while(i--){
                        dataArr[i] = result[i]._id;
                    }
                    data = dataArr.join(' ');
                    res.render('#/show-service', { returnedData : data });
                }else{
                    res.end();
                }
     });
    

  });
});


module.exports = router;
