let ws;

const CatchForms = () => {
	const forms = document.querySelectorAll('form');
	forms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			switch (e.target.id) {
			case 'register':
				console.log('registering new user');
				ws.send(SocketMessages.register(e.target));
				break;
			case 'chatmessage':
				console.log('Sending chat message');
				ws.send(SocketMessages.hi());
				break;
			default:
				console.warn('Form not implemented');
				break;
			}
		});
	});
};

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

const Socket = () => {
	if ('WebSocket' in window) {
		console.log('Starting Client Websocket');
		ws = new WebSocket('ws://' + window.location.hostname + ':30005');
		ws.onopen = () => {
			ws.send(SocketMessages.hi());
		};
		ws.onmessage = (e) => {
			try {
				// If this doesn't fail, we most likely received wsData from the server - Test all data and see what we need to update
				const wsData = JSON.parse(e.data);
				UpdateFront(wsData);
			} catch(err) {
				console.log(e.data);
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

const SocketMessages = {
	hi: () => {
		return 'HI';
	},
	register: (element) => {
		console.log(element);
		const value = element.querySelector('select[name=name]').value;
		return `REGISTER;ELEMENT:${value};`;
	}
};

const elements = {};
const InitUI = () => {
	CatchForms();
	SetButtons();
	if (!elements.new) {
		elements.new = document.querySelector('#new');
	}
	if (!elements.chat) {
		elements.chat = document.querySelector('#chat');
	}
	elements.chat.classList.add('hidden');
};
const UpdateFront = (wsData) => {
	console.log(wsData);
	if (wsData.clients) {
		if (!elements.userAmount) {
			elements.userAmount = document.querySelector('.users .amount');
		}
		const clients = Object.keys(wsData.clients).length;
		elements.userAmount.classList.remove('hidden');
		if (elements.offline) {
			elements.offline.classList.add('hidden');
		}
		if (elements.userAmount.innerText !== clients.toString()) {
			elements.userAmount.innerText = clients;
		}
	}
};
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
	}, 10000);
};

document.addEventListener('DOMContentLoaded', () => {
	InitUI();
	Socket();
});