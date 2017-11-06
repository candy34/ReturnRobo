
const mongoose = require('mongoose')

const RobotSchema = mongoose.Schema({
  name: { type: String },
  pic: { type: String }
})

const Robot = mongoose.model('Robot', RobotSchema)

module.exports = Robot

//with Calvin's help
