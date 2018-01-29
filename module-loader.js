const Logger = require('./logger.js');

module.exports = (moduleString) => {
  [parentModuleName, ...moduleList] = moduleString.split('\n');
  const logger = new Logger(parentModuleName);

  return moduleList
    .filter((moduleName) => moduleName.trim().length > 0)
    .map((moduleName) => {
      logger.log(`loading ${moduleName}`);
      logger.incDepth();
      const res = require(`./${moduleName.trim()}.js`);
      logger.decDepth();
      logger.log(`loaded ${moduleName}`);
      return res;
    })
}
