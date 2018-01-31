const [ logger, clock ] = require('./module-loader')
(`checks

  logger
  clock
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
  clock.listen({
    name: 'aliveness check',
    cb: () => {
      logger.push('(alive)')
      logger.ok();
      logger.pop();
    },
    period: 10 * clock.minute
  });
  logger.ok();
}
logger.pop()
