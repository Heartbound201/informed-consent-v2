var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


// funzione principale per la costruzione della pagina html
function buildpage() {

  var urlParameter = getUrlParameter('redirectTo');
  if (urlParameter.match(/\.txt$/)) {
    text = txtToText(urlParameter);
    text = textToParagraph(text);
  } else if (urlParameter.match(/\.html$/)) {
    text = htmlToText(urlParameter);
  }
  text.createHeader();

  for (section of text.sections) {
    text.showSection(section.id);
    text.paragraphIcon(section.id);
    $(".section[id=\"" + section.id + "-text\"]").hide();
  }
  showSelectedSection();
  text.createProgressBar();

  var readability;

  $('#gulpease').click(function(){
     readability = 1;
       text.readabilitySign(readability, current_section);
       text.BGOnReadability(readability, current_section);
       $("#buttonBG").bootstrapSwitch("disabled", false);
       $("#buttonBG").bootstrapSwitch('state', true);
       $("#sfondoTooltip").tooltip('enable');
       $("#letturaTooltip").tooltip('enable');
       $("#readability-icon").show();
       $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", false);
       $("[name='buttonReadabilityCircles']").bootstrapSwitch('state', true);
  });

  $('#costaCabitza').click(function(){
      readability = 2;
        text.readabilitySign(readability, current_section);
        text.BGOnReadability(readability, current_section);
        $("#buttonBG").bootstrapSwitch("disabled", false);
        $("#buttonBG").bootstrapSwitch('state', true);
        $("#sfondoTooltip").tooltip('enable');
        $("#letturaTooltip").tooltip('enable');
        $("#readability-icon").show();
        $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", false);
        $("[name='buttonReadabilityCircles']").bootstrapSwitch('state', true);

  });

  $('#noIndex').click(function(){
      text.BGReset(current_section);
      $("#readability-icon").hide();
      $("#readability-icon-empty").show();
      $("#readability-icon").children().each(function() {
        $(this).empty()
      });
      $('.section[id="' + current_section + '-readability"]').hide()
      $("#buttonBG").bootstrapSwitch('state', false);
      $("#buttonBG").bootstrapSwitch("disabled", true);
      $("#sfondoTooltip").tooltip('disable');
      $("#letturaTooltip").tooltip('disable');
      $("[name='buttonReadabilityCircles']").bootstrapSwitch('state', false);
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", true);
  });

  $.fn.bootstrapSwitch.defaults.onColor = 'success';
  $.fn.bootstrapSwitch.defaults.offColor = 'danger';
  $.fn.bootstrapSwitch.defaults.size = 'medium';

  $("#resetReactions").css({
    "margin-top": ($("#header").height() - $("#resetReactions").height() - 25 + 'px')
  });

  $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>');
  $("[name='buttonReadabilityCircles']").bootstrapSwitch("disabled", true);
  $("[name='buttonReadabilityCircles']").on('switchChange.bootstrapSwitch', function() {
    if ($(".bootstrap-switch-id-buttonReadabilityCircles").hasClass("bootstrap-switch-on")) {
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye fa-lg" aria-hidden="true"></i>');
      text.showIcons(current_section);
    } else {
      $("[name='buttonReadabilityCircles']").bootstrapSwitch("labelText", '<i class="fa fa-eye-slash fa-lg" aria-hidden="true"></i>');
      text.hideIcons(current_section);
    }
    indexOff();
  });

  $("#buttonBG").on('switchChange.bootstrapSwitch', function() {
    buttonBG();
  });


  $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="far fa-image fa-lg" aria-hidden="true"></i>');
  $("[name='buttonBG']").on('switchChange.bootstrapSwitch', buttonBG);

  function buttonBG() {
    if ($(".bootstrap-switch-id-buttonBG").hasClass("bootstrap-switch-on")) {
      $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="fas fa-image fa-lg" aria-hidden="true"><i>');
      text.BGOnReadability(readability, current_section);
    } else {
      $("[name='buttonBG']").bootstrapSwitch("labelText", '<i class="far fa-image fa-lg" aria-hidden="true"></i>');
      text.BGReset(current_section);
    }
    indexOff();
  }

  function indexOff(){
    if($(".bootstrap-switch-id-buttonBG").hasClass("bootstrap-switch-off") && $(".bootstrap-switch-id-buttonReadabilityCircles").hasClass("bootstrap-switch-off")) {
      $("#noIndex").focus();
      $("#noIndex").click();
    }
  }

  $('#agree').on('click', function() {
    $('#finalSubmit').attr('disabled', false);
    text.agreed(true);
  });
  $('#disagree').on('click', function() {
    $('#finalSubmit').attr('disabled', false);
    text.agreed(false);
  });

  $('#finalSubmit').click(function() {
    text.fearful = $('input[name=fearful]:checked').val();
    text.confused = $('input[name=confused]:checked').val();

    if(text.fearful != undefined && text.confused != undefined){
      if(text.accepted == true)
        $('#patientChoice').html("Hai scelto di <span style='font-weight: 600;'>Acconsentire</span> a quanto scritto nel Consenso Informato.");
      else
        $('#patientChoice').html("Hai scelto di <span style='font-weight: 600;'>NON Acconsentire</span> a quanto scritto nel Consenso Informato.");

      $('#confirm').modal('show');
    }
    else{
      $('#messageFinal').html('<div class="col-auto alert alert-danger alert-dismissible fade show mt-3" role="alert">'+
          '<strong><i class="fas fa-exclamation-triangle"></i>&emsp;Attenzione!&emsp;</strong>-&emsp;Rispondere alle seguenti domande prima di procedere.'+
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span></button></div>'
      );
    }
  });

  $('#renderingText').remove();

  $('#zoomIn').on('click', text.zoomIn(current_section));
  $('#zoomOut').on('click', text.zoomOut(current_section));

  $('.reactionButton').click(function() {
    text.highlightText($(this).data('id'), $(this).data('type'));
    text.checkReactions();
  });

  $('#resetReactions').click(function() {
    text.resetReactions();
    text.checkReactions();
    this.blur();
    $('.bstooltip').tooltip('hide');
  });

  //funzione che aggiunge la reazione Sono Preoccupato a tutti i paragrafi della sezione corrente
  $('#sectionSonoPreoccupato').click(function(){
    for(i=0; i < text.sections[current_section - 1].paragraphs.length; i++){
      var paragraphNumber = text.sections[current_section - 1].paragraphs[i].id;
    }
    while(paragraphNumber >= text.sections[current_section - 1].paragraphs[0].id){
      text.highlightText(paragraphNumber, 1);
      paragraphNumber--;
    }
    text.checkReactions();
    this.blur();
    $('.bstooltip').tooltip('hide');
  });

  //funzione che aggiunge la reazione Non Ho Capito a tutti i paragrafi della sezione corrente
  $('#sectionNonHoCapito').click(function(){
     for(i=0; i < text.sections[current_section - 1].paragraphs.length; i++){
       var paragraphNumber = text.sections[current_section - 1].paragraphs[i].id;
    }
    while(paragraphNumber >= text.sections[current_section - 1].paragraphs[0].id){
      text.highlightText(paragraphNumber, 2);
      paragraphNumber--;
    }
    text.checkReactions();
    this.blur();
    $('.bstooltip').tooltip('hide');
  });

  function showSelectedSection() {
    if (current_section != 1) {
      $('.section[id="' + (current_section - 1) + '-text"]').hide();
      $('.section[id="' + (current_section - 1) + '-reactions"]').hide();
      $('#' + (current_section - 1) + '-readability-empty').hide();
    }
    $('.section[id="' + current_section + '-text"]').show();
    $('.section[id="' + current_section + '-reactions"]').show();
    $('#' + current_section + '-readability-empty').show();
  }

  $('#avanti').click(function() {
    current_section++;
    showSelectedSection();
    text.updateProgressBar(current_section);
    $("#carousel"+ current_section).addClass("active");
    $("#carousel"+ (current_section - 1) ).removeClass("active");
    $("#noIndex").focus();
    $("#noIndex").click();
    $("#indietro").show();
    jQuery('html,body').animate({
      scrollTop: 0
    }, 0);
    if (current_section == text.sections.length) {
      $('#final').removeAttr('hidden');
      $("#avanti").hide();
    }
    resetHeight();
    var disable = true;
    text.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions)){
            disable = false;
          }
        })
      }
    })
    $('#resetReactions').prop('disabled', disable);
  })

  $('#indietro').click(function() {
    $('.section[id="' + (current_section) + '-text"]').hide();
    $('.section[id="' + (current_section) + '-reactions"]').hide();
    $('#' + (current_section) + '-readability-empty').hide();
    current_section--;
    showSelectedSection();
    text.updateProgressBar(current_section);
    $("#carousel"+ current_section).addClass("active");
    $("#carousel"+ (current_section + 1) ).removeClass("active");
    $("#noIndex").focus();
    $("#noIndex").click();
    jQuery('html,body').animate({
      scrollTop: 0
    }, 0);
    if (current_section == 1) {
      $("#indietro").hide();
    }
    if (current_section != text.sections.length) {
      $('#final').attr('hidden', true);
      $("#avanti").show();
    }
    resetHeight();
    var disable = true;
    text.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions)){
            disable = false;
          }
        })
      }
    })
    $('#resetReactions').prop('disabled', disable);
  })

}

// CLA - mobile version changes

// Paragraphs visible in viewport and relative visibility percentage
var visible_paragraphs = {};
// Visible paragraphs bounding boxes
var paragraphs_bboxes = {};

function calculateVisibilityForParagraph(par) {
    var windowHeight = $(window).height(),
        docScroll = $(document).scrollTop(),
        pPosition = par.offset().top,
        pHeight = par.height(),
        hiddenBefore = docScroll - pPosition,
        hiddenAfter = (pPosition + pHeight) - (docScroll + windowHeight);

    if ((docScroll > pPosition + pHeight) || (pPosition > docScroll + windowHeight)) {
        return 0;
    } else {
        var result = 100;

        if (hiddenBefore > 0) {
            result -= (hiddenBefore * 100) / pHeight;
        }

        if (hiddenAfter > 0) {
            result -= (hiddenAfter * 100) / pHeight;
        }

        return result;
    }
}

function calculateAndDisplayForAllParagraphs() {
    var paragraphs = [];
    $('p.testo').each(function () {
        var par = $(this);
        var paragraph = {};
        visible_paragraphs[par.attr('id')] = calculateVisibilityForParagraph(par);
        paragraphs_bboxes[par.attr('id')] = par[0].getBoundingClientRect();
        paragraph['id'] = par.attr('id');
        paragraph['text'] = par.text();
        paragraph['visibility'] = calculateVisibilityForParagraph(par);
        paragraph['boundingbox'] = par[0].getBoundingClientRect();
        paragraphs.push(paragraph);
    });
    return paragraphs;
}

function predictCurrentParagraph(){
    var filtered_paragraphs = Object.keys(visible_paragraphs).reduce(function (filtered, key) {
        if (visible_paragraphs[key] > 0) filtered[key] = visible_paragraphs[key];
        return filtered;
    }, {});
    var filtered_bboxes = Object.keys(paragraphs_bboxes).reduce(function (filtered, key) {
        if (filtered_paragraphs[key] != null) filtered[key] = paragraphs_bboxes[key];
        return filtered;
    }, {});
    var gaze_position = webgazer.getCurrentPrediction();
    var max = null;
    var predicted_paragraph = Object.keys(filtered_bboxes).forEach(function (key) {
        if(max == null || filtered_paragraphs[key] > filtered_paragraphs[max])
        {
            max = key;
        }
        if( gaze_position != null &&
            gaze_position.x >= filtered_bboxes[key].x &&
            gaze_position.x <= filtered_bboxes[key].x + filtered_bboxes[key].width &&
            gaze_position.y >= filtered_bboxes[key].y &&
            gaze_position.y <= filtered_bboxes[key].y + filtered_bboxes[key].height)
        {
            return key;
        }
    });
    return predicted_paragraph ? predicted_paragraph : max;
}

function trackSession(){
    Native.trackWebSession(new Date().getTime(), window.location.href)
	Native.startStreaming();
}

function androidNativeInterfaceCall() {
   Native.trackJavascriptData(new Date().getTime(), JSON.stringify(calculateAndDisplayForAllParagraphs()), JSON.stringify(getEyePrediction()));
}


$(document).scroll(function () {
    calculateAndDisplayForAllParagraphs();
});

function getEyePrediction(){
    var ret = {};
    var pred = webgazer.getCurrentPrediction();
    if(pred == null){
        return ret;
    }
    ret['x'] = pred.x;
    ret['y'] = pred.y;
    return ret;
}

window.onload = function() {

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
		.showFaceOverlay(false)
        .showVideo(false)
        .showFaceFeedbackBox(false);


	trackSession();
	calculateAndDisplayForAllParagraphs();
	setInterval(androidNativeInterfaceCall, 500);
};

window.onbeforeunload = function() {
    webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    //window.localStorage.clear(); //Comment out if you want to save data across different sessions
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
}

