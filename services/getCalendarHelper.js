var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
const auth = require('../config/auth_setup')
var server = process.env.SERVER
const responseHelper = require('../services/responseHelper')

var getCalendar = async function (req) {

  if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    console.log("In getCalendarHelper in token check failed")
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }

  const accessToken = await auth.getToken(server);
  const userName = process.env.NAME;
  if (accessToken && userName) {
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    const earlystart = new Date(new Date().setHours(0, 0, 0, 0));
    const start = new Date(req.body.timestamp); //new Date(new Date().setHours(0, 0, 0,0));
    console.log("test:=====>" + req.body.timestamp)
    console.log("test:=====>" + start.toISOString())
    const end = new Date(new Date(earlystart).setHours(23, 59, 59, 999));
    if (req.body.result.parameters.getmeets != 'all') {
      try {
        const result = await client
          .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
          .top(1)
          .select('subject,start,end,attendees')
          .orderby('start/dateTime ASC')
          .get();
        console.log(result + "result from the meeting ")
        var startlocal = (moment(result.value[0].start.dateTime + 'Z')).tz('America/Chicago').format('LT');
        var endlocal = (moment(result.value[0].end.dateTime + 'Z')).tz('America/Chicago').format('LT')
        var startlocal = startlocal.split('CDT');
        const firstName = userName.split(' ');
        var output = "Hi " + firstName[0] + ", your next meet is at " + startlocal[0] + " till " + endlocal + " and the meeting subject is " + result.value[0].subject;
        return responseHelper.responseBody(output)
      } catch (err) {
        console.log('Getcalendar helper in catch ====>' + `${err.code} ${err.message}`)
        var output = "Hmm,I cannot see any meetings on your calendar"
        return responseHelper.responseBody(output)
      }

    } else {
      try {
        var meetingBuilderList = ""
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
        if (numberOfmeetings > 1) {
          meetingBuilderList = ", your next meetings are ,"
          meetingBuilderList += result.value[1].subject + " from " + (((moment(result.value[1].start.dateTime + 'Z')).tz('America/Chicago').format('LT')).split('CDT'))[0] + " to " + (((moment(result.value[1].end.dateTime + 'Z')).tz('America/Chicago').format('LT')).split('CDT'))[0]
          for (i = 2; i < numberOfmeetings; i++) {
            meetingBuilderList += " ," + result.value[i].subject + " from " + (((moment(result.value[i].start.dateTime + 'Z')).tz('America/Chicago').format('LT'))[0].split('CDT'))[0] + " to " + (((moment(result.value[i].end.dateTime + 'Z')).tz('America/Chicago').format('LT')).split('CDT'))[0]
            if (i == 3) break
          }
        }
        var output = "Hi " + firstName[0] + " today and your next meeting starts at " + startlocal[0] + " till " + endlocal + " and the meeting subject is " + result.value[0].subject + meetingBuilderList;
        return responseHelper.responseBody(output)


      } catch (err) {
        console.log('Getcalendar helper in catch ====>' + `${err.code} ${err.message}`)
        var output = "Hmm,I cannot see any meetings on your calendar"
        return responseHelper.responseBody(output)
      }

    }
  } else {
    console.log('getcalendarHelper in else ====>' + `${err.code} ${err.message}`)
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }

}

exports.getCalendar = getCalendar;