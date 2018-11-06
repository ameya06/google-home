var request = require('request');
var responseHelper = require('../services/responseHelper')

var createReminder = async (req,slackToken) => {

    var urlReminder = 'https://slack.com/api/reminders.add?token='+`${slackToken}`+'&text=calling sita &time=10:25pm&pretty=1'
    var urlR ='https://slack.com/api/reminders.add?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&text=calling%20becky&time=11%3A16%20pm&pretty=1'

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