const adfsConfig = require('./adfs');
const {envConfig} = require('../envConfig');

module.exports = {
  adfsConfig,
  envName: envConfig.ENV || 'dev',
  authStrategy: envConfig.AUTH_STRATEGY || 'adfs',
};
