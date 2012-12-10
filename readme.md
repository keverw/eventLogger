#eventLogger

**NOTE: THIS PROJECT IS IN PROGRES, DO NOT USE YET!!!**

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

##write events
Pick a client that works with the language that you're using. If you don't see one on the list, you may contribute a client in that language back to the project if you wish.