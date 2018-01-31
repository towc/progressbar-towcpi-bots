const [ logger, clock, RSSParser ] = require('./../module-loader.js')
(`rss

  logger
  clock
  @ rss-parser
`);

const parser = new RSSParser({ customFields: { item: [ 'start_date' ] }});

module.exports = ({
  virtualState: {
    items: [],
    hash: '',
    prevHash: '',
    lastUpdated: new Date
  },
  getItems() {
    return parser.parseURL('http://progressbar.sk/calendar.rss').then(({ items }) => {
      this.virtualState.prevHash = this.virtualState.hash;
      items = items.map(({ start_date, ...item }) => ({ date: new Date(start_date), ...item }));
      this.virtualState.items = items;
      this.virtualState.hash = JSON.stringify(items);
      this.virtualState.lastUpdated = new Date;
      return items;
    });
  },
  listening: false,
  listeners: [],
  listen(cb) {
    if(!this.listening) {
      clock.listen({
        name: 'check calendar updates',
        cb: () => {
          this.checkUpdates();
        }, 
        period: 5 * clock.minute
      });
    }
    this.listeners.push(cb);
    cb(this.virtualState);
  },
  unlisten(cb) {
    this.listeners.splice(this.listeners.indexOf(cb), 1); 
  },
  checkUpdates() {
    this.getItems().then(() => {
      if(this.virtualState.prevHash !== this.virtualState.hash) {
        this.listeners.forEach((cb) => cb(this.virtualState)); 
      }
    })
  }
});
