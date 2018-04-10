const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const fs = require('fs');

// Setup websocket
const ws = require('ws').Server;
const wss = new ws({port: 30005});

const wsData = { // Yes, this will be cleared on restart
	clients: {}
};

const WSbroadcast = (data, ws, wss) => {
	wss.clients.forEach(function each(client) {
		if (client !== ws && client.readyState === ws.OPEN) {
			client.send(data);
		}
	});
};

wss.on('connection', (ws, req) => {
	// Fetch session
	const value = '; ' + req.headers.cookie;
	const parts = value.split('; ' + 'connect.sid' + '=');
	const sessionID = parts.pop().split(';').shift().replace('s%3A', '').split('.').shift();
	const sessionsFile = './sessions/' + sessionID + '.json';
	const session = JSON.parse(fs.readFileSync(sessionsFile, {
		encoding: 'utf8'
	}));
	if (wsData.clients[sessionID] === undefined) {
		wsData.clients[sessionID] = {
			id: sessionID
		};
	}
	// Edit the session
	session.touchedByWS = true;
	
	// Write the session back - Note, this is a sync operation
	fs.writeFileSync(sessionsFile, JSON.stringify(session));
	
	// Within this message, we probably know jack-shit about the actual user that has been sending this message.
	// Or is this actuall kept?
	ws.on('message', (message) => {
		// Tell the terminal we got a message
		console.log('received', message);
		if (message === 'HI') {
			// Say hello to the client, be nice
			ws.send('Hello client: ' + sessionID);
			// Also, give the client the data
			ws.send(JSON.stringify(wsData));
			// And broadcast that global data to all clients
			WSbroadcast(JSON.stringify(wsData), ws, wss);
		}
	});

	ws.on('close', () => {
		console.log('Disconnected: ' + sessionID);
		// TODO: Remove key from active client list
	});
});

// Setup Express App
const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add session support
app.use(session({
	secret: 'ufph93nc',
	store: new FileStore(),
	saveUninitialized: true,
	resave: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
