const express = require('express');
const router = express.Router();
const emoji = require('node-emoji');

/* GET home page. */
router.get('/', function(req, res) {
	console.log();
	res.render('index', { 
		title: 'Chat',
		emoji: emoji.search('')
	});
});

module.exports = router;
