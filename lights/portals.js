const [ logger, httpPromise ] = require('./../module-loader')
(`portals
  
  logger
  http-promise
`);

const nums = [1, 2, 4];
const nameMap = [ 'foyer-hall', 'hall-foyer', 'cowork-hall' ];

module.exports = {
  nums,
  nameMap,
  internalState: nums.map(() => [0,0,0]),
  setOne(num, color=[1,1,1]) {
    this.internalState[num] = [...color];
    color = color.map((x) => (1-x) * 1023 |0);
    return httpPromise(`portal${nums[num]}.bar/?r=${color[0]}&g=${color[1]}&b=${color[2]}`)
      .catch((err) => {
        logger.error(`couldn't set color of portal ${num}:\n${err}`);
      })
  },
  setName(name, color=[1,1,1]) {
    return this.setOne(nameMap.indexOf(name), color);
  },
  setAllSame(color=[1,1,1]) {
    return Promise.all(nums.map((_, i) => this.setOne(i, color)));
  },
  setAll(colors=nums.map(() => [0,0,0])) {
    return Promise.all(colors.map((color, i) => this.setOne(i, color)));
  }
}
