/**
* @project eventLogger client
* @version 0.1
* @url https://github.com/keverw/eventLogger
* @about A Node.js eventLogger client
**/

var genUuid = require('node-uuid');
var fs = require('fs');

function time()
{
  return Math.floor(new Date().getTime() / 1000);
}

var eventLogger = {
	logPath: null,
	init: function(path)
	{
		this.logPath = path;
	},
	_writeLog: function(level, category, sortCode, data)
	{
		if (!category)
		{
			category = '';
		}
		
		if (!sortCode)
		{
			sortCode = '';
		}
		
		if (this.logPath)
		{
			var uuid = genUuid.v4();
			
			var fileContents = JSON.stringify({
				uuid: uuid,
				level: level,
				time: time(),
				category: category,
				sortCode: sortCode,
				data: data
			});
			
			fs.writeFile(this.logPath + '/' + uuid + '.json', fileContents, 'utf8');
		}
	},
	info: function(data, category, sortCode)
	{
		return this._writeLog(2, category, sortCode, data);
	}
}

// Make a Node module, if possible.
if (typeof exports === 'object' && exports)
{
	module.exports = eventLogger;
}