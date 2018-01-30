const [ logger ] = require('./module-loader')
(`checks

  logger
`);

// time
logger.push('(timezone)')
{
  logger.log('checking device timezone to be +01:00');
  const timezone = new Date().getTimezoneOffset();
  if(timezone === -60) {
    logger.ok(); 
  } else {
    logger.error(`timezone is ${timezone}`); 
  }
}
logger.pop()

// show aliveness
logger.push('(aliveness clock)')
{
  logger.log('starting aliveness clock');
  setInterval(() => {
    logger.push('(alive)')
    logger.ok();
    logger.pop();
  }, 10 * 60 * 1000);
  logger.ok();
}
logger.pop()
