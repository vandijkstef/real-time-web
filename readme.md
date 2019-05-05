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

## Deployment
Currently, I have no clue what will happen when I'm deploying this. We'll find out...

## Built With
These are the main packages used for this application. Please refer to `package.json` for a complete overview.
### Server side
* [Express-Generator](https://www.npmjs.com/package/express-generator) - Express base
* [Node WS](https://github.com/websockets/ws) - Socket.io is build on this
* [Express-Session](https://www.npmjs.com/package/express-sessions) - Also fetching the session from WebSocket
* [Node-Emoji by Omnidan](https://github.com/omnidan/node-emoji) - Emojis ❤️ 
### Client side
* [WebSocket](https://html.spec.whatwg.org/multipage/web-sockets.html) - Yes, the native one

## Contributing
Currently, no contributions are accepted. However, you are free to fork the project and build on it.

## Authors
* **Stef van Dijk** - *Initial work* - [vandijkstef](https://github.com/vandijkstef)
* **Zekkie** - *Readme suggestions* - [Zekkie](https://github.com/zekkie)

## Features
* Chat
* Select emoji-avatar
* Native WS

## License
This project is copyleft, all wrongs reversed. Have fun! *Note: This might not be true for dependencies*

## Acknowledgments
* Huge shoutout to the Coffee Bar on the HvA ☕️

---

## Todo/proposal
* Chatrooms
* Private messaging
* Save to session method