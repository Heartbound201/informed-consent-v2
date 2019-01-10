<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>INOLTRO CONSENSO INFORMATO</title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php");?>


  </head>
  <body>

    <?php
    $s = $_POST['jsonReport'];

    //preparo html del report da inviare per mail
    $s = str_replace("{\"readabilityIndexes\":{","{<br><h5>Redability Indexes</h5>{",$s);
    $s = str_replace("\"title\":[","<br><h5>Title</h5>[",$s);
    $s = str_replace("\"footer\":","<br><h5>Footer</h5>",$s);
    $s = str_replace("\"sections\":[","<br><h5>Sections</h5>[",$s);
    $s = str_replace("\"accepted\":","<h5>Accepted</h5>",$s);
    $s = str_replace("\"title\":","title : ",$s);
    $s = str_replace("\"gulpease\":","gulpease : ",$s);
    $s = str_replace("\"costaCabitza\":","costaCabitza : ",$s);
    $s = str_replace("\"education\":","<br></div></div></div><br><h5>Livello di Istruzione</h5>",$s);
    $s = str_replace("\"fearful\":","<br><h5>Quanto é preoccupato?</h5>",$s);
    $s = str_replace("\"confused\":","<br><h5>Quanto ha capito?</h5>",$s);
    $s = str_replace("[","<div style='padding: 10px; background-color: #dbfcfc;'>",$s);
    $s = str_replace("]","</div>",$s);
    $s = str_replace("\"paragraphs\":","<div style='padding: 20px; background-color: #b6dbdb;'><b><u>paragraphs</u></b> : ",$s);
    $s = str_replace("}},","</div>",$s);
    $s = str_replace("\"id\":","<br><i>id</i> : ",$s);
    $s = str_replace("\"text\":","<br><i>text</i> : ",$s);
    $s = str_replace("\"readabilityIndexes\":","<br><i>readabilityIndexes</i> : ",$s);
    $s = str_replace(",\"",",<br>\"",$s);
    $s = str_replace("},","<hr>",$s);
    $s = str_replace("{<br>","<br>",$s);
    $s = str_replace("<hr><br>\"reactions\":","<br><i>reactions</i> : ",$s);
    $s = str_replace("{","",$s);
    $s = str_replace("}","",$s);
    $s = str_replace(">,<","><",$s);

    $s = "<html><body><div style='padding: 10px; background-color: #eff2f2'><h3>Report finale Consenso Informato v2.0</h3>". $s ."</div></body></html>";

    $to = "barbero.erica@gmail.com"; //indirizzo email di prova
    session_start(); /* Starts the session */
      if(isset($_SESSION['UserData']['Email'])){
        $to .= "," . $_SESSION['UserData']['Email'];
      };

      $subject = "Stage - Consenso Informato v2.0";
      $headers = "From: consenso_informato_v2@example.com \r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

      mail($to,$subject,$s,$headers);
      ?>

      <!-- pulsante logout -->
      <a href="logout.php" class="btn btn-primary" id="logout">
         Logout <i class="fas fa-sign-out-alt"></i>
      </a>

    <div class="container">

      <div class="row">
        <div class="col-12 text-center" >
          <h1 class="display-4">CONSENSO INFORMATO INOLTRATO</h1>
          <script type="text/javascript">
           console.log(JSON.parse(localStorage.getItem("json")));
          </script>
        </div>
      </div>

      <div id="progressBar" class="col-12 mt-4">
        <div class="progress" style="height: 30px;">
          <div id="slider-progress" class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
          <div class="progress-bar-title">100% Completato</div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12 text-center" >
          <span class="font-weight-bold">Grazie per la disponibilità!<br>Ora è possibile riconsegnare il dispositivo allo staff medico.</span>
        </div>
      </div>

    </div>

    <?php include PREPATH.'page_builder/_footer.php';?>

  </body>
</html>
