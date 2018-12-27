'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library', {useNewUrlParser: true});

module.exports = mongoose; 