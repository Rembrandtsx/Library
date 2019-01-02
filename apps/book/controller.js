'use strict';
var express = require('express'),
    router = express.Router(),
    isLoggedIn = require('../user/middlewares').isLoggedIn;

router.use(isLoggedIn);

router.route('/libro/:book_slug')
    .get(function (req, res){
        res.render('book/book_detail.html');
    });

router.route('/admin/crear-libro')
    .get(function(req, res){
        res.render('book/book_create.html');
    });
module.exports = router; 

