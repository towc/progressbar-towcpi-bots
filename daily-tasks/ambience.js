const [logger, clock, lights] = require('./../module-loader')(`ambience

  logger
  clock
  lights
`);

const pauses = [];

module.exports = {
  baseColor: [0, 0, 0], // displayed at noon
  endColor: [0.5, 1, 0.5], // displayed at midnight
  isClockRunning: false,
  startClock() {
    if (!this.isListening) {
      clock.listen({
        name: 'ambience',
        cb: (date) => {
          const linearDayProp = (date % clock.day) / clock.day;
          const armonicDayProp = 1 - Math.sin(linearDayProp * Math.PI) ** 2;

          lights.portals.setAllSame(this.baseColor.map((value, i) => value + (this.endColor[i] - value) * armonicDayProp));
        },
      }, clock.minute);
      this.isClockRunning = true;
    }
  },
  stopClock() {
    if (this.isListening) {
      clock.remove('ambience');
      this.isClockRunning = false;
    }
  },
  pause(reason = Math.random()) {
    if (!pauses.includes(reason)) {
      pauses.push(reason);
    }

    if (pauses.length === 1) {
      this.stopClock();
    }

    return reason;
  },
  resume(reason) {
    if (!pauses.includes(reason)) {
      return logger.error(`couldn't resume: couldn't find reason "${reason}"`);
    }
    pauses.splice(pauses.indexOf(reason), 1);

    if (this.pauses.length === 0) {
      this.startClock();
    }
  },
};
