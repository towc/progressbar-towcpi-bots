const [ logger, httpPromise ] = require('./../module-loader')
(`black-door
  
  logger
  http-promise
`);

const oneClickTimeSpan = 3*60*1000;

module.exports = {
  lastEnableOneClick: 0,
  get oneClickEnabled() {
    return Date.now() - this.lastEnableOneClick > oneClickTimeSpan
  },
  open() {
    logger.log('opening black door');
    return httpPromise('door.bar/outsidedoor')
      .then(() => {
        logger.ok('opened black door'); 
      })
      .catch((err) => {
        logger.error(`couldn't open black door\n${err}`);
      })
  },
  enableOneClick() {
    logger.log(`enabling one click`);
    return httpPromise('door.bar/enableauto')
      .then(() => {
        this.lastEnableOneClick = Date.now();
        logger.ok(`enabled one click. Will end at ${new Date(this.lastEnableOneClick + oneClickTimeSpan).toJSON()}`); 
      })
      .catch((err) => {
        logger.error(`couldn't enable one click\n${err}`);
      })
  }
}
