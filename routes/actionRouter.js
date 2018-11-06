var express = require('express');
var router = express.Router();
var slackApiToken = 'xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7';
var slackApiTokenvdi = 'xoxp-2152601087-446900390149-463945941040-49776293ec6ff5124f0639f1a6021046';

var postHelper = require('../services/postHelper')
var notificationHelper = require('../services/notificationsHelper')
var getImageHelper = require('../services/getImageHelper')
var createReminderHelper = require('../services/createReminderHelper')
var getMessageHelper = require('../services/getLastMessageHelper')
var responseHelper = require('../services/responseHelper')

router.post('/', async function (req, res, next) {


    switch (req.body.result.parameters.intent) {

        //Post on channel
        case "post":
            res.json(await postHelper.postMessageResponse(req, slackApiTokenvdi))
            break;

            //Notification   
        case "notification":
            res.json(await notificationHelper.notifications(req, slackApiToken))
            break;

            // Images   
        case "getLastImage":
            res.json(await getImageHelper.getLastImage())
            break;
        case "getFirstImage":
            res.json(await getImageHelper.getFirstImage())
            break;
        case "getHomeImage":
            res.json(await getImageHelper.getHomeImage())
            break;
        case "getTestImage":
            res.json(await getImageHelper.getTestImage())
            break;
        case "getNextImage":
            res.json(await getImageHelper.getNextImage())
            break;
        case "getPreviousImage":
            res.json(await getImageHelper.getPreviousImage())
            break;


            // Message    
        case "getMessage":
            res.json(await getMessageHelper.getLastMessage(req, slackApiToken))
            break;

            // Reminder    
        case "createReminder":
            res.json(await createReminderHelper.createReminder(req, slackApiToken))
            break;
        default:
            console.log("Intent not found")
            res.json(await responseHelper.response("I am sorry, I did not get you "))
            break;

    }

});

module.exports = router;