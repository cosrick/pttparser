var login = require("facebook-chat-api");

var to;
var words = [];

process.argv.forEach(function (val, index, array) {
	if (index == 2){
		to = val
	}else if (index > 2){
		words.push(val)
	}
});

var message = words.join(' ')

login({email: "rick830620@gmail.com", password: "rick83062"}, function callback (err, api) {
	if(err) return console.error(err);
	api.sendMessage(message, to);
});