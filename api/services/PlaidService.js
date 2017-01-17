var plaid = require('plaid');
var plaidClient = new plaid.Client('58202d9a46eb126b6a8607a8', '5922f01f6885d2b51235277db9f159', plaid.environments.tartan);

module.exports = {

    getInstitutions: function(options, done) {
        plaid.getInstitutions(
            plaid.environments.tartan, function(err, response) {
                if(err) res.send({
                    message: 'Failed in getting institutions from plaid',
                    info: err
                });

                console.log('Successfully acquired plaid getInstitutions');
                console.log(response);
                done(null, response);
        });
    },

    addConnectUser: function(options, done) {
        console.log("In plaid service..." + options.institutionType + " " + options.username + " " + options.password);
        plaidClient.addConnectUser(options.institutionType, {username: options.username, password: options.password}, function(err, mfaResponse, response) {
            if(err) { 
                console.log('failed to add connect user in plaid service...' + err.message); 
                done(err, response);
            }

            console.log('Response in plaid service...' + response.access_token);
            done(null, response);
        })
    },

    getLastTransactions: function(options, done) {
        console.log('In plaid service...'+ options.access_token + ':' + options.toString());
        plaidClient.getConnectUser(options.access_token, options.opts, function(err, response) {
            if(err) {
                console.log('failed to get connect user info from plaid:' + JSON.stringify(err));
            }

            console.log('You have ' + response.transactions.length +
              ' transactions from the last thirty days.');              
            done(null, response);
        })

    }
}