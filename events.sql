CREATE TABLE `events` (
  `uuid` varchar(255) NOT NULL DEFAULT '',
  `data` text NOT NULL,
  `category` varchar(255) NOT NULL DEFAULT '',
  `sortCode` varchar(255) NOT NULL DEFAULT '',
  `logLevel` int(1) NOT NULL,
  `unixTimeStamp` bigint(22) NOT NULL,
  PRIMARY KEY (`uuid`),
  FULLTEXT KEY `data` (`data`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;