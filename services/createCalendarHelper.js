// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var graph = require('@microsoft/microsoft-graph-client');
const {
  google
} = require('googleapis');
const calendarId = 'tj3hpnldvl1cuuh92behfbodk0@group.calendar.google.com';
var google_dev_config = require('../config/google_dev_config')
const serviceAccount = google_dev_config.serviceAccount;
const calendar = google.calendar('v3');
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});
const auth = require('../config/auth_setup')
var server = process.env.SERVER
const responseHelper = require('../services/responseHelper')
const getEmailAddressHelper = require('../services/getEamilAddressHelper')




var scheduler = async function (req) {

  if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    console.log("In createCalendarHelper in token check failed")
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }
  const accessToken = await auth.getToken(server);
  const userName = process.env.NAME;
  const timeZone = 'America/Chicago';
  const timeZoneOffset = '-05:00';

  if (accessToken && userName) {
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    var meetingSubject = req.body.result.parameters.subject;
    var startTime = req.body.result.parameters.date + 'T' + req.body.result.parameters.startTime.split('-')[0];
    var endTime = req.body.result.parameters.date + 'T' + req.body.result.parameters.endTime.split('-')[0];
    const dateTimeStart = new Date(Date.parse(req.body.result.parameters.date + 'T' + req.body.result.parameters.startTime.split('-')[0] + timeZoneOffset));
    const dateTimeEnd = new Date(Date.parse(req.body.result.parameters.date + 'T' + req.body.result.parameters.endTime.split('-')[0] + timeZoneOffset));
    var emailAddress = 'C91271@ust-global.com';
    var location = req.body.result.parameters.location;

    var payload = {
      "subject": `${meetingSubject}`,
      "start": {
        "dateTime": `${startTime}`,
        "timeZone": `${timeZone}`
      },
      "end": {
        "dateTime": `${endTime}`,
        "timeZone": `${timeZone}`
      },
      "location": {
        "displayName": `${location}`
      },
      "attendees": [{
        "emailAddress": {
          "address": `${emailAddress}`,
          "name": "Ameya Deshmukh"
        },
        "type": "required"
      }]
    };
    try {

      const result = await client
        .api(`/me/events`)
        .post(payload);

      if (req.body.result.parameters.reminder != "no"||req.body.result.parameters.reminder != "NO"||req.body.result.parameters.reminder != "") {
        createCalendarEvent(dateTimeStart, dateTimeEnd, meetingSubject).then(() => {
          console.log("Done");
        }).catch((err) => {
          console.log("Something  Wrong Happend =====>"+err );
        });
      }
      output = 'Ok, I have schedule your meeting'
      return responseHelper.responseBody(output)

    } catch (err) {
      console.log("createCalendarHelper ====>" +`${err.code}: ${err.message}`);
      var output = "I am sorry.I did not get you"
      return responseHelper.responseBody(output)
    }

  } else {

    console.log(`${err.code}: ${err.message}` + "from else");
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }

}

function createCalendarEvent(dateTimeStart, dateTimeEnd, Subject) {
  return new Promise((resolve, reject) => {
    calendar.events.list({
      auth: serviceAccountAuth, // List events for time period
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd
    }, (err, calendarResponse) => {
      // Check if there is a event already on the Bike Shop Calendar
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create event for the requested time period
        calendar.events.insert({
          auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {
            summary: Subject,
            start: {
              dateTime: dateTimeStart
            },
            end: {
              dateTime: dateTimeEnd
            }
          }
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        });
      }
    });
  });
}

exports.scheduler = scheduler;