const [ logger, httpPromise ] = require('./../module-loader.js')
(`msg-bar

  logger
  http-promise
`);

// [ [result, originSet], ... ]
const standardizationMap = `
  A ÀÁÂÃÄÅĀĂĄ
  AE Æ
  C ÇĆĈĊČ
  D ÐĎĐ
  E ÈÉÊËĒĔĘĚ
  G ĜĞĠĢ
  H ĤĦ
  J Ĵ
  K Ķ
  L ĹĻĽĿŁ
  I ÌÍÎÏĨĪĬĮİ
  IJ Ĳ
  N ÑŃŅŇŊ
  O ÒÓÔÕÖØŌŎŐ
  OE Œ
  R ŔŖŘ
  S ßŚŜŞŠ
  T ŢŤŦ
  U ÙÚÛÜŨŪŬŮŰŲ
  W Ŵ
  Y ÝŶŸ
  Z ŹŻŽ
  a àáâãäåæāăą
  c çćĉċč
  d ďđ
  e èéêëēĕėęě
  g ĝğġģ
  h ĥħ
  j ĵ
  k ķĸ
  l ĺļľŀł
  i ìíîïĩīĭįı
  ij ĳ
  n ñńņňŋ
  o òóôõöøōŏő
  oe œ
  r ŕŗř
  s śŝşš
  t ţťŧ
  u ùúûüũūŭůűų
  w ŵ
  y ýÿŷ
  z źżž
`.split('\n').map((str) => str.trim().split(' ')).filter((pair) => pair.length === 2);

module.exports = ({
  virtualState: '',
  width: 36,
  height: 2,
  standardizeString(string) {
    return string
      .split('')
      .reduce((acc, char) => {
        if(acc.length >= this.width * this.height) {
          return acc;
        }

        const mapPair = standardizationMap.find(([_, originSet]) => originSet.includes(char));
        if(mapPair) {
          acc += mapPair[0]; 
        } else {
          const code = char.charCodeAt(0);
          if(code < 0x20 || code > 0x7E) {
            switch(char) {
              case '\n': acc += Array(this.width - acc.length).fill(' ').join('');
                break;
              case '\t': acc += Array(4 - (acc.length % 4)).fill(' ').join('');
                break;
              default: acc += '?';
            }
          } else {
            acc += char; 
          }
        }

        return acc;
      }, '');
  },
  writeString(string) {
    this.virtualState = string;
    string = 'msg=' + string;
    return httpPromise('msg.bar', 'POST', { headers: { 'Content-Length': string.length }, body: string });
  },
  writeStandardizedString(string) {
    return this.writeString(this.standardizeString(string));
  }
})
