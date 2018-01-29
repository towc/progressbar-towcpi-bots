class Logger {
  constructor(namespace) {
    this.namespace = namespace;
  }
  log(text) {
    console.log(`${new Date().toJSON()} ${Array(Logger.depth).fill(' -> ').join('')}${this.namespace}: ${text}`);
  }
  incDepth(amount=1) {
    Logger.depth += amount;
    return Logger.depth;
  }
  decDepth(amount=1) {
    return this.incDepth(-amount);
  }
}
Logger.depth = 0;

module.exports = Logger;
