/**
 * isAuthenticated
 *
 */
module.exports = function isAllowed(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('Authenticated...');
    return next();
  }
  else {
    console.log('Not authenticated...redirecting');
    return res.redirect('/login');
  }
}