let ws;

const CatchForms = function() {
	const forms = document.querySelectorAll('form');
	forms.forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			switch (e.target.id) {
			case 'register':
				console.log('registering new user');
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

const Socket = function() {
	if ('WebSocket' in window) {
		console.log('Starting Client Websocket');
		ws = new WebSocket('ws://' + window.location.hostname + ':30005');
		ws.onopen = function() {
			ws.send(SocketMessages.hi());
		};
		ws.onmessage = function(e) {
			try {
				// If this doesn't fail, we most likely received wsData from the server - Test all data and see what we need to update
				const wsData = JSON.parse(e.data);
				UpdateFront(wsData);
			} catch(err) {
				console.log(e.data);
			}
		};
	}
};

const SocketMessages = {
	hi: function() {
		return 'HI';
	}
};

const elements = {

};
const UpdateFront = (wsData) => {
	if (wsData.clients) {
		if (!elements.userAmount) {
			elements.userAmount = document.querySelector('.users .amount');
		}
		const clients = Object.keys(wsData.clients).length;
		if (elements.userAmount.innerText !== clients.toString()) {
			elements.userAmount.innerText = clients;
		}
	}
};


document.addEventListener('DOMContentLoaded', () => {
	CatchForms();
	Socket();
});