<?php
	require "config.php";
	header("Content-Type: text/javascript; charset=utf-8");
	error_reporting(E_ALL);

	class GeneralHandler {

		public static function getFeed($feed_url) {

			$feed = new DOMDocument();
			$feed->load($feed_url);
			$json = array();

			$items = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('item');

			$json['item'] = array();

			foreach($items as $item) {

			  $title = $item->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
   			  $description = $item->getElementsByTagName('description')->item(0)->firstChild->nodeValue;

			  $json['item'][] = array("title"=>$title,"description"=>$description);
			}
			echo json_encode($json);
		}

		public static function postKudos($kudos) {
	        
	        $con = new PDO(Config::$host,
	                       Config::$user,
	                       Config::$password);
	        
	        if(!$con) {
	            die('Could not connect: ' .mysql_error());
	        }
	        
	        $sql = $con->prepare('INSERT INTO kudos (kudos) VALUES ("' . $kudos . '");');
	        
	        $sql->execute();
	        
	        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
	        if(!$result) {
	            die('Error occured');
	        }
	        echo json_encode($result);
	        $con = null;
		}
	}
?>