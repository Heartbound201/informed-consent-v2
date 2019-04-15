<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <title>CONSENSO INFORMATO</title>
  <?php define("PREPATH", "");
  require_once(PREPATH."page_builder/_header.php") ?>
  <script type="text/javascript" src="<?=PREPATH?>assets/dizionario.json"></script>
  <script type="text/javascript" src="<?=PREPATH?>assets/parole_DeMauro.json"></script>

  <script type="text/javascript" src="<?=PREPATH?>assets/js/converter.js"></script>
  <script type="text/javascript" src="<?=PREPATH?>assets/js/main.js"></script>
  <script type="text/javascript" src="<?=PREPATH?>assets/js/informedConsent.js"></script>
  <script type="text/javascript" src="<?=PREPATH?>assets/js/calculateReadability.js"></script>
  <script type="text/javascript" src="<?=PREPATH?>assets/plugin/jquery.redirect.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">

  <style type="text/css">
  body{
	  font-size: 0.7rem;
  }
  .btn{
	  font-size: 0.7rem;
  }
  .popover{
    max-width: 350px;
  }
  .row{
    width: 100%;
    margin: 0;
  }
  .readabilityRadio{
    margin-right: 2px;
  }
  #resetReactions{
    white-space: normal;
    margin: 0px !important;
  }
  h5{
    font-size: 90%;
    font-weight: bold;
    margin-bottom: 3px;
  }
  h4{
    margin-bottom: 3px;
  }
  .form-check-label{
    font-size: 80%;
  }
  </style>

</head>

<body>
	
  <script>
	if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {	
		document.write('<script type="text/javascript" src="<?=PREPATH?>assets\/js\/webgazer\/webgazer.js"><\/script>');
		document.write('<script type="text/javascript" src="<?=PREPATH?>assets\/js\/mobilebridge.js"><\/script>');
	}
  </script>
  <div class="container-fluid m-0 p-0" id="top">

    <nav class="navbar fixed-top" id="nav1">
      <div class="row">

        <!-- header -->
        <div class="col-7 text-center" id="header">
        </div>

        <!-- sopra reazioni -->
        <div class="col-5" id="visualization">

          <!-- Button trigger modal -->
          <button id="helpButton" type="button" class="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">
            <i class="fas fa-question-circle fa-2x bstooltip" aria-hidden="true" id="faq" data-toggle="tooltip" data-placement="left" data-trigger="manual" title="Sezione aiuto" style="padding-top:1px"></i>
            <br><h5 class="m-0">HELP</h5>
          </button>

          <!-- Modal -->
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog modal-lg" style="max-width: 800px;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Istruzioni all'uso - supporto alla lettura</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body text-justify pl-5 pr-5">
                  <p>Il Consenso Informato è mostrato in sezioni. Ciascuna sezione contiene dei paragrafi con a fianco due colonne:</p>
                  <ul class="mb-0 pr-5">
                    <li>la prima, inizialmente vuota, serve per mostrare la difficoltà di lettura/comprensione di ciascun paragrafo tramite un indicatore grafico a barra:</li>
                    <img src="<?=PREPATH?>assets/img/ProgressFacilitaLettura.PNG">
                    <li>la seconda invece è composta da tre icone che servono per aggiungere/rimuovere le <i>reazioni</i> che si provano leggendo ciascun paragrafo.</li>
                    <img src="<?=PREPATH?>assets/img/ReactionsIcons.PNG">
                  </ul>
                  <p>Le reazioni possono essere inserite evidenziando delle frasi con il cursore del mouse e cliccando la relativa icona/pulsante.</p>
                  <p>Le reazioni saranno inviate tramite mail <i class="fas fa-envelope"></i> in un report riassuntivo del Consenso Informato al termine della compilazione. Ciò permette allo staff medico di sapere quali parti del documento dovranno essere chiarite al paziente.</p>
                  <p>Per attivare l'indice di leggibilità che mostra la facilità di lettura di ogni singolo paragrafo bisogna cliccare sul relativo pulsante <img src="<?=PREPATH?>assets/img/IndiceLeggibilita.PNG" height="38px"></p>
                  <div style="font-size: 14px; text-align: center; background-color: #f9f9f9;">Alcune informazioni in più riguardo agli indici:
                      <br><a tabindex='0' class='popoverIndex popoverMedico' data-toggle='popover' data-trigger='focus' data-container="body" data-placement='right' title='Indice Gulpease' data-content="L'Indice Gulpease è un indice di leggibilità di un testo tarato sulla lingua italiana.
                      L'indice considera due variabili linguistiche: la lunghezza della parola e la lunghezza della frase rispetto al numero delle lettere.">Gulpease</a>
                      <br><a tabindex='0' class='popoverIndex popoverMedico' data-toggle='popover' data-trigger='focus' data-container="body" data-placement='right' title='Indice Costa-Cabitza' data-html=true data-content="Si tratta di un indice di leggibilità che addiziona:
                      <br>- il Livello di Istruzione, nell’ottica che ad un minor livello di istruzione corrisponde una maggiore difficoltà nella comprensione;
                      <br>- variabili legate alla semantica del testo, vale a dire il numero di parole difficili e il numero di parole specialistiche (parole mediche) secondo l’assunto che maggiore è il numero di queste parole, più il processo di comprensione viene ostacolato;
                      <br>- una variabile più sintattica, secondo la quale maggiore è il numero di periodi rispetto al numero di parole totali, più le frasi sono brevi e quindi la comprensione è velocizzata.">Costa-Cabitza</a>
                  </div>

                  <p>Per avere una visualizzazione grafica più efficace della difficoltà nella lettura è possibile attivare lo sfondo. <img src="<?=PREPATH?>assets/img/OnOffSfondo.PNG" height="40px">
                    <br><span style="font-size: 14px;">(Più lo sfondo sarà tendente al nero più il paragrafo sarà complicato e di difficile comprensione, l'utente sarà invitato ad avvicinarsi allo schermo per capire meglio cosa c'è scritto aumentando così anche la sua concentrazione.)</span></p>
                  <p>Cliccando sulle parole in grassetto presenti nel testo del consenso vengono mostrati dei messaggi pop-up che riportano la definizione in Italiano corrente del termine medico a cui si riferiscono grazie all'integrazione di un dizionario <i class="fas fa-book"></i></p>
                  <p>Il consenso può essere compilato riempiendo gli opportuni campi vuoti. (Rappresentati nel testo da <input type="text" disabled style="font-family: Arial, FontAwesome; font-size:12px; padding-left: 5px; height:18px; width:100px;" placeholder="&#xF040; ..."> )</p>
                  <p>Per passare da una sezione all'altra bisogna utilizzare i pulsanti Indietro/Avanti.<span><img src="<?=PREPATH?>assets/img/ButtonSezioni.PNG" height="25px"></span>
                  <br>La barra posta in fondo alla pagina serve per dare un'informazione relativa all'avanzamento della lettura dell'intero documento. <img src="<?=PREPATH?>assets/img/SectionProgress.PNG" height="40px">
                  <br>In ogni istante è possibile capire in quale sezione del Consenso ci si trova. La sezione corrente è indicata in <span style='font-weight: bold; color: blue;'>blu</span>.
                  Se in una sezione sono state aggiunte una o più reazioni al testo, comparirà il simbolo <i class='fas fa-tasks'></i> sopra il relativo indicatore di sezione: <span><img src="<?=PREPATH?>assets/img/sectionsIndicator.PNG" height="29px"></span></p>

                  <p>Al termine della lettura viene chiesto di rispondere a tre quesiti:</p>
                  <ul class="mb-0 pr-5">
                    <li>Quanto si è preoccupati alla lettura dell'intero documento? (in un range compreso tra "per niente" e "molto")</li>
                    <li>Quanto non si ha capito dell'intero documento? (in un range compreso tra "niente" e "molto")</li>
                    <li>Acconsento / Non Acconsento al trattamento riportato nel consenso informato. <br>NB: se sono state aggiunte delle reazioni durante la lettura, non sarà possibile acconsentire in quanto qualcosa non vi è risultato chiaro.</li>
                  </ul>
                  <p>Infine bisogna premere il pulsante <img src="<?=PREPATH?>assets/img/InviaBtn.PNG" height="40px"> in modo che il Consenso Informato con le vostre annotazioni e risposte sia inviato allo staff medico.</p>
                  <div style="font-size: 14px; text-align: center; background-color: #f9f9f9;">
                    <p>Per ulteriori informazioni è consigliata la visione della seguente presentazione video:</p>
                    <video id="videoHelp" width="620" controls>
                      <source src="<?=PREPATH?>assets/img/HelpVideo.mp4" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-info" data-dismiss="modal">Chiudi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- sotto header -->
      <div class="row pt-2" id="briefing">
        <!-- zoom -->
        <div class="col-2 mt-1" id="zoomDiv" align="center">
          <div class="btn-group" role="group">
            <button class="btn btn-default btn-sm bstooltip" style="border: 1px solid #cccccc;" type="button" id="zoomOut" onclick="text.zoomOut(current_section)" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Diminuisce la dimensione del testo">
              <i class="fa fa-search-minus fa-lg" aria-hidden="true"></i>
            </button>
            <button class="btn btn-default btn-sm bstooltip" style="border: 1px solid #cccccc;" type="button" id="zoomIn" onclick="text.zoomIn(current_section)" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Aumenta la dimensione del testo">
              <i class="fa fa-search-plus fa-lg" aria-hidden="true"></i>
            </button>
          </div>
          <h5 class="mt-1">RIDIMENSIONA TESTO</h5>
        </div>
        <!-- pulsanti indice leggibilità-->
        <div class="col-5 p-0" id="briefing_informedConsent">
          <div class="row">
            <div class="readabilityControls col-8" align="center">
              <div class="btn-group btn-gropu-toggle" data-toggle="buttons" id="readabilityBtGroup" align="center">
                <button class="btn btn-info bstooltip readabilityRadio text-center" id="gulpease" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva indice Gulpease">
                  <input type="radio" name="readabilityIndexName" hidden>Gulpease
                </button>
                <button class="btn btn-info bstooltip readabilityRadio text-center" id="costaCabitza" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva indice Costa-Cabitza">
                  <input type="radio" name="readabilityIndexName" hidden>Costa-Cabitza
                </button>
                <button class="btn btn-danger active bstooltip readabilityRadio text-center" id="noIndex" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Disattiva indice di leggibilità">
                  <input type="radio" name="readabilityIndexName" hidden>OFF
                </button>
              </div>
              <h5 class="mt-1">INDICE DI LEGGIBILITA'
                <a tabindex='0' class="popoverMedico" data-toggle='popover' data-trigger='focus' data-placement='right' data-html="true" title="Cos'è un Indice di Leggibilità?" data-content="L'Indice di Leggibilità è una funzionalità che analizza il testo del Consenso e mostra la facilità di lettura/comprensione di ciascun paragrafo.<hr>Più lo sfondo del paragrafo è scuro più sarà di difficile comprensione e richiederà una maggiore concentrazione durante la lettura.<br>Allo stesso modo la barra a fianco indica un paragrafo difficile: <img src='<?=PREPATH?>assets/img/barraDifficile.PNG' width='100px'> o uno facile: <img src='<?=PREPATH?>assets/img/barraFacile.PNG' width='100px'>.<hr><a class='text-center' style='font-size: 12px; color: #00348e; cursor: pointer;' data-toggle='modal' data-target='#myModal'>Per ulteriori informazioni clicca qui per consultare l'Help.</a>">
                  <i class="far fa-question-circle" aria-hidden="true"></i></a>
                </h5>
            </div>

            <div class="col-4 mt-1 pr-2" id="sfondoBtn" align="center">
              <div id="sfondoTooltip" class="bstooltip" data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Attiva/Disattiva lo sfondo colorato ai paragrafi">
                <input id="buttonBG" name="buttonBG" type="checkbox" disabled>
                <h5 class="mt-1">SFONDO</h5>
              </div>
            </div>

          </div>
        </div>
        <!-- barra facilità lettura -->
          <div class="col-2 mt-1 text-center" id="showIcons">
            <div id="letturaTooltip" class="bstooltip" data-toggle="tooltip" data-trigger="manual" data-placement="top" title="Mostra/Nascondi la visualizzazione grafica di leggibilità">
              <input id="buttonReadabilityCircles" type="checkbox" name="buttonReadabilityCircles">
              <h5 style="text-align: center">
                <div class="mt-1">FACILITA' LETTURA <i class="fa fa-arrow-right" aria-hidden="true"></i></div>
              </h5>
            </div>
          </div>
        <!-- descrizione reazioni -->
        <div class="col-3 m-0 pl-0 pr-3" id="briefing_reactions">
          <div class="col-4 text-center m-0 p-0"style="float:left">
              <button class="sectionReactionBtn sectionBtn row btn bstooltip" id="sectionSonoPreoccupato" data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Aggiunge la reazione 'Sono Preoccupato' a tutta la sezione corrente del Consenso Informato">
                <img src="assets/img/Fearful_Face_Emoji.png" height="27" width="27">
              </button>
              <h5>SONO<br>PREOCCUPATO</h5>
          </div>
          <div class="col-4 text-center m-0 p-0"style="float:left">
              <button class="sectionReactionBtn sectionBtn row btn bstooltip" id="sectionNonHoCapito" data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Aggiunge la reazione 'Non ho Capito' a tutta la sezione corrente del Consenso Informato">
                <img src="assets/img/Confused_Face_Emoji.png" height="27" width="27">
              </button>
              <h5>NON HO<br>CAPITO</h5>
          </div>
          <div class="col-4 text-center m-0 p-0"style="float:left">
              <button class="sectionReactionBtn row btn bstooltip" id="resetReactions" data-toggle="tooltip" data-trigger="manual" data-placement="top" data-trigger="manual" title="Cancella tutte le reazioni che sono state aggiunte nella sezione corrente del Consenso Informato" disabled>
                <i class="fas fa-trash-alt" style="width:27px; height:27px" aria-hidden="true"></i>
              </button>
              <h5>CANCELLA<br>REAZIONE</h5>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sezione paragrafi consenso informato -->
    <div class="row" id="text-body">
      <div class="col-12 text-center" id="renderingText">
        <i class="fa fa-spinner fa-pulse" style="font-size:48px"></i>
        <div class="animationload">
          <!-- loader durante il caricamento -->
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>

      </div>

      <div class="col-7 text-justify pr-0" id="pdf-text"></div>
      <div class="col-2" id="readability-icon"></div>
      <div class="col-2" id="readability-icon-empty"></div>
      <div class="col-3 pl-0 pr-3" id="reactions-button"></div>

      <!-- Questionario finale -->
      <div class="col-8 offset-2 text-center" id="final" hidden>
        <div class="card">
          <h4 class="card-header progress-bar-striped" style="background-color: lightblue;">In base a quanto letto finora risponda alle seguenti domande
            <a tabindex='0' class="popoverMedico" data-toggle='popover' data-trigger='focus' data-placement='right' data-html="true" title="Come rispondere?" data-content="Seleziona il pallino che meglio esprime la tua posizione rispetto alle affermazioni proposte.<hr><span style='font-size: 14px;'>Se sei d'accordo con l'affermazione posta a sinistra seleziona un pallino tendente alla sinistra, al contrario se la tua opinione si avvicina di più all'affermazione di destra seleziona un pallino vicino a tale affermazione.</span>">
              <i class="far fa-question-circle" aria-hidden="true"></a></i>
          </h4>
          <div class="card-body">
            <div id="messageFinal"></div>

            <h4 class="card-title">Quanto è preoccupato? <span style="color: red; font-size: 14px;">*</span></h4>
            <div class="input-group" style="display: block">
              <div class="form-check form-check-inline">
                <span style="font-style: italic">per niente &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio1" value="1">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio2" value="2">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio3" value="3">
              </div><div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio4" value="4">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio5" value="5">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="fearful" id="inlineRadio6" value="6">
                <span style="font-style: italic">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; molto</span>
              </div>
            </div>

            <br>

            <h4 class="card-title">Quanto ha capito? <span style="color: red; font-size: 14px;">*</span></h4>
            <div class="input-group" style="display: block">
              <div class="form-check form-check-inline">
                <span style="font-style: italic">&nbsp;&nbsp;&nbsp;&nbsp; niente &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input class="form-check-input" type="radio" name="confused" id="inlineR1" value="1">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="confused" id="inlineR2" value="2">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="confused" id="inlineR3" value="3">
              </div><div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="confused" id="inlineR4" value="4">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="confused" id="inlineR5" value="5">
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="confused" id="inlineR6" value="6">
                <span style="font-style: italic">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; molto</span>
              </div>
            </div>

          </div>

          <div class="card-footer final-toolbar" style="background-color: lightblue">
            <h4>Acconsente ai termini del Consenso Informato ? <span style="color: red; font-size: 14px;">*</span></h4>
            <form id="accept" align="center">
              <input type="radio" id="agree" name="finalReactions">
              <label for="agree" id="agreeLabel"><h5>ACCONSENTO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h5></label>
              <input type="radio" id="disagree" name="finalReactions">
              <label for="disagree"><h5>NON ACCONSENTO</h5></label>
            </form>
            <span class="text-muted text-justify" style="font-size: 14px;">(Se sono state aggiunte delle reazioni a delle frasi la scelta sarà automaticamente NON ACCONSENTO, in modo che vengano chiariti tutti i passaggi del Consenso Informato prima di acconsentire.)</span>
            <form id="idFinalSubmit" align="center" style="margin-top: 1em;">
              <input type="button" class="btn btn-success btn-md" id="finalSubmit" style="width: 100px" name="submit" value="Invia" disabled="disabled">
            </form>
          </div>

        </div>
</div>

  <!-- descrizione sezioni -->
  <div class="col-12 mt-3" id="sectionProgress">
    <div class="row" >
      <div class="col-1" align="center">
        <button type="button" class="btn btn-success center-block bstooltip" id="indietro" onclick="resetHeight();"
          data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Sezione precedente">
        <i class="fas fa-angle-left fa-2x"></i>
        </button>
      </div>
    <div id="progressBar" class="col-10 pt-2">
      <!--  -->
    </div>
      <div class="col-1" align="center">
        <button type="button" class="btn btn-success center-block bstooltip" id="avanti" onclick="resetHeight();"
        data-toggle="tooltip" data-placement="top" data-trigger="manual" title="Sezione successiva">
        <i class="fas fa-angle-right fa-2x"></i>
      </button>
      </div>
    </div>
      <div class="carousel-indic">
        <!-- div x ogni sezione -->
      </div>
  </div>

</div>
</div>

<!-- Modal for Alert message-->
<div class="modal fade" id="alertModal" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Avviso di Sistema</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div id="modalMessage"class="modal-body text-justify pl-5 pr-5">
        <!-- Message here !! -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-info" data-dismiss="modal">Chiudi</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal for Final Submit dopo invio -->
<div class="modal fade" id="confirm" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Inoltro Consenso Informato</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-justify pl-5 pr-5">
        <div class="row">
          <div class="col-2 pl-0">
            <img src="<?=PREPATH?>assets/img/doctor.PNG" height="90px">
          </div>
          <div class="col-10 pt-2">
            <span id="patientChoice"></span>
            <hr style="margin: 4px 0px">
            <span style='font-weight: 600;'>Confermi ?</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" onclick="finalSubmit()" style="width: 100px">Sì</button>
        <button type="button" class="btn btn-info" data-dismiss="modal" style="width: 100px">No</button>
      </div>
    </div>
  </div>
</div>

<?php include PREPATH.'page_builder/_footer.php';?>

<script type="text/javascript">
var text;
var current_section = 1;
let test;
var items = [];
$.getJSON( "<?=PREPATH?>assets/parole_DeMauro.json", function( data ) {
  for(i=0; i < data.length; i++)
    wrd_DeMauro[i] = data[i];
    $.getJSON( "<?=PREPATH?>assets/dizionario.json", function( data ) {
      var i = 0;
      $.each( data, function( key, val ) {
        items[i] = new Object();
        items[i].key = key;
        items[i].val = val;
        i++;
      });
      buildpage();
      toggleBtVertical();
      resetHeight();
      trovaTerminiMedici();
      if (current_section == text.sections.length) {
          $('#final').attr('hidden', false);
          $("#avanti").attr('disabled', true);
      }
      //create carousel items
      var s = 0;
      text.sections.forEach(function(section) {
        s++;
        $(".carousel-indic").append("<div id='carousel"+ s +"'><i class='fas fa-tasks' style='opacity: 0.0;'></i></div>");
      });
      $("#carousel1").addClass("active");
      $(".carousel-indic").append("<span><a tabindex='0' class='popoverMedico ml-2' style='position: absolute; top: 56px;' data-toggle='popover' data-trigger='focus' data-placement='top' data-html='true'"+
      " title='Feedback sezioni' data-content=\"In ogni istante è possibile capire in quale sezione del Consenso ci si trova. La sezione corrente è indicata in <span style='font-weight: bold; color: blue;'>blu</span>.<br>Se in una sezione sono state aggiunte una o più reazioni al testo, compararirà il simbolo <i class='fas fa-tasks'></i> sopra il relativo indicatore di sezione.\">"+
      "<i class='far fa-question-circle'></i></a></span>");
    });
});
// problemi nel mettere certi attributi allora setto manualmente
$("#readability-icon").hide();
$("#indietro").hide();
$("#noIndex").focus();
//su dispositivi mobile devo correggere per far comparire keyboard per scrivere nelle input text
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
  $('#sectionProgress').css({'margin-bottom': 900});
}
$("#sfondoTooltip").tooltip('disable');
$("#letturaTooltip").tooltip('disable');
$(window).resize(function(){
    toggleBtVertical();
    resetHeight();
});
// ridimensiona in verticale i radioButton degli Indici di Leggibilità
function toggleBtVertical(){
   if($(window).width() < 800){
     $("#readabilityBtGroup").addClass("btn-group-vertical");
     $('#zoomDiv').css({'padding-top': $('#briefing').height() / 3 - 15});
     $('#sfondoBtn').css({'padding-top': $('#briefing').height() / 3 - 15});
     $('#showIcons').css({'padding-top': $('#briefing').height() / 3 - 15});
     $('#briefing_reactions').css({'padding-top': $('#briefing').height() / 3 - 15});
   }
   else{
     $("#readabilityBtGroup").removeClass("btn-group-vertical");
     $('#zoomDiv').css({'padding-top': 0});
     $('#sfondoBtn').css({'padding-top': 0});
     $('#showIcons').css({'padding-top': 0});
     $('#briefing_reactions').css({'padding-top': 0});
   }
}
//responsive per elementi della pagina
function resetHeight(){
  if($('#header').height() < 75)
    $('#header').css({'height': 75});
  $('#text-body').css({'margin-top': $('#nav1').height() + 20});
  for (var i = 0; i < text.sections.length; i++) {
    var section_id = i + 1;
    $('#empty-title' + section_id).css({
      'height': $("#" + section_id + '-title').height() + 12,
      'margin':'10px 0px',
      'padding' : '5px'
    });
    $('#readability-title' + section_id).css({
      'height': $("#" + section_id + '-title').height() + 12,
      'margin':'10px 0px',
      'padding' : '5px'
    });
    $('#reactions-title' + section_id).css({
      'height': $("#" + section_id + '-title').height() + 12,
      'margin':'10px 0px',
      'padding' : '5px'
    });
  }
  for(var i = 1; i <= $("p").length; i++){
    $("#paragraphReactions" + i).css({'margin':'10px 0px'});
    $("#paragraphReactions" + i).css({'padding':'5px 0px'});
    $("#paragraphReactions"+i).height($("#p"+i).height());
    $("#readabilityParagraph"+i).height($("#p"+i).height());
    $("#empty-div"+i).height($("#p"+i).height());
    $("#pb"+i).css({'margin-top' : ($("#readabilityParagraph"+i).height() / 2 - 10)});
  }
}
// funzione che trova i termini medici presenti nel CI
function trovaTerminiMedici(paragraphNumber){
  if(paragraphNumber == undefined){
    nTotalParagraphs = 0;
    text.sections.forEach(function(section) {
      nTotalParagraphs += section.paragraphs.length;
    });
    for(var n = 1; n <= nTotalParagraphs; n++){
      trovaTerminiMedici(n);
    }
  }
  // FIXME: RIDIMENSIONA TESTO dovrebbe ingrandire anche i caratteri dei popover
    if($('#p'+paragraphNumber).text() != undefined){
      var parole = $('#p'+paragraphNumber).text().replace(/\/|\“|\”|\’|\"|,|\.|:|;|_|\'|\(|\)|\[|\]/g," ");
      parole = parole.split(" ");
    }
    else
      return;
      // cerca termini nel dizionario medico
      terminiMedici = [];
      for ( i = 0; i < parole.length; i++) {
        var index = items.map( function(x){ return x.key;}).indexOf(parole[i].toUpperCase());
        if(index != -1){
          if(terminiMedici.indexOf(items[index]) == -1)
            terminiMedici.push(items[index]);
        }
      }
      for (var i = 0; i < terminiMedici.length; i++) {
          $(function () {
            $('[data-toggle="popover"]').popover();
          });
          var testoParagrafo = $('#p'+paragraphNumber).html();
          var start = 0, startText = "", termineTrovato = "";
        do{
          start= start + termineTrovato.length + testoParagrafo.toLowerCase().indexOf(terminiMedici[i].key.toLowerCase().substr(0, terminiMedici[i].key.length - 1)),
          startText = $('#p'+paragraphNumber).html().substring(0, start),
          endText = $('#p'+paragraphNumber).html().substring(start + terminiMedici[i].key.length, $('#p'+paragraphNumber).html().length),
          termineTrovato = $('#p'+paragraphNumber).html().substring(start , start + terminiMedici[i].key.length);
          testoParagrafo = endText;
        }while(start < start + endText.indexOf("</a>") && (endText.indexOf("<a tab") == -1 || endText.indexOf("<a tab") > endText.indexOf("</a>")));
        //quando termineTrovato non appartiene al testo del paragrafo ma al testo del popover di un termine
          var popover = "<a tabindex='0' class='popoverMedico' data-toggle='popover' data-trigger='focus' data-placement='top' title='"+ terminiMedici[i].key +"' data-content=\""+ terminiMedici[i].val.replace(/\"/g,"''") +"\">"+ termineTrovato +"</a>";
          $('#p'+paragraphNumber).html(startText + popover + endText);
      }
}
//Messaggi di alert mostrati in un modal
function alertMessage(message){
  message = '<div class="row"><div class="col-2 pl-0"><img src="<?=PREPATH?>assets/img/doctor.PNG" height="90px"></div><div class="col-10 pt-4"><span>' + message + '</span></div></div>';
  $('#modalMessage').html(message);
  $('#alertModal').modal('show');
}
//Al sì della scellta finale prima dell'invio
function finalSubmit(){
  //salvo contenuto input text per metterlo nel report finale
  var input = $('.compile');
  var content = [];
  for(i=0; i<input.length; i++)
    content.push(input[i].value);
  var count = 0;
  text.sections.forEach(function(section) {
    section.paragraphs.forEach(function(paragraph) {
      while(paragraph.text.includes('<input type="')){
        var index = paragraph.text.indexOf('<input type="');
        if(index == paragraph.text.indexOf('<input type="date"'))
          paragraph.text = paragraph.text.replace(/<input type="date" class="compile" value="[0-9|\-]*">/, '__' + content[count] + '__');
        else
          paragraph.text = paragraph.text.replace('<input type="text" class="compile" style="font-family: Arial, FontAwesome; padding-left: 5px;" placeholder="&#xF040; ...">', '__' + content[count] + '__');
        count++;
      }
    });
  });
  localStorage.setItem("json", JSON.stringify(text));
  var report = localStorage.getItem('json');
  $.redirect('response.php', {'jsonReport':report});
}
// hide popover/tooltip aperto quando c'è scroll della pagina
$(window).scroll(function(){
    $('.popover').popover('hide');
    $('.bstooltip').tooltip('hide');
    document.activeElement.blur();
});
$('#myModal').scroll(function(){
    $('.popoverIndex').popover('hide');
    document.activeElement.blur();
});
// tooltip
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
$('.bstooltip').mouseenter(function(){
  var that = $(this)
  that.tooltip('show');
  setTimeout(function(){
    that.tooltip('hide');
  }, 5000);
});
$('.bstooltip').mouseleave(function(){
  $(this).tooltip('hide');
});
$('#myModal').appendTo("body")
//mette in pausa video quando si esce dal modal dell'Help
$('#myModal').on('hidden.bs.modal', function () {
    var myvid = document.getElementById("videoHelp");
    myvid.pause();
})
</script>
</body>
</html>