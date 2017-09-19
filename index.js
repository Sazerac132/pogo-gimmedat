const Map = require('./controllers/Map');

const myMap = new Map();

myMap.fetch().then(console.log);