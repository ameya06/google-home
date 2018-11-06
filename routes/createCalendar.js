// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var createCalendarHelper = require('../services/createCalendarHelper');



router.post('/', async function (req, res, next) {
    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        console.log("In createCalendar in token check failed")
        output = "I am sorry.I did not get you"
        return {
            'fulfillmentText': `${output}`
          }
    }
    res.send(await createCalendarHelper.scheduler(req))
});


module.exports = router;