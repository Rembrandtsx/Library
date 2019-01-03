'use strict';
var express = require('express'),
    server = express(),
    port = process.env.PORT || 8000,
    swig = require('swig'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    RedisStore = require('connect-redis')(session);

/* BODY PARSER, COOKIES, SESSIONS */
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
	store : new RedisStore({
			host : '127.0.0.1',
			port : 6379,
			db : 1 
		}),
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
server.use(flash());

server.use(function (req, res, next){
    server.locals.user = req.user; //la variable que se envía al template 
    next();
});

/* EXPRESS SESSION */
server.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

/* PASSPORT */
require('./config/passport')(server);

/* TEMPLATES */
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

/* STATIC FILES */
server.use(express.static(__dirname + '/public'));

server.listen(port, function () {
    console.log("Escuchando al puerto " + port);
});

require('./routers')(server);

if(process.env.ESTADO === 'dev'){
    console.log("Estoy en desarrollo");
    require('./config/server/local')(server);
};

if(process.env.ESTADO === 'prod'){
    console.log("Estoy en producción");
    require('./config/server/prod')(server);
}
