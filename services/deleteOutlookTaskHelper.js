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
var deleteOutlookTask = async function (req) {

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
      //https://graph.microsoft.com/beta/me/outlook/tasks
      const respose = await client
        .api(`${graphURL}`)
        .get();

       //await deleteTask(respose.value[0].id)
       var data = await client
        .api(`${graphURL}`+"/"+respose.value[0].id)
        .delete();
      
     output = "Ok, I have you removed the task for you ";

        return responseHelper.responseBody(output)


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

var deleteTask = async(id)=>{
    return await client
        .api(`${graphURL}`+id)
        .delete();
           
}



exports.deleteOutlookTask  = deleteOutlookTask ;