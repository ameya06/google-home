var filter = async(rawdata)=>{
  var data ;
  var rawdata = rawdata
  
  for(var i = 0; i < rawdata.length; i++) {
       if(rawdata.status!="Completed")
       data += json[i];   
}  

return data
    

}

exports.filter = filter 