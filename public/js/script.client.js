let ws;

/// FORMS ///
// Catch all form submissions and hook up the actions needed
const CatchForms = () => {
	const forms = document.querySelectorAll('form');
	forms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			switch (e.target.id) {
			case 'register':
				console.log('Registering user avatar');
				ws.send(SocketMessages.register(e.target));
				break;
			case 'chatmessage':
				console.log('Sending chat message');
				ws.send(SocketMessages.message(document.querySelector('input[name=message]').value));
				break;
			default:
				console.warn('Form not implemented');
				break;
			}
		});
	});
};

/// BUTTONS ///
// Set all non-submit buttons
const SetButtons = () => {
	const buttonRandom = document.querySelector('#register button');
	if (buttonRandom) {
		buttonRandom.addEventListener('click', randomizeEmoji);
		buttonRandom.click();
	}
};

const randomizeEmoji = (e) => {
	e.preventDefault();
	const emojiSelect = document.querySelector('select#name');
	if (emojiSelect) {
		emojiSelect.value = emojiSelect.options[Math.floor(Math.random() * emojiSelect.options.length)].value;
	}
};

/// SOCKET ///
// The socket, the whole socket and nothing but the socket
const Socket = () => {
	if ('WebSocket' in window) {
		console.log('Starting Client Websocket');
		let host = location.origin.replace(/^http/, 'ws');
		// ws = new WebSocket('ws://' + window.location.hostname + ':30005');
		// if (location.hostname === 'localhost') {
		// 	host = host + '5';
		// }
		ws = new WebSocket(host);
		ws.onopen = () => {
			ws.send(SocketMessages.hi());
		};
		ws.onmessage = (e) => {
			try {
				const data = JSON.parse(e.data);
				if (data.msg) {
					ReceiveChatMessage(data);
				} else {
					UpdateFront(data);
				}
			} catch(err) {
				const action = e.data.split(':')[0];
				const param = e.data.split(':')[1];
				switch (action) {
				case 'registered':
					EnableChat(param);
					break;
				
				default:
					console.log(e.data);
					break;
				}
			}
		};
		ws.onclose = () => {
			console.log('Socket connection closed, retrying');
			UIOffline();
		};
		ws.onerror = () => {
			console.log('Woops, we got a Socket error.');
		};
	}
};

// Standardize socket messages
const SocketMessages = {
	hi: () => {
		return 'HI';
	},
	register: (element) => {
		const value = element.querySelector('select[name=name]').value;
		return `REGISTER;ELEMENT:${value};`;
	},
	message: (msg) => {
		return `MESSAGE;CHAT:${msg};`;
	}
};

/// UI ///
// Memstore elements
const elements = {};

// Initialize UI
const InitUI = () => {
	CatchForms();
	SetButtons();
	let avatar;
	if (document.querySelector('input[name=avatar]')) {
		avatar = {
			avatar: document.querySelector('input[name=avatar]').value,
			emoji: document.querySelector('input[name=emoji]').value,
		};
	}
	if (!elements.new) {
		elements.new = document.querySelector('#new');
	}
	if (!elements.chat) {
		elements.chat = document.querySelector('#chat');
	}
	elements.chat.classList.add('hidden');

	if (avatar && avatar.avatar && avatar.emoji) {
		EnableChat(avatar.emoji);
	}
};

// Update front using wsData from server
const UpdateFront = (wsData) => {
	if (wsData.clients) {
		if (!elements.userAmount) {
			elements.userAmount = document.querySelector('.users .amount');
		}
		if (!elements.isare) {
			elements.isare = document.querySelector('.isare');
		}
		const clients = Object.keys(wsData.clients).length;
		elements.userAmount.classList.remove('hidden');
		if (elements.offline) {
			elements.offline.classList.add('hidden');
		}
		if (elements.userAmount.innerText !== clients.toString()) {
			elements.userAmount.innerText = clients;
			if (clients === 1) {
				elements.isare.innerText = 'is';
			} else {
				elements.isare.innerText = 'are';
			}
		}
	}
};

// Set UI to offline, try to reconnect
const UIOffline = () => {
	if (!elements.offline) {
		elements.offline = document.querySelector('section#meta .offline');
	}
	if (elements.userAmount) {
		elements.userAmount.classList.add('hidden');
	}
	elements.offline.classList.remove('hidden');
	setTimeout(() => {
		Socket();
	}, 5000);
};

// Hide the new window and show the chat
const EnableChat = (emoji) => {
	document.querySelector('#userAvatar').innerText = emoji;
	elements.new.classList.add('hidden');
	elements.chat.classList.remove('hidden');
};

// Handle an incoming chat message
const ReceiveChatMessage = (msgData) => {
	console.log(msgData);
	if (!elements.chatInput) {
		elements.chatInput = document.querySelector('input[name=message]');
	}
	if (!elements.chatUl) {
		elements.chatUl = document.querySelector('#chat ul');
	}
	const chatLi = document.createElement('li');

	const avatar = document.createElement('span');
	avatar.classList.add('avatar');
	avatar.innerText = msgData.user.emoji;
	chatLi.appendChild(avatar);

	// const msgText = document.createElement('span');
	// msgText.classList.add('message');
	// msgText.classList.add('plaintext');
	// msgText.innerText = msgData.msg;
	// chatLi.appendChild(msgText);

	const msgEmoji = document.createElement('span');
	msgEmoji.classList.add('message');
	msgEmoji.classList.add('emojitext');
	msgEmoji.innerText = msgData.emojified;
	chatLi.appendChild(msgEmoji);

	if (msgData.yours) {
		elements.chatInput.value = '';
		chatLi.classList.add('yours');
	}
	elements.chatUl.appendChild(chatLi);
	elements.chatUl.scrollTop = elements.chatUl.scrollHeight;
};

document.addEventListener('DOMContentLoaded', () => {
	InitUI();
	Socket();
});