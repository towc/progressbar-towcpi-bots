const [ logger, calendarRSS, msgBar ] = require('./../module-loader.js')
(`calendar

  logger
  calendar/rss
  msg-bar
`);

const opts = {
  eventNameCharAmount: msgBar.width - 2 - 11
}

calendarRSS.listen(({ items }) => {
  items = items.slice(0, msgBar.height);
  msgBar.writeStandardizedString(items.map(({ title, date }) => {

    title = title.length > opts.eventNameCharAmount ?
      title.substring(0, opts.eventNameCharAmount - 1) + '-' :
      title.padEnd(' ', opts.eventNameCharAmount);

    logger.log(date.getDate());
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    date = `${day}/${month} ${hour}:${minute}`;

    return `${date} ${title}`;
  }).join('\n'))
})
