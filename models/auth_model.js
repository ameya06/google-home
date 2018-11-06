const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authToken_Schema = new Schema({ 
    server:String,
    token:String
});

const AuthToken = mongoose.model('authToken',authToken_Schema);

module.exports = AuthToken; 