const MongoClient = require('mongodb').MongoClient
//connection URL
const url = 'mongodb://localhost:27017/ReturnRobodb'
let robots = []

function getAllDocs (err, db) {
  console.log(err)
  const collection = db.collection('users')
  let documents = []
  collection.find({}).toArray(function (err, docs) {
    users = docs
    db.close()
  })
}
function getAllUsers () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      console.log(db)
      const collection = db.collection('users')
      collection.find({}).toArray(function (err, docs) {
        console.log(docs)
        resolve(docs)
        reject(err)
      })
    })
  })
}

function connectMongodb (url, cb) {
  MongoClient.connect(url, cb)
}

function getUsers () {
  connectMongodb(url, getAllDocs)
  return users
}

module.exports = { getUsers, getAllUsers }
