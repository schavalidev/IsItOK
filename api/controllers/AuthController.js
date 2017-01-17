/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        console.log('In Auth login...');
        passport.authenticate('local', function(err, user, info) {
            if((err) || (!user)) {
                return res.send({
                    message: err.message,
                    user: user
                });
            }

            req.logIn(user, function(err) {
                if(err) res.send(err);

                return res.send({
                    user: user 
                });
            });            
        })(req, res);
    },

    logout: function(req, res) {
        console.log('logging out....');
        req.logout();
        res.redirect('/');
    }
};

