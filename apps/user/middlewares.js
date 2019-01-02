'use strict';

var middlewares = {
    isLoggedIn : function (req, res, next){
        //Si el usuario está logueado le permite pasar.
        if(req.user){
            next();
            return;
        };
        res.redirect('/');
    }
};

module.exports = middlewares;