const Memory = require('../controllers/Memory');

const initializeHealthEndpoint = function(app) {
  app.get('/health', function(req, res) {
    const memory = new Memory({bits: process.memoryUsage().rss});
    const uptime = process.uptime();

    res.status(200).send({
      memory: memory.format(),
      uptime
    });
  });
};

module.exports = initializeHealthEndpoint;

