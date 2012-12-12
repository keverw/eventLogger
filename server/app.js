require('./config.js');

var watchr = require('watchr');
var fs = require('fs');
var revolver = require('revolver');
var mysql = require('mysql');

var alreadyFiles = fs.readdirSync(watchDir);

function getTimeStamp()
{
    var currentTime = new Date();

    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    var string = month + "/" + day + "/" + year;

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    string += ' ' + hours + ":" + minutes + ":" + seconds + ' ';
    
    string += (hours > 11) ? 'PM' : 'AM';
     
    return string;
}

function handleDisconnect(connection) //prevent crash on disconnect
{
	connection.on('error', function(err)
	{
		if (!err.fatal)
		{
			return;
		}

		if (err.code !== 'PROTOCOL_CONNECTION_LOST')
		{
			throw err;
		}
	});
}

for (var i=0; i < maxConnections; i++)
{
	var connection = mysql.createConnection(dbConfig);
	handleDisconnect(connection);
	connection.connect();
	revolver.add(connection);
}

function processFile(fullPath)
{
	fs.readFile(fullPath, 'utf8', function (err, data)
	{
		if (err) throw err;
		
		var dataOBJ = JSON.parse(data);

		var encodedData = JSON.stringify(dataOBJ.data);

		revolver.fire(function(id, bullet)
		{
			//_fatalError
			fatalErrorObj = bullet._protocol._fatalError;
			
			if (typeof fatalErrorObj == 'object' && fatalErrorObj != null && fatalErrorObj.code == 'PROTOCOL_CONNECTION_LOST')
			{
				var connection = mysql.createConnection(dbConfig);
				handleDisconnect(connection);
				connection.connect();
				revolver.add(connection, id);
				processFile(fullPath);
			}
			else
			{
				var query = bullet.query('INSERT INTO events SET ?', {
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
			}
		});
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
				console.log(getTimeStamp() + ': New log: ' + filePath);
			}
		}
	},
	next: function(err,watcher)
	{
		if (err) throw err;
		console.log(getTimeStamp() + ': Watching for logs...');
	}
});