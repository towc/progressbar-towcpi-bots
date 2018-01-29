const express = require('express');
const app = express();

app.get('/', (res) => {
  res.send('controller.html');
})
app.listen(8080)

