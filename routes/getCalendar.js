var express = require('express');
var router = express.Router();
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
var getCalendarHelper = require('../services/getCalendarHelper');


router.get('/', async function (req, res, next) {
  if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    res.send("Auth failed")
}
res.send(await getCalendarHelper.getCalendar(req))
      
     });
  
  module.exports = router;