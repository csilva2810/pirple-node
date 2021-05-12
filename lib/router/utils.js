const createRequestHandler = (handlers) => (requestParams) => {
  const handler = handlers[requestParams.req.method.toLowerCase()];

  if (typeof handler !== 'function') {
    return {
      status: httpStatusCodes.METHOD_NOT_ALLOWED,
    };
  }

  return handler(requestParams);
};

module.exports = {
  createRequestHandler,
};
