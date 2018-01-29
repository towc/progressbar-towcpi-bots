const [ logger ] = require('./module-loader')
(`checks

  logger
`);

{
  logger.log('checking device timezone to be +01:00');
  const timezone = new Date().getTimezoneOffset();
  if(timezone === -60) {
    logger.ok(); 
  } else {
    logger.error(`timezone is ${timezone}`); 
  }
}

