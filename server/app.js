require('./config.js');

var watchr = require('watchr');
var fs = require('fs');

var alreadyFiles = fs.readdirSync(watchDir);

var mysql = require('mysql');

function processFile(fullPath)
{
	fs.readFile(fullPath, 'utf8', function (err, data)
	{
		if (err) throw err;
		
		var connection = mysql.createConnection(dbConfig);

		connection.connect();
		
		var dataOBJ = JSON.parse(data);

		var encodedData = JSON.stringify(dataOBJ.data);

		var query = connection.query('INSERT INTO events SET ?', {
			uuid: dataOBJ.uuid,
			data: encodedData,
			category: dataOBJ.category,
			sortCode: dataOBJ.sortCode,
			logLevel: dataOBJ.level,
			unixTimeStamp: dataOBJ.time
		}, function(err, result) {
			if (!err)
			{
				fs.unlink(fullPath);
			}
  		});
  		
  		connection.end();
	});
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
		processFile(watchDir + '/' + file);
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
				processFile(filePath);
				console.log('New log: ' + filePath);
			}
		}
	},
	next: function(err,watcher)
	{
		if (err) throw err;
		console.log('Watching for logs...');
	}
});