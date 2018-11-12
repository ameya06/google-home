var graph = require('@microsoft/microsoft-graph-client');
const sectionId = "1-f50745bf-0f83-4f03-a3d5-d83377887c2f";
const responseHelper = require('../services/responseHelper')
const auth = require('../config/auth_setup')
var server = process.env.SERVER
var saveNoteID = require('../config/nodeID')




var createNote = async function (req,access_token) {

    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
        console.log("In createNoteHelper in token check failed")
        return responseHelper.responseBody("I am sorry.I did not get you")
    }
    const accessToken = access_token;
    const userName = process.env.NAME;
    if (accessToken && userName) {
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        })
        try {
            var meetingTitle = req.body.result.parameters.meetingTitle
            var body = req.body.result.parameters.notes
            var payload = "<html><head><title>" + `${meetingTitle}` + "</title></head><body><ul><li>" + `${body}` + "</li></ul></body></html>"

            const respose = await client
                .api(`/me/onenote/sections/` + `${sectionId}` + `/pages`)
                .header("Content-Type", "text/html")
                .post(payload);


            console.log(respose)
            saveNoteID.saveNoteId(meetingTitle,respose.id)
            output = "Ok,I have noted that for youOk,I have noted that for you,If want to add more notes, you can say , add more note , add more "
            return responseHelper.responseBody(output)



            //console.log(req.body);
        } catch (err) {
            console.log('Error from  createNoteHelper' + `${err.code}: ${err.message}`);
            var output = "I am sorry.I did not get you"
            return responseHelper.responseBody(output)

        }

    } else {

        console.log('From createNoteHelper else ========>' + `${err.code}: ${err.message}`);
        var output = "I am sorry.I did not get you"
        return responseHelper.responseBody(output)
    }

}


exports.createNote = createNote