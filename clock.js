const [ logger ] = require('./module-loader')
(`clock

  logger
`);

const listeners = [];
const toRemove = [];
let lastDate = Date.now();

const second = 1000;

const exported = {

  ms: 1,
  second,
  minute: 60 * second,
  hour:  60 * 60 * second,
  day: 24 * 60 * 60 * second,

  listen({ cb, start=Date.now(), period, name=Math.random().toString().split('.')[1] }) {
    logger.log(`started listener: ${name}`);
    listeners.push({ cb, start, period, next: start, name });
    return name;
  },
  remove(name) {
    const index = listeners.findIndex(({ name: listenerName }) => name === listenerName);
    if(listeners[index]) {
      listeners.splice(index, 1);
      logger.log(`removed listener: ${name}`);
    } else {
      logger.error(`couldn't find listener: ${name}`);
    }

  }
}

setInterval(() => {
  let date = Date.now();
  listeners.forEach((listener) => {
    const { period, next, cb, name } = listener;
    if(date >= next) {
      listener.next = next + period;
      switch(cb(date)) {
        case false:
          exported.remove(name)
          break;
      };
    } 
  });
  toRemove.forEach((listener) => {
    listeners.splice(listeners.indexOf(listener), 1); 
  });
  toRemove.length = 0;
  lastDate = date;
}, second);

module.exports = exported;
