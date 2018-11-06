const auth = require('../config/auth_setup')
var server = process.env.SERVER
var graph = require('@microsoft/microsoft-graph-client');
const bucketId = 'Lwf4_frlC0-o0E4WKMgwS2UACFxR';
const planId = 'kCvyGTWmtkmq3KqQZpRKMmUAH7SZ';
const responseHelper = require('../services/responseHelper')
var assignmentsId = "d0a3a979-0e5f-4e41-92e7-7dbdda74933c";
const graphURL = `https://graph.microsoft.com/beta/me/outlook/tasks`


var createOutlookTask = async function (req) {
    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        console.log("In createTashsHelper in token check failed")
        var output = "I am sorry.I did not get you"
        return responseHelper.responseBody(output)
    }
    const accessToken = await auth.getToken(server);
    const userName = process.env.NAME;
    var subject= req.body.result.parameters.task
    var importance = req.body.result.parameters.importance
    var startdate = req.body.timestamp
    console.log(startdate)
    var endate = "2019-05-05T16:00:00"
    var timeZone = "Central Time Zone"


    if (accessToken && userName) {
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
        try {

            var payload = {
              //  "assignedTo": "Dana Swope",
                "subject": `${subject}`,
                "importance": `${importance}`,
                "color": "Preset3",
                "displayName": "String"

                // "startDateTime": {
                //     "dateTime": `${startdate}`,
                //     "timeZone": `${timeZone}`
                // },
                // "dueDateTime": {
                //     "dateTime": `${endate}`,
                //     "timeZone": "Eastern Standard Time"
                // }
            }

            const respose = await client
                .api(`${graphURL}`)
                .post(payload);

         


            output = "Ok,I have noted that for you"
            return responseHelper.responseBody(output)


            //console.log(req.body);
        } catch (err) {
            console.log("In createTashsHelper in catch =====>" + `${err.code}: ${err.message}`)
            var output = "I am sorry.I did not get you"
            return responseHelper.responseBody(output)
        }

    } else {

        console.log("In createTashsHelper in else =====>" + `${err.code}: ${err.message}`)
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
exports.createOutlookTask = createOutlookTask