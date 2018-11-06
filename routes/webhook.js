var express = require('express');
var router = express.Router();
var getCalendarHelper = require('../services/getCalendarHelper');
var createCalendarHelper = require('../services/createCalendarHelper');
var getTaskHelper = require('../services/getTaskHelper');
var createTaskHelper = require('../services/createTasksHelper');
var responseHelper = require('../services/responseHelper')

router.post('/', async function (req, res) {

    const accessToken = await auth.getToken(server);
    const userName = process.env.NAME;

    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        console.log("In intenRouter in token check failed")
        var output = "I am sorry.I did not get you"
        res.json( responseHelper.responseBody(output))
    }
    switch (req.body.result.parameters.intent) {

        case "createCalendarHelper":
            res.json(await createCalendarHelper.scheduler(req))
            break;
        case "getCalendar":
            
           {
                  if (accessToken && userName) {
                    const client = graph.Client.init({
                      authProvider: (done) => {
                        done(null, accessToken);
                      }
                    });
                    const earlystart = new Date(new Date().setHours(0, 0, 0, 0));
                    const start = new Date(req.body.timestamp); //new Date(new Date().setHours(0, 0, 0,0));
                    const end = new Date(new Date(earlystart).setHours(23, 59, 59, 999));
                   if (req.body.result.parameters.getmeets != 'all') {
                      try {
                        const result = await client
                          .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
                          .top(1)
                          .select('subject,start,end,attendees')
                          .orderby('start/dateTime ASC')
                          .get();
                        var startlocal = (moment(result.value[0].start.dateTime + 'Z')).tz('America/Chicago').format('LT');
                        var endlocal = (moment(result.value[0].end.dateTime + 'Z')).tz('America/Chicago').format('LT')
                        var startlocal = startlocal.split('CDT');
                        const firstName = userName.split(' ');
                        var output = "Hi " + firstName[0] + " your next meet is at " + startlocal[0] + " till " + endlocal + " and the meeting subject is " + result.value[0].subject;
                        return responseHelper.responseBody(output)
                      } catch (err) {
                        console.log('Getcalendar helper in catch ====>' + `${err.code} ${err.message}`)
                        var output = "I am sorry.I did not get you"
                        responseHelper.responseBody(output)
                      }
                
                    } else {
                      try {
                        console.log('webhook inside else')
                        const result = await client
                          .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
                          .select('subject,start,end,attendees')
                          .orderby('start/dateTime ASC')
                          .get();
                        var numberOfmeetings = Object.keys(result.value).length;
                        var startlocal = (moment(result.value[0].start.dateTime + 'Z')).tz('America/Chicago').format('LT');
                        var endlocal = (moment(result.value[0].end.dateTime + 'Z')).tz('America/Chicago').format('LT')
                        var startlocal = startlocal.split('CDT');
                        const firstName = userName.split(' ');
                        if (numberOfmeetings > 1) var meetings = "meetings";
                        else var meetings = "meeting";
                        var output = "Hi " + firstName[0] + " you have " + numberOfmeetings + " " + meetings + " today and your next meeting starts at " + startlocal[0] + " till " + endlocal + " and the meeting subject is " + result.value[0].subject;
                        return responseHelper.responseBody(output)
                
                
                      } catch (err) {
                        console.log('Getcalendar helper in catch ====>' + `${err.code} ${err.message}`)
                        var output = "I am sorry.I did not get you"
                        responseHelper.responseBody(output)
                      }
                
                    }
                  } else {
                    console.log('getcalendarHelper in else ====>' + `${err.code} ${err.message}`)
                    var output = "I am sorry.I did not get you"
                    responseHelper.responseBody(output)
                  }
            }
            break;
        case "getTask":
            res.json(await getTaskHelper.getTasks(req))
            break;
        case "getTask":
            res.json(await getTaskHelper.getTasks(req))
            break;
        case "createTask":
            res.json(await createTaskHelper.createTask(req))
            break;
        case "createNote":
            res.json('Work in progess')
            break;



        default:
            console.log("Intent not found in intentRounter")
            res.json("I am sorry");
    }

});



module.exports = router;