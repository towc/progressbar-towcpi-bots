const [ logger, calendarRSS, msgBar, blackDoor ] = require('./../module-loader.js')
(`calendar

  logger
  calendar/rss
  msg-bar
  doors/black
`);

const opts = {
  eventNameCharAmount: msgBar.width - 2 - 11,

  openDoorRefreshRate: 5 * 60 * 1000
}

calendarRSS.listen(({ items }) => {
  items = items.slice(0, msgBar.height);
  const msg = items.map(({ title, date }) => {

    title = title.length > opts.eventNameCharAmount ?
      title.substring(0, opts.eventNameCharAmount - 1) + '-' :
      title.padEnd(' ', opts.eventNameCharAmount);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    date = `${day}/${month} ${hour}:${minute}`;


    return `${date} ${title}`;

  }).join('\n');
  logger.log(`writing string to msgbar:\n${msg}`)

  msgBar.writeStandardizedString(msg)
    .then(() => {
      logger.ok(`written string to msgbar`) 
    })
    .catch((err) => {
      logger.error(`couldn't write string to msgbar:\n${err}`) 
    })
})

setInterval(() => {
  const nextEvent = calendarRSS.virtualState.items[0];
  if(nextEvent.date - Date.now() < opts.openDoorRefreshRate) {
    logger.log(`an event will start soon. Enabling one click on black door`);
    blackDoor.enableOneClick();
  }
}, opts.openDoorRefreshRate)
