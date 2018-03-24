const [ logger, clock, calendarRSS, msgBar, blackDoor ] = require('./../module-loader.js')
(`calendar

  logger
  clock
  calendar/rss
  msg-bar
  doors/black
`);

const opts = {
  eventNameCharAmount: msgBar.width - 2 - 5,

  openDoorRefreshRate: 5 * clock.minute,
};

calendarRSS.listen(({ items }) => {
  items = items.slice(0, msgBar.height);
  const msg = items.map(({ title, date }) => {
    title = title.length > opts.eventNameCharAmount
      ? `${title.substring(0, opts.eventNameCharAmount)}-`
      : `${title.padEnd(' ', opts.eventNameCharAmount)}`;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    date = `${day}<${hour}`;


    return `${date} ${title}`;
  }).join('\n');
  logger.log(`writing string to msgbar:\n${msg}`)

  msgBar.writeStandardizedString(msg)
    .then(() => {
      logger.ok('written string to msgbar');
    })
    .catch((err) => {
      logger.error(`couldn't write string to msgbar:\n${err}`);
    });
});

clock.listen({
  name: 'black door one click on events',
  cb(date) {
    if (calendarRSS.virtualState.items.length > 0) {
      const { date: eventDate, title } = calendarRSS.virtualState.items[0];
      if (eventDate - date < opts.openDoorRefreshRate) {
        logger.log(`event "${title}" will start soon. Enabling one click on black door`);
        blackDoor.enableOneClick();
      }
    }
  },
  period: opts.openDoorRefreshRate,
});
