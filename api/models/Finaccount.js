/**
 * Finaccount.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    institution: 'string',
    accessToken: 'string'
  },
  
  beforeCreate:function(account, cb) {
   bcrypt.genSalt(10, function(err, salt) {
     bcrypt.hash(account.accessToken, salt, function(err, hash) {
       if(err) {
         console.log(err);
         cb(err);
       } else {
         account.accessToken = hash;
         cb();
       }
     });
   });
  }
};