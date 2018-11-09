var request = require('request');

var channelId = (name) => {
    switch (name.toLowerCase()) {
        case "general":
            return "CDY5D9PP1"
            break;
        case "random":
            return "CDWU8CTDJ"
            break;
        case "jon":
            return "DE0CK69K8"
            break;
        case "judith":
            return "DDY8J1KNU"
            break;
        case "kerry":
            return "DDZ0TR6KU"
            break;
        case "wendi":
            return "DDZ0TR9EW"
            break;
        case "slackbot":
            return "DE02AN955"
        case "jp":
            return "DDZ0TR490"
            break;
            //CDNP6GNSK

        default:
            console.log("Channel not found")
            return "CDY5D9PP1"
            break;
    }

}


var channelNameID = (name) => {
    name = name.toLowerCase()



}




exports.channelId = channelId