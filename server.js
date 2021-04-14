const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var playerNum = 0
var allClients = []

app.get('/', (req, res) => {
        if(playerNum == 0){
                res.sendFile(__dirname + '/chessW.html');
                
        }else{
                res.sendFile(__dirname + '/chessB.html');                
        }
        // The first client becomes a white side.
        playerNum = (playerNum + 1) % 2
        console.log(playerNum)
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // allClients.push(socket)
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // var i = allClients.indexOf(socket);
    //   allClients.splice(i, 1);
    //   allClients.forEach(client => {
    //     client.emit("disconnect")
    //   });
  });
  socket.on('move', (move) => {
    // send movement to opponent.
    console.log("move", move.from + "-" + move.to)
    io.emit('move', move);
  });
  socket.on("chat message", (msg) =>{
        io.emit("chat message", msg);
        console.log(msg)
  });
});

http.listen(3000, () => {
  // URL:  http://localhost:3000
  console.log('listening on *:3000');
});
