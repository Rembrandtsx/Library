'use strict';

var config = function(server){
    server.use(function( req, res, next){
        req.MEDIA_URL = "http://localhost:8000/media";
    });
};

module.exports = config;