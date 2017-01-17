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

                if(!user) {
                    FlashService.error(req, 'User not found, please register first!!');
                    return res.redirect('/register');
                }

                return res.send({
                    message: err.message,
                    user: user
                });
            }

            req.logIn(user, function(err) {
                if(err) res.send(err);

                return res.redirect('/profile');
            });            
        })(req, res);
    },

    logout: function(req, res) {
        console.log('logging out....');
        req.logout();
        res.redirect('/');
    }
};

