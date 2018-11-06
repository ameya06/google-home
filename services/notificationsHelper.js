var request = require('request');
var responseHelper = require('./responseHelper')
var channelIdHelper = require('./channelNameHelper')
var count = 0;

var notifications = async (req, slackApiToken) => {
    var channelName = channelIdHelper.channelId(req.body.result.parameters.channel)
    var options = "https://slack.com/api/channels.history?" +
        "token=" + slackApiToken +
        "&channel=" + channelName +
        "&unreads=true&" +
        "unread_count_display";

    return new Promise(function (resolve, reject) {
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                console.log("Resolve body====>"+body);
                resolve(count + JSON.parse(body).unread_count_display);
            }
        })
    })
}

var allnotifications = async()=>{}

exports.notifications = notifications