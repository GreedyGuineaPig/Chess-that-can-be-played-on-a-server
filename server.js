const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
var playerNum = 0

app.get('/', (req, res) => {
        if(playerNum == 0){
                res.sendFile(__dirname + '/chessW.html');
        }else{
                res.sendFile(__dirname + '/chessB.html');                
        }
        playerNum = (playerNum + 1) % 2;
        console.log(playerNum)
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('move', (move) => {
    console.log("move", move.from + "-" + move.to)
    io.emit('move', move);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
