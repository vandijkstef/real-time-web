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
		const ws = new WebSocket('ws://' + window.location.hostname + ':30005');
		ws.onopen = function() {
			ws.send(SocketMessages.hi()); // How about pushing the session ID here?
		};
		ws.onmessage = function(e) {
			console.log(e.data);
		};
	}
};

const SocketMessages = {
	hi: function() {
		return 'HI';
	}
};


document.addEventListener('DOMContentLoaded', () => {
	CatchForms();
	Socket();
});