#eventLogger v1#

eventLogger aims to be a event log collector server. The server itself is written in Node.js and should run on the same server as your website frontend(eg Apache HTTP Server, Nginx, etc). Current clients are written in PHP and Node.js, but in theory can be ported to any language such such as Ruby, Python, ASP, C, C++, etc.

The system stores data in MySQL(but other DB systems could be added in the future), On failure, the log will be kept on disk till successfully added to database. Then once the log is in the database, then it's up to you to write a log viewer for your application.

##Database Layout
###events table
`uuid` | `json encoded data` | `category` | `sortCode` | `logLevel` | `unixTimeStamp`

####Log Levels:
* `0` - `trace`
* `1` - `debug`
* `2` - `info`
* `3` - `warning`
* `4` - `error`
* `5` - `critical`
* `6` - `emergency`

##Install

To install copy the server folder to location, copy the `config.js.sample` file and rename to just `config.js`, and put in your details. Run `npm install` in the same location to install all the dependencies.

###Database Connection option
When establishing a connection, you can set the following options:

* `host`: The hostname of the database you are connecting to. (Default:
  `localhost`)
* `port`: The port number to connect to. (Default: `3306`)
* `socketPath`: The path to a unix domain socket to connect to. When used `host`
  and `port` are ignored.
* `user`: The MySQL user to authenticate as.
* `password`: The password of that MySQL user.
* `database`: Name of the database to use for this connection.
* `charset`: The charset for the connection. (Default: `'UTF8_GENERAL_CI'`)
* `insecureAuth`: Allow connecting to MySQL instances that ask for the old
  (insecure) authentication method. (Default: `false`)

##Write Events
Pick a client that works with the language that you're using. If you don't see one on the list, you may contribute a client in that language back to the project if you wish.

###PHP Client
First download and include or require the `eventLogger.php` file.

```
$logger = new eventLogger('/Users/kevinwhitman/Desktop/local servers/socialNetwork/logs'); //this takes a path of where to log the files to
```
Then once you create a logger, log a message such as `$logger->info('test');`

`logLevelName($data, $category = '', $sortCode = '')`

category is a varchar 255 string, can be useful for sorting.

sortCode is a varchar 255 string, useful for sorting also. Say you banned a user you could set it's category to "banUser" and sortcode to the users id like "user_1", then can pull up all events related to that account.

Check out [eventLogger.php line 65](https://github.com/keverw/eventLogger/blob/master/client/php/eventLogger.php#L65) and below, to see all the log level shortcuts

###Node Client

First `npm install eventlogger-client` the client or add to project dependencies. Then you can

```
var logger = require('eventlogger-client');

logger.init('/Users/kevinwhitman/Desktop/local servers/socialNetwork/logs'); //this takes a path of where to log the files to

logger.info('test');

``` 

All the log level shortcuts are the same as the PHP version.