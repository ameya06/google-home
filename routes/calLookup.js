var express = require('express');
var router = express.Router();
var graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment-timezone');
const accessToken = process.env.TOKEN;
const userName = process.env.NAME;
var output;


router.post('/', async function (req, res, next) {
    if (accessToken && userName) {
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });

        try {

               const respose = await client
                .api(`/me/onenote/sections/` + `${sectionId}` + `/pages`)
                .header("Content-Type", "text/html")
                .post(payload);


            console.log(respose)
            output = "Ok,I have noted that for you"
            res.json({
                'fulfillmentText': output
            });


            //console.log(req.body);
        } catch (err) {

            res.json({
                speech: "I am sorry , I didn't get that",
                displayText: `${err.code}: ${err.message}`,
                source: "microsoftAgent"

            });
            console.log(`${err.code}: ${err.message}`);
        }

    }
});

module.exports = router;