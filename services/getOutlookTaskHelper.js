var express = require('express');
var router = express.Router();
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
const auth = require('../config/auth_setup')
var server = process.env.SERVER
const responseHelper = require('../services/responseHelper')
const planId = process.env.PLANID;
var filterHelper = require('../services/outlooktaskFilter')
const graphURL = `https://graph.microsoft.com/beta/me/outlook/tasks`
var getOutlookTask = async function (req,access_token) {

  if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    console.log("In getTaskHelper in token check failed")
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }
  const accessToken = access_token;
  const userName = process.env.NAME;
  if (accessToken && userName) {
    const client = graph.Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      }
    });
    try {
      //https://graph.microsoft.com/beta/me/outlook/tasks
      const respose = await client
        .api(`${graphURL}`)
        .get();

      if (req.body.result.parameters.task == "single") {
        output = "Hi " + userName.split(" ")[0] + " , your next outlook task is " + respose.value[0].subject;
        return responseHelper.responseBody(output)
      }
      if (req.body.result.parameters.task == "all") {
        var taskList = "";
        var len = Object.keys(respose.value).length;

        for (var i = 1; i <= 2; i++) {
          console.log(respose.value[i].subject)
          console.log('----------------------------------')

          taskList += " , " + respose.value[i].subject;
          // if (i == 2) break;
        }

        output = "Hi " + userName.split(" ")[0] + " , you have " + len + " tasks , and your next top tasks are " + "  " + respose.value[0].subject + taskList;

        return responseHelper.responseBody(output)
      }


    } catch (err) {
      console.log('Error in catch from getTaskHelper =======>' + `${err.code}: ${err.message}`)
      var output = "Hmm,I cannot see any task on your outlook"
      return responseHelper.responseBody(output)
    }

  } else {

    console.log("From else getTaskHelper =====>" + `${err.code}: ${err.message}`);
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }

}

exports.getOutlookTask = getOutlookTask;