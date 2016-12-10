
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());                                                                                                                
app.use(bodyParser.urlencoded({extended: true}));      

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next(); 
});

var messages = [];
var calls = 0;

app.get('/message', function(req, res){
  res.send(messages);
  calls++;
   console.log(calls);
});

app.post('/message', function(req, res){
 messages.push(req.body);
});

io.on('connection', function(socket){
     socket.broadcast.emit('hi');
 
var messagesSocket = [];

  socket.on('chat message', function(msg){
      messagesSocket.push(msg);
      io.emit('chat message', msg);
            calls++;
      console.log(calls);
  });


  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(80, function(){
  console.log('listening on *:3000');
});