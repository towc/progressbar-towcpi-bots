const [ http, logger ] = require('./module-loader')
(`http-promise

  @ http
  logger
`);

console.log(http);
module.exports = (url, method="GET", { body, ...data }) => new Promise((resolve, reject) => {
  const request = http.request({ hostname: url, method, ...data }, (err, response) => err ? reject(err) : resolve(response));
  request.write(body);
  request.end();
})
