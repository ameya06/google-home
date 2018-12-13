var request = require('request');
var responseHelper = require('../services/responseHelper')

var createReminder = async (req,slackToken) => {

    var urlReminder = 'https://slack.com/api/reminders.add?token='+`${slackToken}`+'&text=calling sita &time=10:25pm&pretty=1'
    

    request({
        url: urlR,
        method: "POST",
        json: true,
    }, (err, res, body) => {
       // console.log(body);
        if (body.ok) {
            console.log(body.ok);        
            return responseHelper.response('OK, I have added the reminder')
        } else {
            console.log("Err from createReminderHelper ====>" + err);
            return  responseHelper.response('Sorry ,I did not get that ')
        }
    })


}


exports.createReminder=createReminder