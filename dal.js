 const mongoose = require ('mongoose')
 mongoose.Promise = global.Promise
 const Robot = require('./model')
 mongoose.connect ('mongodb://localhost27017/RobotsMongodb', {
   useMongoClient: true
 })

all robots
 function getAllRobots () {
  return Robot.find()
 }
all robots and a single One

 function getRobot (robotId) {
  return Robot.findById(robotId)
 }
adding a robot

 function addRobot (newRobot) {
   const robot = new Robot (newRobot)
   return robot.save()
 }
edit and delete robot
 function deleteRobot(robotId) {
   return Robot.findOneAndRemove(robotId)
 }
 module.exports = { getAllRobots, addRobot, getRobot, deleteRobot}
with Calvins help
