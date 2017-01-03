/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {

    first: 'STRING',
    last: 'STRING',
    email: 'STRING',
    dob: 'Date',
    dependents: 'INTEGER',
    password: 'STRING'
    },
    login : { type: 'string' },

    logout : { type: 'string' },


   beforeCreate:function(user, cb) {
     bcrypt.genSalt(10, function(err, salt) {
       bcrypt.hash(this.password, salt, function(err, hash) {
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
  }
  };

