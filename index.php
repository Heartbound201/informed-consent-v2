<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>UPLOAD FILE</title>
    <?php define("PREPATH", "");
    require_once(PREPATH."page_builder/_header.php") ?>
    <?php session_start(); /* Starts the session */
      if(!isset($_SESSION['UserData']['Username'])){
        header("location:login.php");
        exit;
      }
    ?>

    <style type="text/css">

      .container{
        padding: 2%;
        margin-bottom: 10%;
      }

      .myLabel{
      	float: left;
      }

      #recentFile{
        width: 100%;
      }

      .popover{
        max-width: 500px;
      }

		</style>
  </head>

  <body>

    <div class="container">
      <h1 class="display-4">Selezionare un consenso informato</h1>

        <div class="form-group col-auto ml-5 mr-5 mt-5 mb-0">
          <form action="upload.php" method="post" enctype="multipart/form-data">
          <label class="mb-3 mylabel" for="fileToUpload"><strong>Selezionare un file di estensione TXT o HTML</strong></label>
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-file-alt"></i>
              </div>
            </div>
            <input type="file" class="file" name="fileToUpload" id="fileToUpload" accept="text/plain,text/html">
            <input type="text" class="form-control input-lg path" disabled>

            <div class="input-group-btn">
              <button id="search" type="button" class="browse btn btn-info form-control input-lg">
                <i class="fas fa-folder-open"></i> Sfoglia
              </button>
            </div>
          </div>
          <div class="input-group-btn" align="center">
            <button id="submit" type="submit" name="submit" class="submit btn btn-block btn-primary input-lg" disabled>
              Carica <i class="fas fa-arrow-circle-right"></i>
            </button>
          </div>
          <input type="hidden" id="edu" name='edu'>
      </form>

          <!-- file di consensi informati caricati precedentemente nella cartela /uploads -->
          <label class="mt-3 mylabel" for"recentFile"><strong>Oppure cercare tra quelli aperti di recente:</stron></label>
            <div class="btn-group-vertical text-center" id="recentFile">
              <input type="text" id="mySearch" onkeyup="fileSearch()" placeholder="&#xF002; Ricerca ...">
              <?php
              $directory = PREPATH . "uploads/";
              $files = glob($directory . "*.{txt,html}",GLOB_BRACE);
              $i = 0;
              foreach ($files as $fileUrl) {
                $fileUrl = str_replace("uploads/","", $fileUrl);
                echo ("<button class='fileCI btn btn-block btn-info' style='float:left;' name='". $fileUrl ."' onclick='patientEducation(this.name, false)'><i class='fas fa-file-alt'></i>&nbsp;&nbsp;&nbsp;". $fileUrl . "</button>");
              }
              ?>
            </div>
          </div>
          <div id="notFound" class="text-muted text-center">0 risultati di ricerca</div>
      </div>

    <!-- pulsante logout  -->
    <a href="logout.php" class="btn btn-primary" id="logout">
       Logout <i class="fas fa-sign-out-alt"></i>
    </a>

    <!-- Modal per selezionare livello istruzione, età e sesso-->
    <div class="modal fade" id="education" role="dialog">
      <div class="modal-dialog" style="max-width: 600px;">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Apertura Consenso Informato</h4>
          </div>
          <div class="modal-body text-justify pl-5 pr-5" style="font-weight: normal;">
            <div id="errorMessage"></div>
              <h4 align="center">- Livello di istruzione -</h4>
              <hr>
              <span style="font-weight: 600;">Qual è il livello di Istruzione di chi legge e compila il Consenso Informato? <span style="color: red;">*</span></span>
              <div class="form-check mt-2">
                <input class="form-check-input" type="radio" id="scuola" name="education" value="0">
                <label class="form-check-label" for="scuola">
                  Scuola dell'obbligo
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="diploma" name="education" value="0.5">
                <label class="form-check-label" for="diploma">
                  Diploma
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="laurea" name="education" value="1">
                <label class="form-check-label" for="laurea">
                  Laurea
                </label>
              </div>
			  
			  <h4 align="center">- Età -</h4>
              <hr>
              <span style="font-weight: 600;">Qual è l'età di chi legge e compila il Consenso Informato? <span style="color: red;">*</span></span>
              <div class="form-check mt-2">
				<select id="age" name="age"></select> 
                <label class="form-check-label" for="scuola">
                  Età
                </label>
              </div>
			  
			  <h4 align="center">- Sesso -</h4>
              <hr>
              <span style="font-weight: 600;">Qual è il sesso di chi legge e compila il Consenso Informato? <span style="color: red;">*</span></span>
              <div class="form-check mt-2">
                <input class="form-check-input" type="radio" id="male" name="gender" value="M">
                <label class="form-check-label" for="scuola">
                  Maschio
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" id="female" name="gender" value="F">
                <label class="form-check-label" for="diploma">
                  Femmina
                </label>
              </div>
          </div>
          <div class="modal-footer">
            <!-- spiegazione indice Costa-Cabitza-->
            <span class="text-muted text-justify p-2" style="font-size: 12px;">(Informazione necessaria per indicare la facilità di lettura del testo del Consenso Informato secondo l'indice di leggibilità Costa-Cabitza</i>)
              <a tabindex='0' class="popoverMedico" data-toggle='popover' data-trigger='focus' data-placement='right' data-html="true" title="Cos'è l'Indice Costa-Cabitza?" data-content="Si tratta di una funzionalità che analizza il testo del Consenso e mostra la facilità di lettura/comprensione di ciascun paragrafo.<hr> L'indice Costa-Cabitza addiziona:
              <br>- il Livello di Istruzione, nell’ottica che ad un minor livello di istruzione corrisponde una maggiore difficoltà nella comprensione;
              <br>- variabili legate alla semantica del testo, vale a dire il numero di parole difficili e il numero di parole specialistiche (parole mediche) secondo l’assunto che maggiore è il numero di queste parole, più il processo di comprensione viene ostacolato;
              <br>- una variabile più sintattica, secondo la quale maggiore è il numero di periodi rispetto al numero di parole totali, più le frasi sono brevi e quindi la comprensione è velocizzata.">
                <i class="far fa-question-circle" aria-hidden="true"></i>
              </a>
            </span>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
            <button type="button" class="btn btn-success" onclick="checkEducationSelection()" style="width: 100px">Conferma</button>
          </div>
        </div>
      </div>
    </div>


    <?php include PREPATH.'page_builder/_footer.php';?>

    <script type="text/javascript">

      $('[data-toggle="popover"]').popover();
      $('#notFound').hide();

	  window.onload = function() {
		// fill the 'age' dropdown list
		var select = $("#age")[0];    
		for (var i = 16; i<= 90; i++){
			var option = document.createElement('option');
			option.value = i;
			option.innerHTML = i;
			select.options.add(option);
		}
	  };

      $(document).on('click', '.browse', function(){
        var file = $(this).parent().parent().parent().find('.file');
        file.trigger('click');
      });
      $(document).on('change', '.file', function(){
        $(this).parent().find('.path').val($(this).val().replace(/C:\\fakepath\\/i, ''));
        $('#submit').attr('disabled', false);
        patientEducation($('#fileToUpload').val().replace('C:\\fakepath\\',''), true);
      });

      //Ricerca tra file recenti
      function fileSearch() {
          var filter, group, files;
          filter = $('#mySearch').val().toUpperCase();
          files = $('.fileCI');
          var countDisplay = 0;
          for (var i = 0; i < files.length; i++) {
              if (files[i].innerText.toUpperCase().indexOf(filter) > -1) {
                  files[i].style.display = "";
                  countDisplay++;
              } else
                  files[i].style.display = "none";
          }
          if (countDisplay == 0)
            $('#notFound').show();
          else
            $('#notFound').hide();
      }

      var fUrl = "";
      var upload;
      var education;
	  var age;
	  var gender;
	  
      //Modal per sapere il livello di istruzione
	  // NOTE: the modal shown now asks for age and sex too
      function patientEducation(file, bool){
          fUrl = file;
          $('.modal-title').html("Apertura Consenso Informato: <i>" + file + "</i>");
          $('#education').modal('show');
          upload = bool;
      }

	  // NOTE: this function now checks for age and sex selection also
      function checkEducationSelection(){
        education = $('input[name=education]:checked').val();
		age = $("#age")[0].value;
		gender = $('input[name=gender]:checked').val();
        if(education == undefined || gender == undefined || age == undefined){
          $('#errorMessage').html(
            '<div class=" text-center col-auto alert alert-danger alert-dismissible fade show mt-3" role="alert"><strong align="center"><i class="fas fa-exclamation-triangle"></i>&emsp;Attenzione!&emsp;</strong>E\' obbligatorio compilare tutti i campi. <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
          );
        }
        else {
          $('#education').modal('hide');
          $('#edu').val(education);
          if(!upload)
            window.location.href = "<?=PREPATH?>builder.php?redirectTo=" + fUrl +"&education=" + education+"&age=" + age +"&gender=" + gender;
        }
      }

    </script>

  </body>
</html>
