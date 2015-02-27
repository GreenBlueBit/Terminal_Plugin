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
		case 'getFeed' :
			GeneralHandler::getFeed($_GET['feed_url']);
			break;
		case 'postKudos' :
			GeneralHandler::postKudos($_GET['kudos']);
			break;
	}
?>

