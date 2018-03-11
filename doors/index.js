const [logger, blackDoor, whiteDoor] = require('./../module-loader.js')(`doors

  logger
  doors/black
  doors/white
`);

module.exports = {
  blackDoor,
  whiteDoor,
};
