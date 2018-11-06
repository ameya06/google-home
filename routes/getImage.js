var express = require('express');
var router = express.Router();
const request = require('request');
var url = 'https://slack.com/api/files.list?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&pretty=1'
var url2 ='https://slack.com/api/files.list?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&channel=CDNP6GNSK&pretty=1'
const server = require('../app')
var io = require('socket.io').listen(server);



/* POST image page. */
router.get('/', function (req, res, next) {
  
});

module.exports = router;