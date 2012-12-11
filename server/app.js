require('./config.js');

var watchr = require('watchr');
var fs = require('fs');

var alreadyFiles = fs.readdirSync(watchDir);

var mysql = require('mysql');

var connection = mysql.createConnection(dbConfig);

connection.connect();

function processFile(file)
{
	console.log('File: ' + file);
}

function getExtension(filename)
{
	var i = filename.lastIndexOf('.');
	return (i < 0) ? '' : filename.substr(i);
}

for (var name in alreadyFiles)
{
	var file = alreadyFiles[name];

	if (getExtension(file) == '.json')
	{
		processFile(file);
	}
}

delete alreadyFiles;

watchr.watch({
	path: watchDir,
	listener: function(eventName, filePath, fileCurrentStat, filePreviousStat)
	{
		if (eventName == 'new')
		{
			if (getExtension(filePath) == '.json')
			{
				processFile(file);
			}
		}
	},
	next: function(err,watcher)
	{
		if (err) throw err;
		console.log('Watching for logs...');
	}
});