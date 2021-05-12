const httpStatusCodes = require('../http-status-codes');
const data = require('../data');
const crypt = require('../crypt');
const utils = require('../router/utils');

const handlers = {
  get: async ({ query, sendResponse }) => {},

  post: async ({ payload, sendResponse }) => {},

  put: async ({ query, payload, sendResponse }) => {},

  delete: async ({ query, sendResponse }) => {},
};

const router = utils.createRouter(handlers);

module.exports = router;
