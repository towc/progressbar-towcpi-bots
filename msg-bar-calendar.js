const fetch = require('node-fetch');
const { xml2js } = require('xml-js');
const http = require('http');

const screenWidth = 38;
const screenHeight = 2;
const eventNameCharAmount = screenWidth - 2 - 11 - 2;

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
          [
            [[225], 'a']
          ].forEach(([originals, result]) => {
            originals.forEach((original) => {
              title = title.replace(String.fromCharCode(original), result); 
            }) 
          });

          let date = new Date(start_date._text);
          return `${title
              .substring(0, eventNameCharAmount)
              .padEnd(' ', eventNameCharAmount)}  ${date.toJSON().match(/\d\d-\d\dT\d\d:\d\d/)[0].replace('-', '/').replace('T', ' ')}`
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
