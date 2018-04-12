# Socket Chat
Chat application to understand the working of websockets.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
This project assumes you are familiar with NodeJS (`9.11.1`) and NPM (`5.6.0`), and have those installed. Client side you would need a browser that supports `JS ES6 Modules` and `WebSocket`.

### Code style
All JS should conform to the eslint config thats included. Please make sure ESlint is functional in your code editor and the supplied config is being used.

### Installing and running
Getting the application running is straightforward. First make sure you have installed all modules:
```
npm install
```

Afterwards you can start the app by using:
```
npm start
```

Additionally, you can watch the project by using, assuming you have nodemon (`1.12.1`) installed:
```
npm run watch
```

## Todo/proposal
* Chatrooms
* Private messaging

## Deployment
Currently, I have no clue what will happen when I'm deploying this. We'll find out...

## Built With
* [Express-Generator](https://www.npmjs.com/package/express-generator) - Express base
* [Node WS](https://github.com/websockets/ws) - Socket.io is build on this
* [WebSocket](https://html.spec.whatwg.org/multipage/web-sockets.html) - Yes, the native one

## Contributing
Currently, no contributions are accepted. However, you are free to fork the project and build on it.

## Authors
* **Stef van Dijk** - *Initial work* - [vandijktef](https://github.com/vandijkstef

## Features
* Select nation flag
* Chat
* Native WS

## Dependencies
* Cookieparser
* WS 
* EJS
* Express
* Express-Session
* Http-errors
* Morgan
* Node-emoji
* Node-sass-Middleware
* Session-file-store

## License
This project is copyleft, all wrongs reversed. Have fun!

## Acknowledgments
* Huge shoutout to the Coffee Bar on the HvA

---

* Do something on connection close? Try to rebuild the connection?
* Save to session method