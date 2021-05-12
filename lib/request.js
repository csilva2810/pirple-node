const { URL } = require('url');
const querystring = require('querystring');

const parse = (req) =>
  new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(req.url, 'http://' + req.headers.host);
      const trimSlashsRegex = /^\/+|\/+$/g;
      const path = parsedUrl.pathname.replace(trimSlashsRegex, '');
      const query = parsedUrl.query || {};

      console.log('parse', { parsedUrl, query });

      let payload = '';

      req.on('data', (data) => {
        payload += data;
      });

      req.on('end', () => {
        console.log('end', req);
        resolve({
          path,
          query,
          payload,
        });
      });
    } catch (e) {
      console.log('parse error', e);
    }
  });

module.exports = {
  parse,
};
