// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
const https = require('https');
const url='https://jsonplaceholder.typicode.com/posts';
const request = require('request');

router.get('/', async function(req, res, next) {
  let parms = { title: 'Calendar', active: { calendar: true } };
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = process.env.NAME;
  
  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    
    // Set start of the calendar view to today at midnight
   
    var meetingSubject = req.body.timestamp.result.parameters.subject; 
    var  startTime = "2018-10-03T18:36:47.096Z";
     var endTime = "2018-10-10T18:36:47.096Z";
     var timeZone = "UTC"
  console.log(startTime);
  
     var messageJ = {
    "subject":`${meetingSubject}`,
    "start": {
      "dateTime": `${startTime}`,
      "timeZone": `${timeZone}`
    },
    "end": {
      "dateTime": `${endTime}`,
      "timeZone": `${timeZone}`
    }
  };
    // Set end of the calendar view to 7 days from start
    
    //const end = new Date(new Date(start).setHours(23,59,59,999));
    try {
      // Get the first 10 events for the coming week
      const result = await client
      .api(`/me/events`)
      .post(messageJ);

      
     console.log(result);
     
      //console.log((new Date).getDate());--get date 
     //console.log(Object.keys(result.value).length);-- get number of meetings 
    //  var startlocaltime =(moment(parms.events[0].start.dateTime +'Z')).tz('America/Chicago').format('LT'); 
    //  var startlocaltime = startlocaltime.split("CDT");
    // console.log(startlocaltime);      
     res.render('schedule');
    } catch (err) {
      parms.message = 'Error retrieving events';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      console.log(`${err.code}: ${err.message}`+ "From err");
      res.render('error');
      
    }
    
  } else {
    // Redirect to home
    console.log(`${err.code}: ${err.message}`+"from else");
    res.redirect('/');
  }

});




module.exports = router;