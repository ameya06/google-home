var express = require('express');
var router = express.Router();
var getCalendarHelper = require('../services/getCalendarHelper');
var createCalendarHelper = require('../services/createCalendarHelper');
var getTaskHelper = require('../services/getTaskHelper');
var createTaskHelper = require('../services/createTasksHelper');
var responseHelper = require('../services/responseHelper')
var getNotes = require('../routes/getNotes')
var getOutlookTaskHelper = require('../services/getOutlookTaskHelper')
var createOutlookTaskHelper = require('../services/createOutlookTaskHelper')
var deleteOutlookTask = require('../services/deleteOutlookTaskHelper')
var responseHelper = require('../services/responseHelper')
var createNoteHelper = require('../services/createNoteHelper')
var addNotesHelper = require('../services/addNotesHelper')
var getLastMessageHelper = require('../services/getLastMessageHelper')
var cache = require('memory-cache');


// Slack api
var slackApiToken = process.env.SLACKTOKEN;




var postHelper = require('../services/postHelper')
var notificationHelper = require('../services/notificationsHelper')
var getImageHelper = require('../services/getImageHelper')
var createReminderHelper = require('../services/createReminderHelper')
var getMessageHelper = require('../services/getLastMessageHelper')



router.post('/', async function (req, res) {
    const access_token = cache.get('access_token');
   // console.log(access_token)
    // if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    //     console.log("In intenRouter in token check failed")
    //     var output = "I am sorry.I did not get you"
    //     res.json(responseHelper.responseBody(output))
    // }
    switch (req.body.result.parameters.intent) {

        // calendar
        case "createCalendarHelper":
            res.json(await createCalendarHelper.scheduler(req,access_token))
            break;
        case "getCalendar":
            res.json(await getCalendarHelper.getCalendar(req,access_token))
            break;

            // Planner Task            
        case "getTask":
            res.json(await getTaskHelper.getTask(req,access_token))
            break;
        case "createTask":
            res.json(await createTaskHelper.createTask(req,access_token))
            break;

            // Notes    
        case "createNote":
            res.json(await createNoteHelper.createNote(req,access_token))
            break;
        case "addNote":
            res.json(await addNotesHelper.addNote(req,access_token))
            break;
        case "getNotes":
            res.send("Work in process")
            break;

            // Outlook Task   
        case "getOutlookTask":
            res.send(await getOutlookTaskHelper.getOutlookTask(req,access_token))
            break;
        case "createOutlookTask":
            res.send(await createOutlookTaskHelper.createOutlookTask(req,access_token))
            break;
        case "deleteOutlookTask":
            res.send(await responseHelper.responseBody("I am sorry , I did not get you"))
            break;
            //--------------------------------Slack APP---------------------------------------//
            //Post on channel
        case "post":
            res.json(await postHelper.postMessageResponse(req, slackApiToken))
            break;

            //Notification   
        // case "notification":
        //     res.json(await notificationHelper.notifications(req, slackApiToken))
        //     break;
            

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

            //Presnetation mode
        case "startPresentation":
            res.json(await getImageHelper.startPresentation())
            break;
        case "stopPresentation":
            res.json(await getImageHelper.stopPresentation())
            break;


            // Message    
        case "getLastMessage":
            res.json(await getMessageHelper.getLastMessage(req, slackApiToken))
            break;

            // Reminder    
        case "createReminder":
            res.json(await createReminderHelper.createReminder(req, slackApiToken))
            break;



            // if the intent is not found
        default:
            console.log("Intent not found in intentRounter")
            res.json(await responseHelper.responseBody("I am sorry , I did not get you"));
            break;
    }

});



module.exports = router;