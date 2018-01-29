const Logger = require('./logger.js');
const logger = new Logger(['main']);

module.exports = (moduleString) => {
  [parentModuleName, ...moduleList] = moduleString.split('\n');

  return moduleList
    .map((moduleName) => moduleName.trim())
    .filter((moduleName) => moduleName.length > 0 && !moduleName.startsWith('#'))
    .map((moduleName) => {
      logger.log(`loading ${moduleName}`);
      logger.push(moduleName);
      let res;
      switch(moduleName) {
        case 'logger': res = new Logger([...logger.trace]);
          break;
        default: res = require(moduleName.startsWith('@') ? moduleName.replace(/^./, '').trim() : `./${moduleName}`);
      }
      logger.pop();
      logger.log(`loaded ${moduleName}`);
      return res;
    })
}
