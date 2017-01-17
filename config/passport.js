var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
    console.log('In serializeuser...');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('In deserializeuser...' + id);
    User.findOne({id: id}, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, 
function(email, password, done) {
    console.log('In passport.js....');
    User.findOne({email:email}, function(err, user) {
        if(err) { return done(err);}

        if(!user) {
            return done(null, false, {message : 'Incorrect email.'});
        }

        bcrypt.compare(password, user.password, function(err, res) {
            if(!res) {
                return done(null, false, { message: 'Invalid password.'});                
            }

            var returnUser = {
                email: user.email,
                createdAt: user.createdAt,
                id: user.id
            };

            return done(null, returnUser, {
                message: 'Logged In successfully.'
            });
        });
    });
}))