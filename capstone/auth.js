var express = require('express');
var http = require('follow-redirects').http;
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('userList', ['userList']);
var path    = require("path");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/userlist', function(req, res){
   console.log("I received a get request");
   db.userList.find( function(err,docs){
        console.log(docs);
        res.json(docs);
   });

});

app.get('/registerpage', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
    // res.sendFile('indexlogin.html');
    // res.redirect('/index.html');
});

app.get('/loginpage', function(req, res){
  res.sendFile(path.join(__dirname+'/public/indexlogin.html'));
  //res.sendFile('index.html');
  // res.redirect('/indexlogin.html');
});

app.get('/contactlist/:id', function (req, res){
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});
app.get('/login/:id/:pw', function (req, res){
   var id = req.params.id;
   var pw = req.params.pw;
   db.userList.find({username:id,password:pw}, function(err, doc){
    res.json(doc);
    console.log(doc);
  });
});

app.post('/userlist', function(req, res){
   db.userList.insert(req.body, function (err, doc){
    res.json(doc);
   });
});

app.delete('/userlist/:id', function (req, res){
  var id = req.params.id;
  db.userList.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.get('/userlist/:id', function (req, res){
  var id = req.params.id;
  db.userList.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.put('/userlist/:id', function (req, res){
  var id = req.params.id;
  db.userList.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {username: req.body.username, password: req.body.password, email: req.body.email, fullname: req.body.fullname, creationdate: req.body.creationdate, signature: req.body.signature}},
    new: true}, function (err, doc){
      res.json(doc);
  });
});

app.listen(8080);
console.log("Server running on port 8080");
