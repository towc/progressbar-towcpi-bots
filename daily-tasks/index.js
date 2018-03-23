const [logger, clock, alarm, ambience] = require('./../module-loader')(`daily-tasks

  logger
  clock
  daily-tasks/alarm
  daily-tasks/ambience
`);

module.exports = {
  alarm,
  ambience,
  start() {
    // this.alarm.startClock();
    this.ambience.startClock();
  },
  stop() {
    // this.alarm.stopClock();
    this.ambience.stopClock();
  },
};
