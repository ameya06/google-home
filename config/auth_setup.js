var AuthToken = require('../models/auth_model')
var auth_token = ''

module.exports = {
    saveToken: (auth_token) => {
        return AuthToken.findOne({
            server: process.env.SERVER
        }).then((currentServer) => {
            if (currentServer) {
                AuthToken.updateOne({
                    server: process.env.SERVER,
                    $set: {
                        token: auth_token
                    }
                }).then((updatedAuth) => {
                    console.log('Updated Auth')
                    return null
                }).catch((err) => {
                    console.log('Error while updating auth =====> ' + err)
                    return null
                })

            } else {
                new AuthToken({
                    server: process.env.SERVER,
                    token: auth_token
                }).save().then((newAuth) => {
                    console.log('new auth created')
                    return null
                }).catch((err) => {
                    console.log('Error while saving =====>' + err)
                    return null
                })
            }
        })
    },


    getToken: async (server) => {
        return AuthToken.findOne({
            server: process.env.SERVER
        }).then((currentServer) => {
            return currentServer.token
        }).catch((err) => {
            console.log("Issue in catch" + err)
        })
    }
}