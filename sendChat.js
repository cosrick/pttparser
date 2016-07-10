var login = require("facebook-chat-api");


var main = function(houselist){

	var to = "100000207901749";


	login({email: "rick830620@gmail.com", password: "rick83062"}, function callback(err, api) {
		if(err) return console.error(err);

		return houselist.forEach(function(house){
			var message = house.title + " https://www.ptt.cc" + house.id
			api.sendMessage(message, to);
		})
	});

}

// run main if this file is directly executed.
if (require.main === module) {
	main(['testMessage']);
}

module.exports = main;



