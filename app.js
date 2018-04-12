const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('static'));

io.on("connect", function(socket) {
	console.log("connected")
	socket.on('send', function(d) {
		socket.broadcast.emit("rcv", {message: d.message})
	});
});

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

server.listen(80, function() {
	console.log("Server running on default Port: 80")
});