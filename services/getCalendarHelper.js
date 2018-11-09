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
    console.log(earlystart+"early")
    const start =req.body.timestamp; //new Date(new Date().setHours(0, 0, 0,0));
    
  // console.log("test:=====>"+start.toISOString())
    const end = new Date(new Date(earlystart).setHours(23, 59, 59, 999));
    const end2 =  new Date(new Date(new Date(new Date(start).setHours(0, 0, 0, 0))).setHours(23, 59, 59, 999));
    console.log(earlystart+"======early")
    console.log("test:=====>"+req.body.timestamp)
    console.log(end+"==========end")
    console.log(end2.toISOString()+"==========end22222")
   if (req.body.result.parameters.getmeets != 'all') {
      try {
        //https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2018-11-09T04:11:45.185Z&enddatetime=2018-11-16T04:11:45.185Z
        const result = await client
          .api(`me/calendarview?startdatetime=`+`${start}`+`&enddatetime=`+`2018-11-16T02:30:45.185Z`)
          .top(1)
          .select('subject,start,end,attendees')
          .orderby('start/dateTime ASC')
          .get();

            console.log(result)
        var startlocal = (moment(result.value[0].start.dateTime + 'Z')).tz('America/Chicago').format('LT');
        var endlocal = (moment(result.value[0].end.dateTime + 'Z')).tz('America/Chicago').format('LT')
        var startlocal = startlocal.split('CDT');
        const firstName = userName.split(' ');
        var output = "Hi " + firstName[0] + ", your next meet is at " + startlocal[0] + " till " + endlocal + " and the meeting subject is " + result.value[0].subject;
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
          .api(`me/calendarview?startdatetime=`+`${start}`+`&enddatetime=`+`2018-11-16T02:30:45.185Z`)
          .select('subject,start,end,attendees')
          .orderby('start/dateTime ASC')
          .get();
          console.log(result)
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
       return responseHelper.responseBody(output)
      }

    }
  } else {
    console.log('getcalendarHelper in else ====>' + `${err.code} ${err.message}`)
    var output = "Hmm, its loud here ,I am sorry.I did not get you"
   return responseHelper.responseBody(output)
  }

}

exports.getCalendar = getCalendar;