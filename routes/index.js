var express = require('express');
var router = express.Router();
var multer= require('multer');
var fs = require("fs");
var http = require("http");
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://127.0.0.1:27017/sbsdata';

var urll = require('url') ;

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    /** API path that will upload the files */
    router.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });


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
router.post('/add-services', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
     
     var getValueForNextSequence= function(sequenceOfName){

  var sequenceDoc = db.collection("counter").findAndModify({
      query:{_id: sequenceOfName },
     update: {$inc:{sequence_value:1}},
      new:true
   });
    
    return  sequenceDoc.sequence_value;
 }

    var collection = db.collection("services");
    collection.insert({'seq_num': getValueForNextSequence('item_id'),'servicename' : req.body.servicename , 'short_desc' : req.body.short_desc  , 'description' : req.body.description}
   , function(err,result){
       assert.equal(err,null);
          
              db.close() ;
      });
   // res.end('data saved successfully!!');
      
 res.writeHead(200, {'Content-Type': 'text/html'});
      fs.createReadStream(__dirname + '/dashboard.html').pipe(res);
 //         console.log('registration username:'+req.body.username+'password:'+req.body.password);
         
  });


});
router.post('/portfolio', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    var collection = db.collection("portfolio");
    collection.insertOne({'portfolioname' : req.body.portfolioname ,'type': req.body.type, 'short_desc' : req.body.short_desc  , 'description' : req.body.description ,'imag_path' :req.body.img_path, 'img_name' :req.body.img_name}
   , function(err,result){
       assert.equal(err,null);
          
              db.close() ;
      });
    res.end('data saved successfully!!')
     res.redirect('/'); 
 // res.writeHead(200, {'Content-Type': 'text/html'});
 //         fs.createReadStream(__dirname + '/login.html').pipe(res);
 //         console.log('registration username:'+req.body.username+'password:'+req.body.password);
         
  });


});




// router.post('/userdata',function(req, res, next) {
//    MongoClient.connect(url,function(err,db){
//      assert.equal(err,null);
//      var collection = db.collection('services');
//          collection.find().toArray(function(err,docss){
//           assert.equal(err,null);
//            // delete docss[0].password;
//           res.json(docss)
//           db.close();
//        });
//    });
// });






// router.post('/updateuser', function(req, res, next) {

//  MongoClient.connect(url,function(err,db){
//     assert.equal(err,null);
//     var collection = db.collection('services');
//          collection.find({'_id':require('mongodb').ObjectID(req.body.id)}).toArray(function(err,docss){
//           assert.equal(err,null);
//           if(docss.length==0){
//                                               res.status(409).json({
//                                               status: 'No such Data Present in database please contact admin',
//                                               success: false
//                                               });
//           }
//           else
//           {
//               collection.update ({ _id: ObjectId(req.body._id) }, {$set: {
//     servicename : req.body.servicename,
//     short_desc :req.body.short_desc,
//     description: req.body.description
//  }}, function (err, result) {
//       if (err) {
//       console.log(err);
//     } else {
//      console.log("Post Updated successfully");
//      res.render('services.ejs');
//  }
//           })
//             }
//           db.close();
//         });
//        });

// });





router.get('/show-service/:uid', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 //console.log(req.params.uid);
 //sending data  of uid
 //res.redirect("http://localhost:3000/html/update.html?val=" + req.params.uid);
MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    var collection = db.collection('services');
    collection.find({'_id':req.params.uid}).toArray(function(err,docs){
    assert.equal(err,null);
     res.setHeader('Content-Type', 'application/json');
    res.send(docs);
    db.close();
    }); 
});




});



router.post('/testimonials', function(req, res, next) {
    MongoClient.connect(url, function (err, db) {
    assert.equal(err,null);
    var collection = db.collection("testimonials");
    collection.insertOne({'clientname' : req.body.clientname , 'location' : req.body.location ,'projectname':req.body.projectname , 'testimonial' : req.body.testimonial}
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


router.post('/manage-service', function(req, res){
        console.log(req.body);
          


        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
         var removeservice = function(db, callback) {
        
           db.collection('services').deleteOne({_id :ObjectId(req.body.service_id)},
              function(err, results) {
                 // console.log(err);
                 // console.log(results);
                  console.log('deleted service with id'+  ObjectId(req.body.service_id));
                 //res.redirect('#/show-service');
               
                 callback();
              }
           );
        };

       

          removeservice(db, function() {
              db.close();
          });
           // res.redirect('/show-service'); 
        }); 

    });


// router.post('/update-service', function(req, res){
//         console.log('I received another edit request');
          


//    MongoClient.connect(url,function(err,db){
//        assert.equal(err,null);
//     var collection = db.collection('services');
//   collection.updateOne ({'short_desc':req.body.short_desc}
//     , { $set: {'servicename':req.body.servicename} }, null, function(err, result) {

//     assert.equal(err, null);
//     console.log("Updated the document ");
     
//   });
// });
    

//         });         
 


//   });
// });
// router.get('/:uid', function(req, res, next) {
//  // res.render('index', { title: 'Express' });
//  res.redirect("http://localhost:3000/views/update-service.html?val=" + req.params.uid);
// });


router.get('/show-service', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 //console.log(req.params.uid);
 //sending data  of uid
 //res.redirect("http://localhost:3000/html/update.html?val=" + req.params.uid);
MongoClient.connect(url,function(err,db){
    assert.equal(err,null);
    var collection = db.collection('services');
    collection.find({}).toArray(function(err,docs){
    assert.equal(err,null);
     //res.setHeader('Content-Type', 'application/json');
   res.json(docs);
    db.close();
    }); 
});




});

router.get('/:uid', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 // pathname = '/MyApp'

   res.redirect('http://localhost:3000/Login#/update-service");
  
});















module.exports = router;
