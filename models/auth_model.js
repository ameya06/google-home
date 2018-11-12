const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authToken_Schema = new Schema({ 
    server:String,
    access_token:String,
    refresh_token:String,
    id_token:String,
    expires_at:String
});

const AuthToken = mongoose.model('authToken',authToken_Schema);

module.exports = AuthToken; 