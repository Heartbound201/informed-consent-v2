<html>
    <head>
        <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
        <TITLE>WebGazer Demo</TITLE>
		<?php define("PREPATH", "");
		require_once(PREPATH."page_builder/_header.php") ?>
        <link rel="stylesheet" type="text/css" href="<?=PREPATH?>assets/css/webgazer/style.css">
        <link rel="stylesheet" href="<?=PREPATH?>assets/css/webgazer/bootstrap.css">
		<style>
		#myProgress {
		  width: 100%;
		  background-color: grey;
		}

		#myBar {
		  width: 1%;
		  height: 30px;
		  background-color: green;
		}
		
		.footer {
		  position:fixed;
		  bottom:0;
		}
		</style>
		<script>
		
		function move() {
		  var elem = document.getElementById("myBar"); 
		  var text = document.getElementById("prlabel"); 
		  var width = 1;
		  var interval = 100; //ms
		  var id = setInterval(frame, interval);
		  function frame() {
			if (width >= 100) {
			  clearInterval(id);
			} else {
			  //width++;
			  width += 100 / (60000 / interval);
			  width = parseFloat((Math.round(width * 10) / 10).toFixed(1));
			  elem.style.width = width + '%'; 
			  text.innerHTML = width + '%';
			}
		  }
		}
		/*
		 * This function starts the streaming of data between the android device and the Shimmer3 GSR+ device
		 * This is done in order to analyze a baseline
		 */
		 
		function StartStreaming(){	
			AndroidBridge.startStreamingBaseline(2);
		}

		function StopStreaming(){
			AndroidBridge.stopStreamingBaseline();
		}

		window.onload = function() {
			TrackSession();
			StartStreaming();
			move();
		}
		
		window.onbeforeunload = function(){
			StopStreaming();
			AndroidBridge.updateWebSession(new Date().getTime(), JSON.stringify({}));
		}
		
		function TrackSession(){
			AndroidBridge.trackWebSession(new Date().getTime(), window.location.href, "BASELINE");
		}

		</script>
    </head>
    <body LANG="en-US" LINK="#0000ff" DIR="LTR">
	<div class="footer">
	<div id="prlabel">1%</div>
	<div id="myProgress">
	  <div id="myBar"></div>
	</div>
	</div>
	</body>
</html>