// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var router = express.Router();
var getTaskHelper = require('../services/getTaskHelper');

router.post('/', async function (req, res, next) {

    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        res.send("Auth failed")
    }
    res.send(await getTaskHelper.getTasks(req))

});
module.exports = router;