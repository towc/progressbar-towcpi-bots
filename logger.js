class Logger {
  constructor(trace) {
    this.trace = trace;
  }
  log(text) {
    console.log(`${new Date().toJSON()} ${this.trace.join(' -> ')}: ${text}`);
  }
  error(text) {
    this.log(text ? `ERROR: ${text}` : `ERROR`);
  }
  ok(text) {
    this.log(text ? `OK: ${text}` : `OK`);
  }
  push(module) {
    this.trace.push(module); 
  }
  pop(amount=1) {
    while(amount > 0) {
      this.trace.pop(); 
      --amount;
    }
  }
}
Logger.depth = 0;

module.exports = Logger;
