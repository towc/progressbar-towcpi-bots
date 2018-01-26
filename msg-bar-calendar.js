const fetch = require('node-fetch');
const { xml2js } = require('xml-js');
const http = require('http');

const screenWidth = 38;
const screenHeight = 2;
const eventNameCharAmount = screenWidth - 2 - 11 - 3;

let eventData = '';

const checkMsg = () => {
  fetch('https://www.progressbar.sk/calendar.rss')
    .then((res) => res.text())
    .then((text) => text.split('\n'))
    .then((lines) => lines.slice(1, lines.length).join('\n'))
    .then((xml) => xml2js(xml, { compact: true }))
    .then((rssObj) => rssObj.rss.channel.item.slice(0, screenHeight))
    .then((items) => {
      const newEventData = JSON.stringify(items) 
      if(newEventData !== eventData) {
        eventData = newEventData; 
        
        const displayText = items.map(({title, start_date}) => {
          title = title._text;

          // standardize text to ascii
          [
            [[225], 'a']
          ].forEach(([originals, result]) => {
            originals.forEach((original) => {
              title = title.replace(String.fromCharCode(original), result); 
            }) 
          });

          if(title.length > eventNameCharAmount) {
            title = title.substring(0, eventNameCharAmount - 1) + '-';
          } else {
            title = title.padEnd(' ', eventNameCharAmount); 
          }

          let date = new Date(start_date._text)
            .toJSON()
            .match(/\d\d-\d\dT\d\d:\d\d/)[0]
            .replace('-', '/')
            .replace('T', ' ');

          return `${title}  ${date} `
            .padEnd(' ', screenWidth);
        }).join('')
        console.log(displayText);

        const postData = `msg=${displayText}`;
        const req = http.request({
          hostname: 'msg.bar',
          method: 'POST',
          headers: {
            'Content-Length': postData.length
          }
        },()=>{});
        req.write(postData);
        req.end()
      }
    })
}
checkMsg();
setInterval(checkMsg, 10*60*1000);
