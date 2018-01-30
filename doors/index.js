const [ logger, blackDoor, whiteDoor ] = require('./../module-loader.js')
(`doors

  logger
  doors/black-door
  doors/white-door
`);

module.exports = {
  blackDoor,
  whiteDoor
}
