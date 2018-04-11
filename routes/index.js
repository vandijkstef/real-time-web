const express = require('express');
const router = express.Router();
const emoji = require('node-emoji');

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session.avatar);
	const data = {
		title: 'Chat'
	};
	if (req.session.avatar) {
		data.avatar = req.session.avatar;
	}
	data.emoji = emoji.search('');
	res.render('index', data);
});

module.exports = router;
