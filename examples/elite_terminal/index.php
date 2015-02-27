
<html>
	<head>
		<title>GALNET - Feed from the past</title>
		<link rel="stylesheet" type="text/css" href="css/style.css" />
		<link rel="stylesheet" type="text/css" href="css/glyphicon.css" />
		<link rel="author" href="http://ted.bluebit.nu">
		<!-- add meta stuff here -->
		<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
		<script type="text/javascript" src="js/terminal.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
	</head>
	<body>
		<div id="container">
			<audio volume="0" id="song" src="music/menu.mp3">
			</audio>
			<audio volume="1" id="effect" src="music/flick_button.mp3">
			</audio>
			<div id="screen">
				<div id="closed"></div>
				<div id="screen-layer">
					<div id="img-holder">
						<img src="img/cat1.png">
					</div>
					<textarea id="output"></textarea>
				</div>
				<div id="screen-overlay"></div>
			</div>
			<div id="leds"></div>
			<div id="closed-leds"></div>
			<div id="power-btn"><p>&#xe017</p></div>
			<div id="big-btn"><p>&#xe172</p></div>
		</div>
	</body>
	<footer>
		<div id="footer-holder">
	 <?php echo date('Y', time()); ?>&copy; Created by Bluebit. All rights to Elite belong to it's creators, this is just a demo of our terminal plugin. Also all music rights go to their respective owners, just wanted to make good atmopshere.
	 	</div>
	</footer>

</html>