//var socket = io.connect('http://localhost:8000');
var socket = io();
const Http = new XMLHttpRequest();
var image = document.getElementById("img")


function ReplacingImage(url) {
    console.log("inside replaing url")
    document.getElementById("img").src = url
   
}

socket.on('image', function (data) {
    console.log("inside") 
   console.log(data);
   document.getElementById("img").src = data.url
});

// setInterval(socket.on('image', function (data) {
//     console.log("inside") 
//    console.log(data.url);
//    document.getElementById("x").src = data.url
// }), 350);