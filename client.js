const stdin = process.stdin;
const io = require("socket.io-client");
const readline = require('readline');
const util = require('util');
const socket = io.connect('http://127.0.0.1')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})


function console_out(msg) {
	readline.clearLine(process.stdout);
    readline.cursorTo(0);
    console.log(msg);
    rl.prompt(true);
}


rl.on('line', function(l) {
	socket.emit('send',{message: l})
	rl.prompt(true)
})


socket.on("rcv", function(d) {
	console_out(d.message+" t")
})