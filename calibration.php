<!DOCTYPE html>
<!--
This is an example HTML that shows how WebGazer can be used on a website.
This file provides the additional features:
  * An integrated, intuitive and sleek action bar with an informative "help" module accessible at all times
  * Structured 9-point calibration system
  * Accuracy measure of predictions based on calibration process
  * Video feedback regarding face positioning
  * Improved eye predictions visible to the user
Instructions on use can be found in the README repository.
-->
<html>
    <head>
        <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
        <TITLE>WebGazer Demo</TITLE>
		<?php define("PREPATH", "");
		require_once(PREPATH."page_builder/_header.php") ?>
        <link rel="stylesheet" type="text/css" href="<?=PREPATH?>assets/css/webgazer/style.css">
        <link rel="stylesheet" href="<?=PREPATH?>assets/css/webgazer/bootstrap.css">
    </head>
    <body LANG="en-US" LINK="#0000ff" DIR="LTR">
      <canvas id="plotting_canvas" width="500" height="500" style="cursor:crosshair;"></canvas>

        <script async type="text/javascript" src="<?=PREPATH?>assets/js/webgazer/webgazer.js"></script>
		<script type="text/javascript" src="<?=PREPATH?>assets/plugin/jquery.redirect.js"></script>
        <script src="<?=PREPATH?>assets/js/webgazer/sweetalert.min.js"></script>

        <script src="<?=PREPATH?>assets/js/webgazer/main.js"></script>
        <script src="<?=PREPATH?>assets/js/webgazer/calibration.js"></script>
        <script src="<?=PREPATH?>assets/js/webgazer/precision_calculation.js"></script>
        <script src="<?=PREPATH?>assets/js/webgazer/precision_store_points.js"></script>

        <!-- Calibration points -->
        <div class="calibrationDiv">
            <input type="button" class="Calibration" id="Pt1"></input>
            <input type="button" class="Calibration" id="Pt2"></input>
            <input type="button" class="Calibration" id="Pt3"></input>
            <input type="button" class="Calibration" id="Pt4"></input>
            <input type="button" class="Calibration" id="Pt5"></input>
            <input type="button" class="Calibration" id="Pt6"></input>
            <input type="button" class="Calibration" id="Pt7"></input>
            <input type="button" class="Calibration" id="Pt8"></input>
            <input type="button" class="Calibration" id="Pt9"></input>
        </div>

        <!-- Modal -->
        <div id="helpModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-body">
                <img src="<?=PREPATH?>assets/img/calibration.png" width="100%" height="100%" alt="webgazer demo instructions"></img>
              </div>
              <div class="modal-footer">
                <button id="closeBtn" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="Restart()">Calibrate</button>
              </div>
            </div>

          </div>
        </div>

        <!-- Latest compiled JavaScript -->
        <script src="<?=PREPATH?>assets/js/webgazer/resize_canvas.js"></script>
        <script src="<?=PREPATH?>assets/js/webgazer/bootstrap.min.js"></script>

    </body>
</html>
