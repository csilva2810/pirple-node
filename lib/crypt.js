const crypto = require('crypto');
const config = require('./config');

exports.hashPassword = (password) =>
  crypto
    .createHmac('sha256', config.hashPasswordSecret)
    .update(password)
    .digest('hex');
