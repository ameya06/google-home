var getNotesView = '../views/getNotesView'
var responseHelper = require('../services/responseHelper') 

var getNotes = async(req)=> {
     console.log("Inside getNotes")
  // res.render(getNotesView)
   var output = "Sure , I will displayed that on your screen "
   return responseHelper.responseBody(output);
}

exports.getNotes=getNotes