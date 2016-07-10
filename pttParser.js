var request 	= require('request-promise');
var cheerio 	= require('cheerio'); // Basically jQuery for node.js
var fs 			= require('fs-promise');
var sendChat 	= require('./sendChat.js');

var options = {
    uri: 'https://www.ptt.cc/bbs/Rent_apart/index.html',
    transform: function (body) {
        return cheerio.load(body);
    }
};
var houses = [];

var main = function(){
	request(options)
	    .then(function ($) {
	    	$('.title').each(function(i, el) {
	    		var title = $(this).text();
	    		if (title.indexOf('無') >= 0  && title.indexOf('北') >= 0){
	    			var item = new Object();
	    			item.title = title.trim();
	    			item.id = $(this).children().attr('href');
	    			houses.push(item);
	    		}
	    			
	    	})
	    })
	    .then(function(){
	    	fs.readFile('seen.txt', {encoding:'utf8'})
				.then(function(contents){
					var history = contents.split('\n');
					var newlist = houses.filter(function(house){
						return history.indexOf(house.id) == -1
					})
					if (newlist != []){
						sendChat(newlist);
						return fs.appendFile('seen.txt', newlist.map(function(info){return info.id}).join('\n'))
					}
				})
				.catch(function(error){
					console.log("Error: ",error)
				})
	    })
};

// run main if this file is directly executed.
if (require.main === module) {
	main(['testMessage']);
}

module.exports = main;


