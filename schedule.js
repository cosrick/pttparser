
var CronJob = require('cron').CronJob;
var timeZone= "Asia/Singapore";
var ptt 	= require('./pttParser.js');

new CronJob('0 */2  * * * *', function () { ptt() }, null, true, timeZone); 
