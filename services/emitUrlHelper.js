var EmitUrl =  () => {
    io.on('connect', (socket) => {
    //  console.log(socket)
      socket.emit('image', {
        url: 'https://slack-files.com/TCXKRK0KU-FDJFNK0RX-c62b988b8e'
      })
    })
  }

exports.EmitUrl= EmitUrl