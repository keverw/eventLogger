require('./config.js');

var watchr = require('watchr');

watchr.watch({
	path: watchDir,
	listener: function(eventName,filePath,fileCurrentStat,filePreviousStat)
	{
		console.log('a watch event occured:', arguments);
	},
	next: function(err,watcher)
	{
		if (err) throw err;
		console.log('Watching for logs...');
	}
});