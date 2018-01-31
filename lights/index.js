const [ logger, httpPromise, portals, lamps ] = require('./../module-loader')
(`lights

  logger
  http-promise
  lights/portals
  lights/lamps
`);

module.exports = {
  portals,
  lamps
}
