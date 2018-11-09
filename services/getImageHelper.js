var EmitUrlapp = require('../app')
const request = require('request');
var url = 'https://slack.com/api/files.list?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&pretty=1'
var imageurl = 'https://slack.com/api/channels.history?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&channel=CDNP6GNSK&pretty=1'
var scrape = require('html-metadata');
var responseHelper = require('../services/responseHelper')
var cache = require('memory-cache');
var images = []
const delay = require('delay');
var stopflag = false


var getLastImage = async () => {
    stopflag = true
    return new Promise(function (resolve, reject) {
        var option = {
            url: imageurl,
            json: true
        }
        request.get(option, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            //var len = Object.keys(body).length;
            cache.put('imageDisplayed', 0);
            var makeExternaldata = makeExternal(body.messages[0].files[0].id)
            console.log(makeExternaldata) //.messages[0].files[0].permalink_public)
            //makeExternal(body.messages[0].files[0].id)
            var imageUrl = (body.messages[0].files[0].permalink_public);
            // scrape for metadata

            scrape(imageUrl).then(function (metadata) {
                console.log(metadata.openGraph.image.url);
                EmitUrlapp.EmitUrl(metadata.openGraph.image.url)
            })
            resolve(responseHelper.responseBody('Ok , I have pulled that for you on screen'))
            //sendUrl(body.files[0].permalink_public)
        })
    })

}

var getFirstImage = async () => {
    stopflag = true
    return new Promise(function (resolve, reject) {
        var option = {
            url: imageurl,
            json: true
        }
        request.get(option, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            var len = Object.keys(body.messages).length - 1;
            cache.put('imageDisplayed', len);
            console.log("From cahce --->" + cache.get('imageDisplayed'))
            var makeExternaldata = makeExternal(body.messages[len].files[0].id)

            console.log(makeExternaldata)
            var imageUrl = (body.messages[len].files[0].permalink_public);
            // scrape for metadata

            scrape(imageUrl).then(function (metadata) {
                console.log(metadata.openGraph.image.url);

                EmitUrlapp.EmitUrl(metadata.openGraph.image.url)
            })
            resolve(responseHelper.responseBody('Ok , I have pulled that for you on screen'))
            //sendUrl(body.files[0].permalink_public)
        })
    })

}

var startPresentation = async () => {
    stopflag = false
    return new Promise(function (resolve, reject) {
        var option = {
            url: imageurl,
            json: true
        }
        request.get(option, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            var len = Object.keys(body.messages).length - 1;
           presentation(len) 

           async function presentation(i) {
                  if(stopflag) return
               
                setTimeout(function () {
                    console.log(i+" tets")
                    var makeExternaldata = makeExternal(body.messages[i].files[0].id)
                    console.log(makeExternaldata)
                    var imageUrl = (body.messages[i].files[0].permalink_public);
                    // scrape for metadata
                    if(stopflag) return
                    scrape(imageUrl).then(function (metadata) {
                        console.log(metadata.openGraph.image.url)
                        images.push(metadata.openGraph.image.url)
                        EmitUrlapp.EmitUrl(metadata.openGraph.image.url)
                    })
                    if (i <= 0) i = len ; 
                    if(stopflag) return
                    presentation(--i);

                    console.log("--i "+i)
                }, 3000);
            }
            

            // cache.put('imageDisplayed', len);

            resolve(responseHelper.responseBody('Ok , I have started the presentation '))
            //sendUrl(body.files[0].permalink_public)
        })
    })

}

var getPreviousImage = async () => {
    var currentImage = cache.get('imageDisplayed')
    var nextImage = currentImage + 1
    return new Promise(function (resolve, reject) {
        var option = {
            url: imageurl,
            json: true
        }
        request.get(option, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            var len = Object.keys(body.messages).length - 1;
            console.log("Lenth of the image " + len)
            console.log("Lenth of in cache image " + currentImage)
            console.log("Lenth of in next image " + nextImage)
            // check if next is there 
            if (len < nextImage) {
                console.log("break")
                resolve(responseHelper.responseBody('I am sorry , There no previous images '))
                return
            }

            var makeExternaldata = makeExternal(body.messages[nextImage].files[0].id)
            console.log(makeExternaldata) //.messages[0].files[0].permalink_public)
            //makeExternal(body.messages[0].files[0].id)
            var imageUrl = (body.messages[nextImage].files[0].permalink_public);
            // scrape for metadata

            scrape(imageUrl).then(function (metadata) {
                console.log(metadata.openGraph.image.url);
                EmitUrlapp.EmitUrl(metadata.openGraph.image.url)
            })
            cache.put('imageDisplayed', nextImage.valueOf());
            resolve(responseHelper.responseBody('Ok , I have pulled that for you on screen'))
            //sendUrl(body.files[0].permalink_public)
        })
    })

}

var getNextImage = async () => {
    var currentImage = cache.get('imageDisplayed')
    var nextImage = currentImage - 1
    return new Promise(function (resolve, reject) {
        var option = {
            url: imageurl,
            json: true
        }
        request.get(option, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            var len = Object.keys(body.messages).length - 1;
            console.log("Lenth of the image " + len)
            console.log("Lenth of in cache image " + currentImage)
            console.log("Lenth of in next image " + nextImage)
            // check if next is there 
            if (len < nextImage) {
                console.log("break")
                resolve(responseHelper.responseBody('I am sorry , There no next images '))
                return
            }

            var makeExternaldata = makeExternal(body.messages[nextImage].files[0].id)
            console.log(makeExternaldata) //.messages[0].files[0].permalink_public)
            //makeExternal(body.messages[0].files[0].id)
            var imageUrl = (body.messages[nextImage].files[0].permalink_public);
            // scrape for metadata

            scrape(imageUrl).then(function (metadata) {
                console.log(metadata.openGraph.image.url);
                EmitUrlapp.EmitUrl(metadata.openGraph.image.url)
            })
            cache.put('imageDisplayed', nextImage.valueOf());
            resolve(responseHelper.responseBody('Ok , I have pulled that for you on screen'))
            //sendUrl(body.files[0].permalink_public)
        })
    })

}
var stopPresentation = async () => {
    stopflag = true
    EmitUrlapp.EmitUrl("images/resized.png")
   // stopflag = false
    return responseHelper.responseBody('Ok , I have stopped the presentation')

}

var getHomeImage = async () => {
    stopflag = true
    EmitUrlapp.EmitUrl("images/resized.png")
    return responseHelper.responseBody('Ok , I have closed the image')

}

var getTestImage = async () => {
    console.log(cache.get('imageDisplayed'))
    EmitUrlapp.EmitUrl("https://files.slack.com/files-pri/TCXKRK0KU-FDSGRLWTE/creds.png?pub_secret=7346d05fe8")
    return responseHelper.responseBody('Ok , I have pulled test the imagaes')
}

var makeExternal = (id) => {

    urlpost = 'https://slack.com/api/files.sharedPublicURL?token=xoxp-439671646674-439671647266-461021596227-f03dedfb5cb1af530024a7ced96eade7&file=' + `${id}` + '&pretty=1'
    request({
        url: urlpost,
        method: "POST",
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    })
}




exports.startPresentation = startPresentation
exports.getTestImage = getTestImage
exports.getHomeImage = getHomeImage
exports.getFirstImage = getFirstImage
exports.getLastImage = getLastImage
exports.getNextImage = getNextImage
exports.getPreviousImage = getPreviousImage
exports.stopPresentation = stopPresentation