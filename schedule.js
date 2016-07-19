
var CronJob = require('cron').CronJob;
var timeZone= "Asia/Singapore";
var ptt 	= require('./pttParser.js');

new CronJob('0 4,10,16,22,28,34,40,46,52,58  * * * *', function () { ptt() }, null, true, timeZone); 
