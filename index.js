const Map = require('./controllers/Map');
const Reporter = require('./reporter/Discord');

const reporter = new Reporter();
const myMap = new Map();

doCheck();
setInterval(doCheck, 60000);

function doCheck() {
  myMap.fetch()
    .then(reporter.report)
    .catch(err => console.error);
}