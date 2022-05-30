// eslint-disable-next-line @typescript-eslint/no-var-requires
const delay = require('mocker-api/lib/delay');
const profile = require('./profile/profile-mock');

const proxy = {
  ...profile,
};

module.exports = delay(proxy, 1000);