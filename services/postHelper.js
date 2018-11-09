//var channelName = 'CCYADKQKE'
var request = require('request');
var responseHelper = require('./responseHelper')
var channelIdHelper = require('./channelNameHelper')


var postMessage = async (req, slackApiToken) => {
   
    var channelName = channelIdHelper.channelId(req.body.result.parameters.channel)
    var options = 'https://slack.com/api/chat.postMessage?' +
        'token=' + slackApiToken +
        '&' +
        'channel=' + channelName +
        '&' +
        'as_user=true' +
        '&' +
        'text=' + req.body.result.parameters.message;
    // Return new promise
    return new Promise(function (resolve, reject) {
        // Do async job
        request.post(options, function (err, resp, body) {
            if (err) {
                console("Error err in post===>" + err)
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}


var postMessageResponse = async (req, slackApiToken) => {
    if ((JSON.parse(await postMessage(req, slackApiToken)).ok)) {
       
        var output = "Ok, I have posted that for you"
        return responseHelper.responseBody(output)

    } else {
        console.log("Err from ======>postHelper")
        var output = "I am sorry , I did not get that "
        return responseHelper.responseBody(output)

    }
}

exports.postMessageResponse = postMessageResponse
