<?php
	require 'eventLogger.php';
	
	$logger = new eventLogger('/Users/kevinwhitman/Desktop/local servers/socialNetwork/logs');
	
	var_dump($logger->info('test'));
?>