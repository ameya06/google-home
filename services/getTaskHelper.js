var express = require('express');
var router = express.Router();
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
const auth = require('../config/auth_setup')
var server = process.env.SERVER
const responseHelper = require('../services/responseHelper')
const planId = process.env.PLANID;
var getTask = async function (req) {

  if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    console.log("In getTaskHelper in token check failed")
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
    try {
      const respose = await client
        .api(`/planner/plans/` + `${planId}` + `/tasks`)
        .get();

      if (req.body.result.parameters.task == "single") {
        output = "Hi " + userName.split(" ")[0] + " , your next task is to " + respose.value[0].title;
        return responseHelper.responseBody(output)
      }
      if (req.body.result.parameters.task == "all") {
        var taskList = "";
        var len = Object.keys(respose.value).length;

        for (var i = 1; i < len; i++) {
          taskList += " , " + respose.value[i].title;
          console.log(respose.value[i].title)


          if (i == 2) break;
        }

        output = "Hi " + userName.split(" ")[0] + " , you have " + len + " tasks , and your next top tasks are " + "  " + respose.value[0].title + taskList;

        return responseHelper.responseBody(output)
      }


    } catch (err) {
      console.log('Error in catch from getTaskHelper =======>' + `${err.code}: ${err.message}`)
      var output = "I am sorry.I did not get you"
      return responseHelper.responseBody(output)
    }

  } else {

    console.log("From else getTaskHelper =====>" + `${err.code}: ${err.message}`);
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
  }

}

exports.getTask = getTask;