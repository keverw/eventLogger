<?php
	/**
	* @project eventLogger client
	* @version 0.1
	* @url https://github.com/keverw/eventLogger
	* @about A PHP eventLogger client
	**/
	class eventLogger
	{
		private $logPath = '';
		
		function __construct($path)
		{
			$this->logPath = $path;
		}
		
		private function genUUID() //v4
		{
			return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
				// 32 bits for "time_low"
				mt_rand(0, 0xffff), mt_rand(0, 0xffff),

				// 16 bits for "time_mid"
				mt_rand(0, 0xffff),

				// 16 bits for "time_hi_and_version",
				// four most significant bits holds version number 4
				mt_rand(0, 0x0fff) | 0x4000,

				// 16 bits, 8 bits for "clk_seq_hi_res",
				// 8 bits for "clk_seq_low",
				// two most significant bits holds zero and one for variant DCE1.1
				mt_rand( 0, 0x3fff ) | 0x8000,

				// 48 bits for "node"
				mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff )
			);
		}
		
		private function writeLog($level, $category, $sortCode, $data)
		{
			$uuid = $this->genUUID();
			
			$fileContents = json_encode(array(
				'uuid' => $uuid,
				'level' => $level,
				'time' => time(),
				'category' => $category,
				'sortCode' => $sortCode,
				'data' => $data
			));
			
			$result = file_put_contents($this->logPath . DIRECTORY_SEPARATOR . $uuid .'.json', $fileContents);
			
			if ($result > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		public function trace($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(0, $category, $sortCode, $data);
		}
		
		public function debug($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(1, $category, $sortCode, $data);
		}
		
		public function info($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(2, $category, $sortCode, $data);
		}
		
		public function warning($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(3, $category, $sortCode, $data);
		}
		
		public function error($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(4, $category, $sortCode, $data);
		}
		
		public function critical($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(5, $category, $sortCode, $data);
		}
		
		public function emergency($data, $category = '', $sortCode = '')
		{
			return $this->writeLog(6, $category, $sortCode, $data);
		}
	}
?>