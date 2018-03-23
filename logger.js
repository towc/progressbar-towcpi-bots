const fs = require('fs');

let logOutput = '';
const logFilePath = `${__dirname}/logs/${new Date().toJSON()}.log`;
let logFileUsable = false;

const colorMap = `
	Reset \x1b[0m
	Bright \x1b[1m
	Dim \x1b[2m
	Underscore \x1b[4m
	Blink \x1b[5m
	Reverse \x1b[7m
	Hidden \x1b[8m

	FgBlack \x1b[30m
	FgRed \x1b[31m
	FgGreen \x1b[32m
	FgYellow \x1b[33m
	FgBlue \x1b[34m
	FgMagenta \x1b[35m
	FgCyan \x1b[36m
	FgWhite \x1b[37m

	BgBlack \x1b[40m
	BgRed \x1b[41m
	BgGreen \x1b[42m
	BgYellow \x1b[43m
	BgBlue \x1b[44m
	BgMagenta \x1b[45m
	BgCyan \x1b[46m
	BgWhite \x1b[47m
`.split('\n')
  .map(x => x.trim())
  .filter(x => x.length > 0)
  .map(x => x.split(' '))
  .reduce((acc, [color, value]) => ({ ...acc, [color]: value }), {});

class Logger {
  constructor(trace) {
    this.trace = trace;
  }
  log(text, colors = []) {
    if (typeof text !== 'string') {
      try {
        text = JSON.stringify(text);
      } catch (e) {
        text = text.toString();
      }
    }

    const output = `${new Date().toJSON()} ${this.trace.join(' -> ')}: ${text.split('\n').join('\n  ')}`;
    console.log(`${colors.map(color => colorMap[color]).join('')}${output}${colorMap.Reset}`);

    const fileOutput = `\n${output}`;
    if (logFileUsable) {
      fs.appendFile(logFilePath, fileOutput, (err) => {
        if (err) {
          logFileUsable = false;
          logger.error('couldn\'t write text to log file');
        }
      });
    } else {
      logOutput += fileOutput;
    }
  }
  error(text, colors = []) {
    this.log(text ? `ERROR: ${text}` : 'ERROR', ['FgRed', ...colors]);
  }
  ok(text, colors = []) {
    this.log(text ? `OK: ${text}` : 'OK', ['FgGreen', ...colors]);
  }
  push(module) {
    this.trace.push(module);
  }
  pop(amount = 1) {
    while (amount > 0) {
      this.trace.pop();
      --amount;
    }
  }
}

const logger = new Logger(['main', 'logger']);

logger.log('creating log file');
fs.appendFile(logFilePath, '', (err) => {
  if (err) {
    logger.error(`couldn't use log file: ${err}`);
  } else {
    logger.ok(`created log file at ${logFilePath}`);
    logFileUsable = true;

    fs.appendFile(logFilePath, logOutput, (err) => {
      if (err) {

      } else {
        logger.ok('updated log file with buffer');
      }
    });
  }
});

module.exports = Logger;
