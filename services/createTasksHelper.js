const auth = require('../config/auth_setup')
var server = process.env.SERVER
var graph = require('@microsoft/microsoft-graph-client');
const bucketId = 'Lwf4_frlC0-o0E4WKMgwS2UACFxR';
const planId = 'kCvyGTWmtkmq3KqQZpRKMmUAH7SZ';
const responseHelper = require('../services/responseHelper')
var assignmentsId = "d0a3a979-0e5f-4e41-92e7-7dbdda74933c";


var createTask = async function (req,access_token) {
    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        console.log("In createTashsHelper in token check failed")
        var output = "I am sorry.I did not get you"
        return responseHelper.responseBody(output)
    }
    const accessToken = access_token;
    const userName = process.env.NAME;
    var title = req.body.result.parameters.createTask;
    if (accessToken && userName) {
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
        try {

            var payload = {
                "planId": `${planId}`,
                "bucketId": `${bucketId}`,
                "title": `${title}`
                // "assignments": {
                //     "d0a3a979-0e5f-4e41-92e7-7dbdda74933c": {
                //         "@odata.type": "#microsoft.graph.plannerAssignment",
                //         "orderHint": " !"
                //     }
                // }
                
            };

            const respose = await client
                .api(`planner/tasks`)
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
exports.createTask = createTask