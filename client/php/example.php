<?php
	require 'eventLogger.php';
	
	$logger = new eventLogger('/Users/kevinwhitman/Desktop/local servers/socialNetwork/logs'); //this takes a path of where to log the files to
	
	var_dump($logger->info('test'));
?>