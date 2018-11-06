// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone')


/* GET /calendar */
router.get('/', async function(req, res, next) {
  let parms = { title: 'Calendar', active: { calendar: true } };
   
  const accessToken = await authHelper.getAccessToken(req.cookies, res);
  const userName = req.cookies.graph_user_name;
  
  if (accessToken && userName) {
    parms.user = userName;

    // Initialize Graph client
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    
    // Set start of the calendar view to today at midnight
    var a = moment.tz(new Date, "America/Chicago");
    var startlocal = a.utc().format();
    const start = new Date(new Date().setHours(0,0,0));
    //console.log(new Date());
   
   // console.log((((moment( '2018-10-02T03:14:28.583Z')).tz('America/Chicago').format('llll')).toISOString()));
       
    // Set end of the calendar view to 7 days from start
    const end = new Date(start.setHours(24,0,0));
    //const end = new Date(new Date(start).setHours(23,59,59,999));
    try {
      // Get the first 10 events for the coming week
      const result = await client
      .api(`/me/calendarView?startDateTime=${startlocal}&endDateTime=${end.toISOString()}`)
      .select('subject,start,end,attendees')
      .orderby('start/dateTime ASC')
      .get();
      
      parms.events = result.value; 
     //console.log(end.toISOString()+'------')
      //console.log((new Date).getDate());--get date 
     //console.log(Object.keys(result.value).length);-- get number of meetings 
     var startlocaltime =(moment(parms.events[0].start.dateTime +'Z')).tz('America/Chicago').format('LT'); 
     var startlocaltime = startlocaltime.split("CDT");
    // console.log(startlocaltime);      
     res.render('calendar', parms);
    } catch (err) {
      parms.message = 'Error retrieving events';
      parms.error = { status: `${err.code}: ${err.message}` };
      parms.debug = JSON.stringify(err.body, null, 2);
      res.render('error', parms);
    }
    
  } else {
    // Redirect to home
    res.redirect('/');
  }
});




module.exports = router;