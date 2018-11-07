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

// Slack api
var slackApiToken = 'xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7';


var postHelper = require('../services/postHelper')
var notificationHelper = require('../services/notificationsHelper')
var getImageHelper = require('../services/getImageHelper')
var createReminderHelper = require('../services/createReminderHelper')
var getMessageHelper = require('../services/getLastMessageHelper')



router.post('/', async function (req, res) {

    // if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    //     console.log("In intenRouter in token check failed")
    //     var output = "I am sorry.I did not get you"
    //     res.json(responseHelper.responseBody(output))
    // }
    switch (req.body.result.parameters.intent) {

        // calendar
        case "createCalendarHelper":
            res.json(await createCalendarHelper.scheduler(req))
            break;
        case "getCalendar":
            res.json(await getCalendarHelper.getCalendar(req))
            break;

            // Planner Task            
        case "getTask":
            res.json(await getTaskHelper.getTask(req))
            break;
        case "createTask":
            res.json(await addNotesHelper.createTask(req))
            break;

            // Notes    
        case "createNote":
            res.json(await createNoteHelper.createNote(req))
            break;
        case "addNote":
            res.json(await addNotesHelper.addNote(req))
            break;
        case "getNotes":
            res.send("Work in process")
            break;

            // Outlook Task   
        case "getOutlookTask":
            res.send(await getOutlookTaskHelper.getOutlookTask(req))
            break;
        case "createOutlookTask":
            res.send(await createOutlookTaskHelper.createOutlookTask(req))
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
     

            // Message    
        case "getMessage":
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