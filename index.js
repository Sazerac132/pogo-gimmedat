const express = require('express');
const app = express();
const port = process.env.PORT_NUMBER || 3000;

const Map = require('./controllers/Map');
const Reporter = require('./reporter/Discord');

require('./health')(app);

app.listen(port, function() {
  console.log(`Health endpoint available at port ${port}.`);
});

const reporter = new Reporter();
const myMap = new Map();

doCheck();
setInterval(doCheck, 60000);

function doCheck() {
  myMap.fetch()
    .then(reporter.report)
    .catch(err => console.error);
}