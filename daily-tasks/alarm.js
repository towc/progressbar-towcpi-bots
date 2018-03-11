const [logger, clock, portals] = require('./../module-loader')(`alarm

  logger
  clock
  lights/portals
`);

const pauses = [];
const alarms = [];
const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = [0, 1, 2, 3, 4, 5, 6];

module.exports = {
  duration: clock.minute,
  tickDuration: clock.second,
  ticksLeft: 0,

  days: {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  },
  everyDay: [monday, tuesday, wednesday, thursday, friday, saturday, sunday],
  weekends: [saturday, sunday],
  workDays: [monday, tuesday, wednesday, thursday, friday],

  add({
    time, days = this.everyDay, duration = clock.minute, tickDuration = clock.second, name = Math.random(),
  }) {
    logger.log(`adding alarm "${name}" to run at ${time}`);
    const dateTime = new Date();
    // TODO finish alarm
    // dateTime.setHours
    alarms.push({
      time: dateTime, days, duration, tickDuration, name,
    });
    return name;
  },

  isClockRunning: false,
  startClock() {
    if (!this.isListening) {
      clock.listen({
        name: 'alarm starter',
        cb: (date) => {
        },
        period: clock.minute,
      });
      this.isClockRunning = true;
    }
  },
  stopClock() {
    if (this.isListening) {
      clock.remove('alarm');
      this.isClockRunning = false;
    }
  },
};
