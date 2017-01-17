/**
 * FinaccountController
 *
 * @description :: Server-side logic for managing finaccounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
        PlaidService.getInstitutions({}, function(err, response) {
            return res.send(response);
        })
    },

    addAccountPage: function(req, res)
    {
        console.log(JSON.stringify(req.user));
        res.view('accounts/Add');
        return;
    },

    addAccount: function(req, res) {
        User.findAccount({email: req.user.email}, function(err, account) {            
           
            if(err) {
                console.log('failed in fin account controller....');
                return res.send(err);
            }

            if(account) {
                return res.send({message: 'Account already exists for user:' + req.user.email + ' for institution:'+ req.body.institution});
            }

            PlaidService.addConnectUser({institutionType: req.body.institution, username: req.body.username, password: req.body.password}, function(err, response){
                User.addAccount({institution: req.body.institution, access_token: response.access_token}, function() { 
                res.send({
                    message: 'successfully added account to the specified user'});
                });
            });
        });
    },

    getLastTransactions: function(req, res) {        
        User.findAccount({email:req.user.email, institution: req.query.institution}, function(err, account) {
            if(err) { 
                return res.send({
                    message: 'Error finding the account for user',
                error: err});
            }

            if(!account) {
                return res.send({
                    message : 'User ' + req.user.email + ' not found'
                    });
            }

            var options = { 'access_token' : account.accessToken, 'opts': { gte: '30 days ago'} };
            options.access_token = account.accessToken;
            console.log('Options in FinAcc controller...' + JSON.stringify(options) + 'access_token:' + account.accessToken);

            PlaidService.getLastTransactions(options, function(err, response) {
                if(err) {
                    res.send({ err: err });
                }

                res.send({
                    message: 'Successfully retrieved transactions',
                    info: response.transactions
                });            
            });
        });
    }
}