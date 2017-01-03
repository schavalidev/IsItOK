/**
 * isAuthenticated
 *
 */
var jwt = require('express-jwt');

var authCheck = jwt({
  secret: new Buffer('ldVzFMBWnlyzSvhwXzLzX_t0qgEHJW5oD4B5S867HMmCnut4AM1-Bso9qBscyFb_', 'base64'),
  audience: 'vAXGIMGvKBH0qh9Mkq7Msy81hqGBY1br'
});

module.exports = authCheck;