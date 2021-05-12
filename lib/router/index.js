const httpStatusCodes = require('../http-status-codes');
const users = require('../routes/users');
const request = require('../request');

const routeNotFoundHandler = () => ({
  status: httpStatusCodes.NOT_FOUND,
  data: 'Not found',
});

const routes = {
  users,
  ping: () => ({ status: httpStatusCodes.OK }),
};

const router = async (req) => {
  const { path, query, payload } = await request.parse(req);
  const handlerFunction =
    typeof routes[path] === 'function' ? routes[path] : routeNotFoundHandler;

  return await handlerFunction({
    req,
    payload: payload ? JSON.parse(payload) : {},
    query,
  });
};

module.exports = router;
