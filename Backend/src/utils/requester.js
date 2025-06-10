const axios = require('axios');

const requester = async ({ method = 'get', url, data = {}, headers = {} }) => {
  return await axios({ method, url, data, headers });
};

module.exports = requester;
