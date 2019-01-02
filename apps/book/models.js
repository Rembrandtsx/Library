'use strict';
var mongoose = require('../../config/mongoose'),
    bookSchema = require('./schemas').bookSchema;

var models = {
    Book : mongoose.model('user', bookSchema)
};

module.exports = models;
