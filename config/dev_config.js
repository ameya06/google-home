var dbuser = process.env.DBUSER
var dbpassword = process.env.DBPASSWORD

module.exports={

mongodb:{
    
    dbURI:'mongodb://'+`${dbuser}`+':'+`${dbpassword}`+'@ds131903.mlab.com:31903/microsoftagent_oauth_dev'
}


};