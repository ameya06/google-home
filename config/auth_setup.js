var AuthToken = require('../models/auth_model')
var auth_token = ''

module.exports = {
    saveToken: (token) => {
        var access_token = token.token.access_token
        var refresh_token = token.token.refresh_token
        var id_token = token.token.id_token
        var expires_at = token.token.expires_at

        return AuthToken.findOne({
            server: process.env.SERVER
        }).then((currentServer) => {
            if (currentServer) {
                AuthToken.updateOne({
                    server: process.env.SERVER,
                    $set: {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        id_token: id_token,
                        expires_at: expires_at
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
                    access_token: access_token,
                    refresh_token: refresh_token,
                    id_token: id_token,
                    expires_at: expires_at
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
            return currentServer
        }).catch((err) => {
            console.log("Issue in catch" + err)
        })
    }
}