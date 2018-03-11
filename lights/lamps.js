const [logger, httpPromise] = require('./../module-loader')(`lamps

  logger
  http-promise
`);

class Lamp {
  constructor(onUrl, offUrl) {
    this.onUrl = onUrl;
    this.offUrl = offUrl;
    this.isOn = false;
  }
  on() {
    this.isOn = true;
    return httpPromise(this.onUrl);
  }
  off() {
    this.isOn = false;
    return httpPromise(this.offUrl);
  }
  toggle() {
    this.isOn = !this.isOn;
    return httpPromise(this.isOn ? this.offUrl : this.onUrl);
  }
}
module.exports = {
  hall: {
    left: new Lamp('control.bar/lights/main/front/On', 'control.bar/lights/main/front/Off'),
    right: new Lamp('control.bar/lights/main/back/On', 'control.bar/lights/main/back/Off'),
  },
  lab: {
    left: new Lamp('control.bar/lights/lab/front/On', 'control.bar/lights/lab/front/Off'),
    right: new Lamp('control.bar/lights/lab/back/On', 'control.bar/lights/lab/back/Off'),
  },
};
