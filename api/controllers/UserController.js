/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  home: function(req, res)
  {
    console.log('User in controller is...');
    console.log(req.user);
    res.view('homepage');
    return;
  },

  register: function(req, res)
  {
    res.view('register');
    return;
  },

  login: function(req, res)
  {
    res.view('login');
    return;
  },

  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    res.json({
      todo: 'logout() is not implemented yet!'
    });

    return;
  },

  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    console.log('In signup...');
    console.log(req.params.all());
    // Attempt to signup a user using the provided parameters
    User.signup({
      first: req.param('first'),
      last: req.param('last'),
      email: req.param('email'),
      dob: new Date(req.param('dob')),  
      dependents: req.param('dependents'),
      password: req.param('password')
    }, function (err, user) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.me = user.id;

      console.log('adding flash message...');
      FlashService.success(req, 'Successfully registered and you can now login');
      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/');
    });
  }
}