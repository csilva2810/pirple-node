const http = require('http');
const config = require('./lib/config');
const router = require('./lib/router');
const httpStatusCodes = require('./lib/http-status-codes');

const server = http.createServer(async function requestHandler(req, res) {
  try {
    console.log('<<<<<<<<<< REQUEST START >>>>>>>>>>');
    console.log('headers', req.headers.host);
    const response = await router(req);

    res.setHeader('Content-Type', response.contentType || 'application/json');
    res.writeHead(response.status);
    res.end(JSON.stringify(response.data));
  } catch (e) {
    res.writeHead(httpStatusCodes.BAD_REQUEST);
    res.end('Error parsing the request');
  } finally {
    console.log('<<<<<<<<<< REQUEST END >>>>>>>>>>\n');
  }
});

server.listen(config.port, () => {
  console.log(
    `Server is listening on port ${config.port} in ${config.envName}`
  );
});
