const [logger, msgBar] = require('./module-loader.js')(`controller

  logger
  msg-bar
`);

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('controller.html');
});

const apiRoute = express.Router();
app.use('/api', apiRoute);
apiRoute.get('/msg-bar/display-temporary/:msg/:timeMS', (req, res) => {
  const prevString = msgBar.virtualState;
  const { msg } = req.params;
  msgBar.writeStandardizedString(msg);

  setTimeout(() => {
    if (msgBar.virtualState === msg) {
      msgBar.writeStandardizedString(prevString);
    }
  }, parseInt(req.params.timeMS, 10));

  res.send({ ok: true });
});
app.listen(8080, (err) => {
  if (err) {
    logger.log(`error:\n${err}`);
  }
});

