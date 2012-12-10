require('./config.js');

var watchr = require('watchr');

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

watchr.watch({
	path: watchDir,
	listener: function(eventName,filePath,fileCurrentStat,filePreviousStat)
	{
		if (eventName == 'new')
		{
			var ext = getExtension(filePath);
			
			console.log(ext);
			
			console.log('new log in ' + filePath);
		}
		console.log('a watch event occured:', arguments);
	},
	next: function(err,watcher)
	{
		if (err) throw err;
		console.log('Watching for logs...');
	}
});