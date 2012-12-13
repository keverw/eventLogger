var genUuid = require('node-uuid');

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
			
			console.log(uuid);
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