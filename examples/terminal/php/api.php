<?php
/*
*	Page Name : Api.php
*	
*	Handled requests to separate classes so everything is clean and neat.
*	Overkill? Maybe, but it's reasonable enough for expansion
*/
?>

<?php
	require "generalHandler.php";

	error_reporting(E_ALL);

	$action = "";

	
	if(isset($_GET['action'])) {
		$action = $_GET['action'];
	}


	switch($action) {
		case 'getNetworks' :
			GeneralHandler::getNetworks();
			break;
		//works for get nodes and connect network
		case 'getNodes' :
			GeneralHandler::getNodes();
			break;
		case 'getCharacters' :
			GeneralHandler::getCharacters();
			break;
		case 'postKudos' :
			GeneralHandler::postKudos($_GET['kudos']);
			break;
	}
?>

