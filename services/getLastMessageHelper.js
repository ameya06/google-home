var responseHelper = require('./responseHelper')
var channelIdHelper = require('./channelNameHelper')
var request = require('request');
var responseHelper = require('./responseHelper')

var getLastMessage = async (req, slackToken) => {
    var channelName = channelIdHelper.channelId(req.body.result.parameters.channel)
    let options = 'https://slack.com/api/conversations.history?' +
        'channel=' + channelName +
        '&token=' + slackToken;

    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            var data = JSON.parse(body)
            if (data.ok) {
                // console.log("body :: ", body)
                resolve(responseHelper.response("Hi, last message on " + req.body.result.parameters.channel + " channel is " + data.messages[0].text))

            } else {
                //return  
                console.log("Error err in get message ===>" + err + " body====>" + body)
                // return  responseHelper.response("I am sorry , I did not get that") 
                resolve(responseHelper.response("I am sorry , I did not get that"));

            }

        })
    })


}





//exports.getMessageResponse= getMessageResponse
exports.getLastMessage = getLastMessage