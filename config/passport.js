var Jwtstragety = require('passport-jwt').Strategy;

// var User = require('../models/user')
var config = require('../config/database')

module.exports = function(passport){
    var  opts= {};

    opts.secretOrKey = config.secret;
    passport.use(new Jwtstragety(opts, function(jwt_payload, done){

        
        User.findOne({id: jwt_payload.id}, function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){
                done(null, user)
            }else{
                done(null, false)
            }




        });
    }));


};

