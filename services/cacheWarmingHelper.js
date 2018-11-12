const auth = require('../config/auth_setup')
var server = process.env.SERVER
var cache = require('memory-cache');

var cacheWarming = async() => {

    var tokens =  await auth.getToken(server);
    //console.log(tokens+"all tokens")
    cache.put('access_token', tokens.access_token)
    cache.put('refresh_token', tokens.refresh_token);
    cache.put('expires_time', tokens.expires_at)
    console.log('Cache is warmend')
    
  
}

exports.cacheWarming = cacheWarming