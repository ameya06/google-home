var graph = require('@microsoft/microsoft-graph-client');
const sectionId = "1-f50745bf-0f83-4f03-a3d5-d83377887c2f";
const responseHelper = require('../services/responseHelper')
const auth = require('../config/auth_setup')
var server = process.env.SERVER
var getnodeId = require('../config/nodeID')




var addNote = async function (req) {
    var pageId = await getnodeId.getNoteID();
    if (req.body.result.parameters.dev_token != process.env.DEVELOPER_ACCESS_TOKEN) {
    console.log("In createNoteHelper in token check failed")
    return responseHelper.responseBody(output)
}
const accessToken = await auth.getToken(server);
const userName = process.env.NAME;
if (accessToken && userName) {
    const client = graph.Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    })
    try {
 //getting latest page
            // const getlist = await client
            //     .api(`/me/onenote/pages`)
            //     .select("id")
            //     .top(1)
            //     .get();
                
            //console.log(getlist)   
            
    
            var message = req.body.result.parameters.notes
            var target = 'body'; //'ul:{c6143c48-2947-4689-a318-d67b4d139593}{36}';
            var content = '<ul><li>' + `${message}` + '</li></ul>';
            var payload = [

                {
                    'target': `${target}`,
                    'action': 'append',
                    'content': `${content}`
                }
            ]

            const respose = await client
                .api(`me/onenote/pages/` + `${pageId}` + `/content`)
                .patch(payload);


            //console.log(respose)
            output = "Ok,I have noted that for you"
           return responseHelper.responseBody(output)
        


        //console.log(req.body);
    } catch (err) {
        console.log('Error from  addNoteHelper'+`${err.code}: ${err.message}`);  
        var output = "I am sorry.I did not get you"
        return responseHelper.responseBody(output)
        
    }

} else {

    console.log('From addNoteHelper else ========>' + `${err.code}: ${err.message}`);
    var output = "I am sorry.I did not get you"
    return responseHelper.responseBody(output)
}

}


exports.addNote = addNote