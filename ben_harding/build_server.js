const express = require('express');

var server = express().use(express.static(__dirname + '/build'));

module.exports = exports = server.listen(5000, () => console.log('Build server up'));
