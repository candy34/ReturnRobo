const express = require('express')
const path = require("path");
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express');
const mongodb = require('mongodb');
const dataFile = require("./data.js")
const app = express()
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/RobotsMongoDB';
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set("views", "./views")

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  MongoClient.connect(mongoURL, function(err, db) {
    const robots = db.collection('data');
    robots.find({}).toArray(function(err, docs) {
      res.render("list", {robots: docs});
    })
  })
})

app.post('/forhire', function(req, res) {
  res.redirect('/forhire')
})

app.get('/forhire', function(req, res) {
  MongoClient.connect(mongoURL, function(err, db) {
    const robots = db.collection('data');
    robots.find({job: null}).toArray(function(err, docs) {
      res.render("list", {robots: docs});
    })
  })
})

app.post('/employed', function(req, res) {
  res.redirect('/employed')
})
app.get('/employed', function(req, res) {
  MongoClient.connect(mongoURL, function(err, db) {
    const robots = db.collection('data');
    robots.find({
      job: {
        $ne: null
      }
    }).toArray(function(err, docs) {
      res.render("list", {robots: docs});
    })
  })
})
app.get('/', (req, res) => {
  res.redirect('./login')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post('/login', (req, res) => {
  Robot.findOne({
    username: req.body.username
  }, 'username password', function(err, user, next) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log("user", user)
      return res.redirect("./login")
    }
  })
})

app.get('/addrobots', (req, res) => {
   res.redirect('./robots')
 })
 app.get('/addrobots', (req, res) => {
 res.render('addrobots')
 })

app.post('/addrobots', (req, res) => {
dal.addRobot(req.body)
res.redirect('./robots')
})
app.get('/robot/:_id', (req, res) => {
const selectRobot = getRobotById(req.params.id)
res.render('robot', selectRobot)
})

app.post('/robot/:_id', (req, res) => {
res.redirect('./robot/{{_id}}')
})
app.get('/delete/:_id', (req, res) => {
deleteRobot(req.params.id)
res.render('./list')
})

app.post('/delete/:_id', (req, res) => {
deleteRobot(req.params.id)
res.redirect('/robot/list')
})
// app.get('/:_id', function (req, res) {
//    MongoClient.connect(mongoURL, function (err, db) {
//      const robots = db.collection('data');
//      console.log(req.params._id);
//      robots.findOne({"_id": { $eq: req.params._id }}, function(err, docs) {
//        console.log('datadatatatatat', docs, 'errrrrrrrrrrrrrr', err);
//          res.render("list", {robots: docs});
//
//      })
//
//
//    })
//  })
//  app.post ('/:_id', function (req, res) {
//    res.redirect ('/:_id')
// })

app.listen(3001, function() {
console.log('Successfully started express application!');
})
//with Calvins help
