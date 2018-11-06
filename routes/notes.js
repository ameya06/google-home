// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var authHelper = require('../helpers/auth');
var graph = require('@microsoft/microsoft-graph-client');
var request = require('request');
const {
    google
} = require('googleapis');
const calendarId = 'tj3hpnldvl1cuuh92behfbodk0@group.calendar.google.com';
const serviceAccount = {
    "type": "service_account",
    "project_id": "agent-fd06b",
    "private_key_id": "5864487d703a7d70c12f5d1ee192b6db63679053",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoGE/aW9LMmJzc\n54TGxkLN9uv5S7TE8T4lHOfqcixAiU+O3tjHQWXyJjnv94Q5IJFgkWitTcawjuN1\nYPXJmlPGAS4QB8rUNStRoD0UGIhvGnyN/1HdEPvSeDF6J6Kv8oYWWvcOeX6QNNyr\nB+D4uZDyEpTZA/EMK2sZD5ZOHnGKcvkgQjGWcRnGPluoy9S9dT9WOxlWUemM6QlM\n8gArLfSrQWwWftbogMG3g9h0V9cZKMkJ3OvO6SQKGxOWJvjSUpR5iFZB037oQdIC\nnN7H77jSMKfy+X0EkBw2B0HLJHJY2Yt3hD68B63H9u1EE9mVguRklZkzHlzsZMJS\nWRkyheAPAgMBAAECggEAAw9KOxnLNrgJS388NWpXdNEHBd4Fjo4rmzQMtYG1hlt+\nEL0M/GU7/r/kGDufF5f4hpyu+b295nwf7fJl8l62Rql4+qxvWhSCif5T6bgWmfaO\nPyO6sNDzijkmk7FK3HQILYNH8dRKdmg8fp8PKhEBgaMX8zuZxwIlUNiJScu8fuvY\nQ/wbx07HhLa69sFbhbV0coshrlbcqZBCDuzlMB4dfDoTQusS0eTTTzRSMZUKbnpi\nJsH+2tpDSY2abg/Kxj7kkwc0mRjooZRV7YxDIsLMg6PCbZ8Chy5quiCOtTpHpmpi\nW/jVfIGAOH8M5Y9aQMnwdhlwiuhzByn7ORL06O5xXQKBgQDf3PIDEba2HSbXgzH5\nI2TaACO4iE6DuluNfmruC11cAltnbeA1sV17gJdWlems9lZR22Ff8Ixcb62QqpLz\nHHiKw3XHcus51a9KF144n75qdSP9TMVOOleehxmPTdWuD3oYpsEBAQb0z6pcvNqK\nCCyBhsHW8OHSX8RJtuhpzpiS8wKBgQDAOd4FOfGQHUoL6e9kZM18AeQCqe+vXnEN\nzSCbS6pr+wu+dLUBDkGgfhiszyitiuVWdKurM6ulI3D+namEbB3jtrPFPF26faYG\n8J1mje0Q9KZxLY1BQBPQel4a8+vwosLHbbcEmuxVRkM4y5ixk+MribXx+mjDGirh\nYWIwGLItdQKBgE+GHI7Mjxx4lKDAYVNAqIXswMO/4CxZWkaUXwX7EYoq6C+Az8Ij\nJLNHxfsjPCSOSbHAfgHn4OTBY2XdwmAMgCHDN6bHgxpDd4aZcIYq8Si+Pi+wQvL8\nNL4C/ihzHPI9W0FAk5V4uPDkiH9zMysPpkfJCDkDzyS9kmwhRsS3eGnTAoGAMRmW\n4HbggRM6KrjicR5ebmJ9P0Dw/DZ/YisXPROiwForscZVxaNCmCAdZWa02T81PVQn\n1V8pZNEct6zF9BE5wUSVvregqVYW5obnbZ6rAz26lgYwoo4fgY0AJJpRlfG9Fvur\nV/3KiC2eVg+LPTCtQh2238w6njs84LzjO63TNVECgYBFApPmXl3OzToXu50cmCwR\nz5zahUdvoqGisP2iUuqL7ucuhtdQIrTLxC7ddaPoS5dG1w/D7kzDF440YGndbiKE\nWyx6wwdG5RxzDoXH0fSbhImPgG1y2EpTdS3sr5zV/eiXcqMRkXzIlqo4fC+QkJys\ngbFDlKPEpQjROpo/SkCo3Q==\n-----END PRIVATE KEY-----\n",
    "client_email": "outlook-calendar@agent-fd06b.iam.gserviceaccount.com",
    "client_id": "116059871734777560699",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/outlook-calendar%40agent-fd06b.iam.gserviceaccount.com"
}
const calendar = google.calendar('v3');
const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
});

const planId = 'kCvyGTWmtkmq3KqQZpRKMmUAH7SZ';
const groupIdwithPlan = 'd0a3a979-0e5f-4e41-92e7-7dbdda74933c';
var output = "";

const timeZone = 'America/Chicago';
const timeZoneOffset = '-06:00';
const bucketId = 'Lwf4_frlC0-o0E4WKMgwS2UACFxR';
const sectionId = "1-f50745bf-0f83-4f03-a3d5-d83377887c2f";

var HTML = require('html-parse-stringify');



router.post('/', async function (req, res, next) {
    const accessToken = process.env.TOKEN;
    const userName = process.env.NAME;
    if (accessToken && userName) {
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });

        try {

            if (false) {
                var meetingTitle = "Meeting 5077"
                var body = "Coffee"
                var payload = "<html><head><title>" + `${meetingTitle}` + "</title></head><body><ul><li>" + `${body}` + "</li></ul></body></html>"

                const respose = await client
                    .api(`/me/onenote/sections/` + `${sectionId}` + `/pages`)
                    .header("Content-Type", "text/html")
                    .post(payload);


                console.log(respose)
                output = "Ok,I have noted that for you"


                res.json({
                    speech: output,
                    displayText: output,
                    source: "microsoftAgent"
                });
            } else {
                //getting latest page
                const getlist = await client
                    .api(`/me/onenote/pages`)
                    .top(1)
                    .get();
               
              var pageId = getlist.value[0].id;
                
                var target = 'body';//'ul:{c6143c48-2947-4689-a318-d67b4d139593}{36}';
                var content = '<li>'+'adding from  app this test'+ '</li>';
                var payload = [

                    {
                        'target': `${target}`,
                        'action': 'append',
                        'content': `${content}`
                    }
                ]

                const respose = await client
                    .api(`me/onenote/pages/` + `${pageId}` + `/content`)
                    .patch(payload);


                //console.log(respose)
                output = "Ok,I have noted that for you"


                res.json({
                    speech: output,
                    displayText: output,
                    source: "microsoftAgent"
                });
            }


            //console.log(req.body);
        } catch (err) {

            res.json({
                speech: "I am sorry , I didn't get that",
                displayText: `${err.code}: ${err.message}`,
                source: "microsoftAgent"

            });
            console.log(`${err.code}: ${err.message}`);
        }

    } else {

        console.log(`${err.code}: ${err.message}` + "from else");

        res.json({
            speech: "There is error ",
            displayText: `${err.code}: ${err.message}`,
            source: "microsoftAgent"
        });
    }

});





module.exports = router;