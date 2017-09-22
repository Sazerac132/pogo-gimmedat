const Map = require('./controllers/Map');
const Reporter = require('./reporter/Discord');

const reporter = new Reporter();
const myMap = new Map();

doCheck();
// setInterval(doCheck, 90000);

function doCheck() {
  myMap.fetch().then(reporter.report);
}