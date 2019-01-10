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
