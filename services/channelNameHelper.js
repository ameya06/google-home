var request = require('request');

var channelId = (name) => {
    switch (name.toLowerCase()) {
        case "general":
            return "CCXKRKB6W"
            break;
        case "test":
            return "CCYADKQKE"
            break;
        case "random":
            return "CCWTQA60G"
            break;
        case "slackbot":
            return "DCXGL43UK"
            break;
        case "ameya":
            return "DCZ0Q5T5L"
            break;
        case "uma":
            return "DDMHN0YLV"
            break;
            //CDNP6GNSK
        case "images":
            return "CDNP6GNSK"
            break;
        case "ameya vdi":
            return "DD4J6LXUK"
            break;
    }

}


var channelNameID = (name) => {
    name = name.toLowerCase()



}




exports.channelId = channelId