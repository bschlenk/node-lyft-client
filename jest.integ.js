const config = require('./jest.config');
config.testRegex = '/__tests__/.*\\.integ\\.ts$';

module.exports = config;
