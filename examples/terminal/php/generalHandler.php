<?php
	require "config.php";
	header("Content-Type: text/javascript; charset=utf-8");
	error_reporting(E_ALL);

	class GeneralHandler {

		public static function getNetworks() {
        $con = new PDO(Config::$host,
                       Config::$user,
                       Config::$password);
        
        if(!$con) {
            die('Could not connect: ' .mysql_error());
        }
        
        $sql = $con->prepare('SELECT * FROM networks');
        
        $sql->execute();
        
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        if(!$result) {
            die('Error occured');
        }
        echo json_encode($result);
        $con = null;
		}

		
		public static function getNodes() {
        
        $con = new PDO(Config::$host,
                       Config::$user,
                       Config::$password);
        
        if(!$con) {
            die('Could not connect: ' .mysql_error());
        }
        
        $sql = $con->prepare('SELECT * FROM nodes');
        
        $sql->execute();
        
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        if(!$result) {
            die('Error occured');
        }
        echo json_encode($result);
        $con = null;
		}

		public static function getCharacters() {
	        
	        $con = new PDO(Config::$host,
	                       Config::$user,
	                       Config::$password);
	        
	        if(!$con) {
	            die('Could not connect: ' .mysql_error());
	        }
	        
	        $sql = $con->prepare('SELECT * FROM characters');
	        
	        $sql->execute();
	        
	        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
	        if(!$result) {
	            die('Error occured');
	        }
	        echo json_encode($result);
	        $con = null;
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