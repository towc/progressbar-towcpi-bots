const [http, logger] = require('./module-loader')(`http-promise

  @ http
  logger
`);

module.exports = (url, method = 'GET', { body = '', ...data } = { body: '' }) => new Promise((resolve, reject) => {
  const [hostname, ...pathParts] = url.split('/');
  const path = `/${pathParts.join('/')}`;

  const request = http.request({
    hostname, path, method, ...data,
  }, (err, response) => (err ? reject(err) : resolve(response)));
  request.write(body);
  request.end();
}).catch(() => {});
