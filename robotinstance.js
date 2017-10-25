const MongoClient = require('mongodb').MongoClient
//connection URL
const url = 'mongodb://localhost:27017/ReturnRobodb'


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RobotInstanceSchema = Schema({
  : { type: Schema.ObjectId, ref: 'Robot', required: true }, //reference to the associated robot
  name: {type: String, required: true},
  job: {type: String, required: true},
  university: {type: String , required: true}

});

// Virtual for robotinstance's URL
RobotInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/robotinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('RobotInstance', RobotInstanceSchema);
