'use strict';
var express = require('express'),
    server = express(),
    port = process.env.PORT || 8000,
    swig = require('swig');

/* TEMPLATES */
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

/* STATIC FILES */
server.use(express.static(__dirname + '/public'));

server.listen(port, function(){
    console.log("Escuchando al puerto " + port);
});

require('./routers')(server);

