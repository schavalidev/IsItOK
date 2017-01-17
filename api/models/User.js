/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {

      first: 'string',
      last: 'string',
      email: 'string',
      dob: 'Date',
      dependents: 'integer',
      password: 'string',
      accounts: 'Array'
    },
    login : { type: 'string' },

    logout : { type: 'string' },


   beforeCreate:function(user, cb) {
     bcrypt.genSalt(10, function(err, salt) {
       bcrypt.hash(user.password, salt, function(err, hash) {
         if(err) {
           console.log(err);
           cb(err);
         } else {
           user.password = hash;
           cb();
         }
       });
     });
   },

   /**
   * Create a new user using the provided inputs,
   * but encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • name     {String}
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  signup: function (inputs, cb) {
    // Create a user
    console.log('In User signup...');
    console.log(inputs);
    User.create({
      first: inputs.first,
      last: inputs.last,
      email: inputs.email,
      dob: new Date(inputs.dob),
      dependents: inputs.dependents,
      password: inputs.password
    })
    .exec(cb);
  },

  /**
   * Check validness of a login using the provided inputs.
   * But encrypt the password first.
   *
   * @param  {Object}   inputs
   *                     • email    {String}
   *                     • password {String}
   * @param  {Function} cb
   */

  attemptLogin: function (inputs, cb) {
    // Create a user
    User.findOne({
      email: inputs.email,
      password: inputs.password
      })
    .exec(cb);
  },

  addAccount: function (account, cb) {
    //Find the user
    User.findOne(req.user, function(err, user){
      if(err || !user) {
        res.send({
          info: err, 
          message: 'User not found'});
      }

      console.log('found user in addaccount...'+ user.email);
      if (user.accounts.find(function(acc) {
        if(acc.institution === account.institution) {
          return true;
      }
      }) === undefined) {
          push({institution: account.institution, accessToken: account.accessToken}); 
      } else {
        console.log('user already has account for the institution:' + institution);  
      }
      console.log('updated user is....' + JSON.stringify(user));
      user.save(cb);
    });
  },

  findAccount: function(options, cb) {
    //Find the user
      User.findOne({email: options.email}, function(err, user){
      
      if(err) {
        cb({error: err}, null);
      }

      if(!user) {
        cb({err: 'User not found'}, null);
      }

      var account = {};
      user.accounts.forEach(function(element) {
        console.log('accounts forEach...' + JSON.stringify(element));
        if(element.institution === options.institution) {
          console.log('!!!!!!!!!!!!found a match');
          account = element;
        }
      });

      cb(null, account);
      });
    }
  };

