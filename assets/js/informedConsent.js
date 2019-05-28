class InformedConsent {
  // costruttore del consenso informato
  constructor(title, footer, paragraphs) {
    this.readabilityIndexes = {};
    this.title = title;
    this.footer = footer;
    this.sections = new Array();
    this.accepted;
    this.fearful;
    this.confused;
    this.education;
	this.age;
	this.gender;
    this.setEducation();
	this.setAge();
	this.setGender();
    this.createParagraphs(paragraphs);
    this.readabilityScore();
    console.log(this);
  }

  // funzione che setta il valore di education
  setEducation(){
    var num = new URL(window.location.href).searchParams.get("education");
    if(num == 0)
      this.education = "Scuola dell'obbligo";
    if(num == 0.5)
      this.education = "Diploma";
    if(num == 1)
      this.education = "Laurea";
  }
  
  // funzione che setta il valore di age
  setAge(){
    this.age = new URL(window.location.href).searchParams.get("age");
  }
  
  // funzione che setta il valore di gender
  setGender(){
    this.gender = new URL(window.location.href).searchParams.get("gender");
  }

  // funzione che crea le sezioni ed i paragrafi
  createParagraphs(paragraphs) {
    var section_id = 1;
    var paragraph_id = 0;
    // Crea le sezioni
      if (!paragraphs[0].match(/\@\s*(.*)\@/)) {
        this.sections.push({
          id: section_id,
          title: '',
        });
        section_id++;
      }
    for (var i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i].match(/\@\s*(.*)\@/)) {
        this.sections.push({
          id: section_id,
          title: paragraphs[i],
        });
        section_id++;
      }
    }
    // Crea i paragrafi
    section_id = 0;
    var par = new Array();
    var re = new RegExp(String.fromCharCode(160), "g"); // FIXME: https://stackoverflow.com/questions/1495822/replacing-nbsp-from-javascript-dom-text-node
    for (var i = 0; i < paragraphs.length; i++) {
      if (!paragraphs[i].match(/\@\s*(.*)\@/)) {
        par.push({
          id: paragraph_id + 1,
          text: paragraphs[i].replace(re, ""),
          readabilityIndexes: {
            gulpease: gulpease(paragraphs[i]),
            costaCabitza : costaCabitza(paragraphs[i]),
          },
          reactions: [],
        });
        paragraph_id++;
      }
      if (paragraphs[i].match(/\@\s*(.*)\@/) && i != 0) {
        this.sections[section_id].paragraphs = par;
        par = new Array();
        section_id++;
      }
    }
    this.sections[section_id].paragraphs = par;
    par = new Array();
  }

  // funzione che calcola il valore della leggibilità
  readabilityScore() {
    var gulpease = 0;
    var costaCabitza = 0;
    var paragraphs_length = 0;
    for (var section of this.sections) {
      for (var i = 0; i < section.paragraphs.length; i++) {
        if (!jQuery.isEmptyObject(section.paragraphs[i].readabilityIndexes)) {
          gulpease += section.paragraphs[i].readabilityIndexes.gulpease;
          costaCabitza += section.paragraphs[i].readabilityIndexes.costaCabitza;
        }
        paragraphs_length += section.paragraphs.length;
      }
    }

    this.readabilityIndexes.gulpease = Math.round(gulpease / (paragraphs_length) * 100 / 5);
    this.readabilityIndexes.costaCabitza = Math.round(costaCabitza / (paragraphs_length) * 100 / 5);
  }

  // funzione che crea l'intestazione della pagina
  createHeader() {
    this.title.forEach(function(subtitle) {
      $("#header").append("<h4>" + subtitle + "</h4>");
    })
    if (this.footer)
    $("#header").append("<h5>\"" + this.footer + "\"</h5>");
    var headerHeight = $("#header").height();
    var briefingHeight = $("#briefing").height();
    var height = headerHeight + briefingHeight + 10;
    $("#text-body").css({
      "margin-top": (height + 'px')
    })
  }

  // funzione che mostra una sezione alla volta
  showSection(id) {
    $('#pdf-text').append('<div class="section" id="' + id + '-text"></div>');
    $('#readability-icon').append('<div class="section" id="' + id + '-readability"></div>');
    $('#readability-icon-empty').append('<div class="section" id="' + id + '-readability-empty"></div>');
    $('#reactions-button').append('<div class="section" id="' + id + '-reactions"></div>');
    var section = this.query('sections', 'id', id);
    this.paragraphsToHtml(section.title, section.paragraphs, id);
    this.readabilitySignHidden(section);
  }

  // funzione che trasforma i paragrafi in codice html
  paragraphsToHtml(title, paragraphs, id) {
    var text;
    var tmp = "";
    if (title != '') {
      for (var i = 1; i < title.length - 1; i++) {
        if (title[i] == '@') {
          tmp += '<br>';
        } else
        tmp += title[i];
      }
      text = $("<p id=\"" + id + "-title\" class=\"testo\"></p>").html(tmp);
      text.css({
        "font-weight": "bold",
        "text-align": "center"
      });
      $(".section[id=\"" + id + "-text\"]").append(text);
    }
    paragraphs.forEach(function(paragraph) {
		
	  // parse questions
	  if(paragraph.text.charAt(0) == '?'){
		var pSplit = paragraph.text.split("|");
		for(var i = 1; i < pSplit.length; i++){
			paragraph.text = paragraph.text.replace("|" + pSplit[i], ' <input type="radio" class="form-check-input" name="question' + paragraph.id + '" value="' + pSplit[i] + '">' + pSplit[i] + '</input>');
		}
		paragraph.text = paragraph.text.replace(pSplit[0], pSplit[0].substr(1) + '<br><div class="input-group form-check form-check-inline" style="display: block">');
		paragraph.text += "</div>";
	  }

      if(paragraph.text.includes("___")){
        //replace for input text
        paragraph.text = paragraph.text.replace(/_+/g,' <input type="text" class="compile" style="font-family: Arial, FontAwesome; padding-left: 5px;" placeholder="&#xF040; ...">')

        //replace for date
        var today = new Date().toISOString().substr(0, 10);
        var dates = ["Data","data"];
        dates.forEach(function(d){
          var reg = new RegExp(d + "[\" \"]*[:]* <input type=\"text\" [^>]*>", "g");
          paragraph.text = paragraph.text.replace(reg,'Data <input type="date" class="compile" value="'+ today +'">')
        });
      }
      text = $("<p id=\"p" + paragraph.id + "\" class=\"testo\"></p>").html( paragraph.text);
      $(".section[id=\"" + id + "-text\"]").append(text);
    });
  }

  // funzione che crea la div vuota dell'indicatore grafico di ciascun paragrafo della leggibilità
  readabilitySignHidden(section) {
    if (section.title != '') {
      var div = '<div id="empty-title' + section.id + '" class="hidden-div"></div>';
      $('#' + section.id + '-readability-empty').append(div);
      $('#empty-title' + section.id).css({
        'height': ($("#" + section.id + "-title").height() + 'px')
      });
    }
    for (var i = 0; i < section.paragraphs.length; i++) {
      var div = '<div id="empty-div' + section.paragraphs[i].id + '" class="hidden-div" style="height:' + $('#p' + section.paragraphs[i].id).height() + 'px "></div>';
      $('#' + section.id + '-readability-empty').append(div);
    }
    $('#' + section.id + '-readability-empty').hide();
  }

  // fuzione per l'ingradimento del testo
  zoomIn(section_id) {
    var fontSize = parseInt($('.testo').css('font-size').slice(0, -2));
    if (fontSize < 24){
      fontSize = fontSize + 2;
      $('.testo').css({
        'font-size': fontSize + 'px'
      });
    }
    var height = parseInt($('.reactionButton').css('height').slice(0, -2));
    if (height < 37) {
      $('.reactionButton').css({
        'width': height + 2 + 'px',
        'height': height + 2 + 'px'
      });
      $('.undo-trash').css({
        'width': height + 2 + 'px',
        'height': height + 2 + 'px'
      });
    }

    this.checkZoomDisable(fontSize);
    resetHeight();
  }

  // funzione per la diminuzione del testo
  zoomOut(section_id) {
    var fontSize = parseInt($('#pdf-text p').css('font-size').slice(0, -2));
    if (fontSize > 14){
      fontSize = fontSize - 2;
      $('#pdf-text p').css({
        'font-size': fontSize + 'px'
      });
    }
    var height = parseInt($('.reactionButton').css('height').slice(0, -2));
    if (height > 27) {
      $('.reactionButton').css({
        'width': parseInt(height) - 2 + 'px',
        'height': parseInt(height) - 2 + 'px'
      });
      $('.undo-trash').css({
        'width': height - 2 + 'px',
        'height': height - 2 + 'px',
      });
    }

    this.checkZoomDisable(fontSize);
    resetHeight();
  }

//funzione che controlla attributo disabled dello Zoom sul testo
checkZoomDisable(fontSize){
      if(fontSize >= 24)
        $('#zoomIn').attr("disabled", "disabled");
      else
        $('#zoomIn').removeAttr("disabled");

      if(fontSize <= 14)
        $('#zoomOut').attr("disabled", "disabled");
      else
        $('#zoomOut').removeAttr("disabled");

        $('.bstooltip').tooltip('hide');
  }

  BGOnReadability(readabilityCode, section_id) {
    var section = this.query('sections', 'id', section_id);
    for (var i = 0; i < section.paragraphs.length; i++) {
      var paragraph = section.paragraphs[i];
      var idReadability = (readabilityCode == 1) ? paragraph.readabilityIndexes.gulpease : paragraph.readabilityIndexes.costaCabitza;
      this.changeBGParagraph(idReadability, paragraph.id);
    }
  }

// funzione per sfondo paragrafi
  changeBGParagraph(idReadability, paragraphNumber) {
    switch (6 - idReadability) {
      case 1:
      $("#p" + paragraphNumber).css({
        "background-color": "#f9f9f9"
      });
      break;
      case 2:
      $("#p" + paragraphNumber).css({
        "background-color": "#e5e5e5"
      });
      break;
      case 3:
      $("#p" + paragraphNumber).css({
        "background-color": "#cccccc"
      });
      break;
      case 4:
      $("#p" + paragraphNumber).css({
        "background-color": "#a8a8a8"
      });
      break;
      case 5:
      $("#p" + paragraphNumber).css({
        "background-color": "#8c8c8c"
      });
      break;
      default:$("#p" + paragraphNumber).css({
        "background-color": "#ffffff"
      });
    }
  }


  BGReset(section_id) {
    var section = this.query('sections', 'id', section_id);
    for (var i = 0; i < section.paragraphs.length; i++) {
      this.changeBGParagraph(0, section.paragraphs[i].id);
    }
  }

// funzione per barra facilità lettura
  readabilitySign(readabilityCode, section_id) {
    var section = this.query('sections', 'id', section_id);
    $('.section[id="' + section.id + '-readability"]').html(""); //azzero prima di riempire
    if (section.title != '') {
      $('.section[id="' + section.id + '-readability"]').append("<div class=\"readability\" id=\"readability-title" + section_id + "\" align=\"center\"></div>");
      $("#readability-title" + section_id).css({
        'height': ($("#" + section_id + "-title").height() + 12)
      });
    }
    section.paragraphs.forEach(function(paragraph) {
      $('.section[id="' + section.id + '-readability"]').append("<div class=\"readability\" id=\"readabilityParagraph" + paragraph.id + "\" align=\"center\"></div>");
      $("#readabilityParagraph" + paragraph.id).css({
        'height': ($("#p" + paragraph.id).height() + 12)
      });

      var idReadability = 0;
      switch (readabilityCode) {
        case 1: idReadability = paragraph.readabilityIndexes.gulpease;
          break;
        case 2: idReadability = paragraph.readabilityIndexes.costaCabitza;
          break;
        default:
      }
      switch (idReadability) {
        case 5:
        $("#readabilityParagraph" + paragraph.id).append(
          '<div class="progress" id="pb'+paragraph.id+'"><div class="progress-bar progress-bar-striped" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div>'
        );
        break;
        case 4:
        $("#readabilityParagraph" + paragraph.id).append(
          '<div class="progress" id="pb'+paragraph.id+'"><div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div></div>'
        );
        break;
        case 3:
        $("#readabilityParagraph" + paragraph.id).append(
          '<div class="progress" id="pb'+paragraph.id+'"><div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div></div>'
        );
        break;
        case 2:
        $("#readabilityParagraph" + paragraph.id).append(
          '<div class="progress" id="pb'+paragraph.id+'"><div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div></div>'
        );
        break;
        case 1:
        $("#readabilityParagraph" + paragraph.id).append(
          '<div class="progress" id="pb'+paragraph.id+'"><div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div></div>'
        );
        break;
        default:
      }
      // allineamento verticale
      $("#pb" + paragraph.id).css({'margin-top' : ($("#readabilityParagraph" + paragraph.id).height() / 2 - 10)});
    })
  }


  // funzione per mostrare l'indicatore grafico di ciascun paragrafo della leggibilità
  showIcons(id) {
    $('.section[id="' + id + '-readability"]').show();
    $("#readability-icon").show();
    $("#readability-icon-empty").hide();
  }


  // funzione per nascondere l'indicatore grafico di ciascun paragrafo della leggibilità
  hideIcons(id) {
    $('.section[id="' + id + '-readability"]').hide();
    $("#readability-icon").hide();
    $("#readability-icon-empty").show();
  }


  // funzione che crea per ciascun paragrafo le tre icone relative alle reazioni
  paragraphIcon(section_id) {
    var section = this.query('sections', 'id', section_id);
    if (section.title != '') {
      $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"reactions-title" + section_id + "\" align=\"center\"></div>");
      $("#reactions-title" + section_id).css({
        'height': ($("#" + section_id + "-title").height() + 41 + 'px')
      });
    }
    section.paragraphs.forEach(function(paragraph) {
      if (!jQuery.isEmptyObject(paragraph.readabilityIndexes)) {
        $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({
          'height': ($("#p" + paragraph.id).height() + 41 + 'px')
        });
        $("#paragraphReactions" + paragraph.id).css({'margin':'10px 0px'});
        $("#paragraphReactions" + paragraph.id).css({'padding':'5px'});
        $("#paragraphReactions" + paragraph.id).append("<div class='col-4 text-center m-0 p-0'style='float:left'><input type=\"image\" class=\"reactionButton\" data-id=\"" + paragraph.id + "\" data-type=\"1\" src=\"assets/img/Fearful_Face_Emoji.png\"></div>");
        $("#paragraphReactions" + paragraph.id).append("<div class='col-4 text-center m-0 p-0'style='float:left'><input type=\"image\" class=\"reactionButton\" data-id=\"" + paragraph.id + "\" data-type=\"2\" src=\"assets/img/Confused_Face_Emoji.png\"></div>");
        $("#paragraphReactions" + paragraph.id).append("<div class='col-4 text-center m-0 p-0'style='float:left'><button id=\"undo" + paragraph.id + "\" class=\"btn btn-circle undo\" onclick=\"text.clearReaction(" + paragraph.id + ",  " + section_id + "); text.checkReactions()\" disabled><i class=\"fas fa-trash-alt fa-lg undo-trash\" aria-hidden=\"true\"></i></button></div>");
      } else {
        $('.section[id="' + section.id + '-reactions"]').append("<div class=\"reactions\" id=\"paragraphReactions" + paragraph.id + "\"></div>");
        $("#paragraphReactions" + paragraph.id).css({
          'height': ($("#p" + paragraph.id).height() + 41 + 'px')
        });
        $("#paragraphReactions" + paragraph.id).css({'margin':'10px 0px'});
        $("#paragraphReactions" + paragraph.id).css({'padding':'5px'});
      }
    })
    $('.section[id="' + section.id + '-reactions"]').hide();
  }


  // funzione che cancella le reazioni di un paragrafo
  clearReaction(paragraphNumber, section_id) {

    //salvo contenuto input text e lo rimetto nella input dopo highlight
    var input = $('.compile');
    var content = [];
    for(i=0; i<input.length; i++)
      content.push(input[i].value);

    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (paragraph.id == paragraphNumber)
          paragraph.reactions = [];
        })
      }
    })
    var text = $("#p" + paragraphNumber).html();
    text = text.replace(/<span class="firstHighlight">/g,"");
    text = text.replace(/<span class="secondHighlight">/g,"");
    text = text.replace(/<\/span>/g,"");
    $("#p" + paragraphNumber).html(text);
    $('#undo' + paragraphNumber).prop('disabled', true);

    //sistemo input con i loro precedente valore
    $('.compile').each(function(i){
      this.value = content[i];
    });
    trovaTerminiMedici(paragraphNumber);
  }


  // funzione che resetta le reazioni di una sezione
  resetReactions() {
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions)) {
            text.clearReaction(paragraph.id, current_section);
            $('#resetReactions').prop('disabled', true);
          }
        })
      }
    })
    var disable = false;
    if (current_section == this.sections.length) {
      this.sections.forEach(function(section) {
        section.paragraphs.forEach(function(paragraph) {
          if (!jQuery.isEmptyObject(paragraph.reactions))
          disable = !disable;
        })
      })
    }
    $('#agree').attr('disabled', disable);
    $('#disagree').prop('checked', disable);
    $('#finalSubmit').attr('disabled', !disable);
  }

  // funzione che permette di evidenziare il testo dei paragrafi
  highlightText(paragraphNumber, number) {

    //salvo contenuto input text e lo rimetto nella input dopo highlight
    var input = $('.compile');
    var content = [];
    for(i=0; i<input.length; i++)
      content.push(input[i].value);

    if (window.getSelection().isCollapsed == false) {

      var selectedText = window.getSelection().getRangeAt(0);
      var parent = document.getSelection().anchorNode.parentNode;
      if(parent.tagName == 'A')
        parent = document.getSelection().anchorNode.parentNode.parentNode;
      var idParent = parent.getAttribute("id");

      if(selectedText.startOffset != 0){
        //controllo se sto selezionando il popover
        while(selectedText.startContainer.parentNode.className == "popoverMedico" || selectedText.endContainer.parentNode.className == "popoverMedico"){

            //amplio selezione per non tagliare a metà la parola del popover
            var backward = false;
            if (selectedText.startContainer.parentNode.className == "popoverMedico")
              backward = true;

            selectedText = window.getSelection();
            if(backward){
              selectedText.modify("extend","backward","character");
            }
            else
              selectedText.modify("extend","forward","character");

            selectedText = selectedText.getRangeAt(0);
        }
      }else {
        while(selectedText.endContainer.parentNode.className == "popoverMedico"){
          selectedText = window.getSelection();
          selectedText.modify("extend","forward","character");
          selectedText = selectedText.getRangeAt(0);
        }
        selectedText = window.getSelection();
        selectedText.modify("extend","left","character");
        selectedText = selectedText.getRangeAt(0);
      }


      //check transParagraphsSelection
      if(window.getSelection().toString().match(/[\n\n$]/)) {
        this.transParagraphsSelection(selectedText, paragraphNumber, number);

        //sistemo input con i loro precedenti valori
        $('.compile').each(function(i){
          this.value = content[i];
        });
        return;
      }

      //check already selected
      if(document.getSelection().anchorNode.parentNode.tagName == 'SPAN'){
        alertMessage('Puoi selezionare solo parti di testo che non hai già selezionato!');
        console.log("errore n° 1");
        return;
      }

      if(idParent !=  "p"+paragraphNumber){
        alertMessage("La reazione cliccata non si riferisce al paragrafo evidenziato!");
        console.log("errore n° 2");
        return;
      }

      var paragraphText = $("#p" + paragraphNumber).html();
      //prendo tutto l'html ma non i tag dei popover
      paragraphText = paragraphText.replace(/<a[^>]*>/g,"");
      paragraphText = paragraphText.replace(/<\/a>/g,"");
      //e gli input box
      paragraphText = paragraphText.replace(/<input type[^>]*>/g,"");

      if(!paragraphText.includes(selectedText)){
        alertMessage('Puoi selezionare solo parti di testo che non hai già selezionato!');
         console.log("errore n° 3");
         return;
      }

      if(window.getSelection().toString() == $('#p' + paragraphNumber).text())
        this.highlightWithoutSelection(paragraphNumber, number);
      else {
        var selection = {};
        selection.selection = window.getSelection().toString();
        this.paragraphReaction(number, selection);
        this.sections.forEach(function(section) {
          if (section.id == current_section) {
            section.paragraphs.forEach(function(paragraph) {
              if (paragraph.id == paragraphNumber)
              paragraph.reactions.push(selection);
            })
          }
        })

        var highlight = document.createElement("span");
        if(number == 1)
          highlight.setAttribute("class","firstHighlight");
        else
          highlight.setAttribute("class","secondHighlight");

        selectedText.surroundContents(highlight);
        $('#undo' + paragraphNumber).prop('disabled', false);
      }

    }else {
      this.highlightWithoutSelection(paragraphNumber, number);
      $('#undo' + paragraphNumber).prop('disabled', false);
    }

    // fatto l'highlight del testo tolgo l'evidenziazione nella finestra
    window.getSelection().removeAllRanges();

    //sistemo input con i loro precedenti valori
    $('.compile').each(function(i){
      this.value = content[i];
    });
  }

  // funzione che permette di evidenziare il testo di più paragrafi contemporaneamente
  transParagraphsSelection(selectedText, paragraphNumber, number) {

    var highlightText = window.getSelection().toString();
    highlightText = highlightText.replace(/\r\n\r\n/g,"\n\n");
    highlightText = highlightText.replace(/<a[^>]*>/g,"");
    highlightText = highlightText.replace(/<\/a>/g,"");
    //replace for input box
    highlightText = highlightText.replace(/[ ]{2}/g,' <input type="text" class="compile" style="font-family: Arial, FontAwesome; padding-left: 5px;" placeholder="&#xF040; ...">');
    //replace for date
    var today = new Date().toISOString().substr(0, 10);
    var dates = ["Data","data"];
    dates.forEach(function(d){
      var reg = new RegExp(d + "[\" \"]*[:]* <input type=\"text\" [^>]*>", "g");
      highlightText = highlightText.replace(reg,'Data <input type="date" class="compile" value="'+ today +'">')
    });

    highlightText = highlightText.split("\n\n");
    var parent= selectedText.startContainer.parentNode;
    var idParent = parent.getAttribute("id");
    idParent = idParent == null ? parent.parentNode.getAttribute("id") : idParent;
    var numberOfParagraph = parseInt(idParent.match(/\d+/));
    var check = true;

    var count = 0;
    for (var i = numberOfParagraph; i < highlightText.length + numberOfParagraph; i++) {
      var text = $('#p' + i).html();
      //prendo tutto l'html ma non i tag dei popover
      text = text.replace(/<a[^>]*>/g,"");
      text = text.replace(/<\/a>/g,"");

      if(count == 0)
        if(highlightText[count].includes("<input type")){
          var ns = highlightText[count].substr(0, highlightText[count].indexOf("<input type") - 1);
          var start = text.lastIndexOf(ns);
        }
        else
          var start = text.lastIndexOf(highlightText[count]);
      else
        var start = 0;
      var end = start + highlightText[count].length;

      if(this.checkAlreadySelected(text, start, end)){
        alertMessage('Puoi selezionare solo parti di testo che non hai già selezionato!');
        console.log("errore n° 4");
        return;
      }
      count++;
    }
    count = 0;
    for (var i = numberOfParagraph; i < highlightText.length+numberOfParagraph; i++) {
      var text = $('#p' + i).html();
      //prendo tutto l'html ma non i tag dei popover
      text = text.replace(/<a[^>]*>/g,"");
      text = text.replace(/<\/a>/g,"");

      if(count == 0)
        if(highlightText[count].includes("<input type")){
          var ns = highlightText[count].substr(0, highlightText[count].indexOf("<input type") - 1);
          var start = text.lastIndexOf(ns);
        }
        else
          var start = text.lastIndexOf(highlightText[count]);
      else
        var start = 0;
      var end = start + highlightText[count].length;
      if(number == 1)
        var spn = '<span class="firstHighlight">' + highlightText[count] + '</span>';
      else
        var spn = '<span class="secondHighlight">' + highlightText[count] + '</span>';
      var startText = text.substring(0, start),
      endText = text.substring(end, text.length);

      $('#p' + i).html(startText + spn + endText);
      if(start != end){
        var selection = {};
        if(i != numberOfParagraph || i != (highlightText.length + numberOfParagraph - 1)){
          var text = $('#p' + i).text();
          if(text == highlightText[count])
            selection.selection = "Paragrafo intero";
          else
            selection.selection = highlightText[count];

          this.paragraphReaction(number, selection);
          $('#undo' + i).prop('disabled', false);

        } else {
          selection.selection = "Paragrafo intero";
          this.paragraphReaction(number, selection);
        }
        this.sections.forEach(function(section) {
          if (section.id == current_section) {
            section.paragraphs.forEach(function(paragraph) {
              if (paragraph.id == i)
              paragraph.reactions.push(selection);
            })
          }
        })
        trovaTerminiMedici(i);
      }
      count++;
    }
    window.getSelection().removeAllRanges();
  }


  checkAlreadySelected(text, start, end){
    if(start == -1)
       return true;
    if(text.substring(start,end + 4).includes("<span"))
      return true;
    if(text.substring(start,end + 7).includes("</span>"))
      return true;
    return false;
  }

  // funzione che attribuisce alla selezione la descrizione della reazione necessaria per il report
  paragraphReaction(number, selection) {
    if (number == 1) {
      selection.selectionChoice = "Mi fa paura";
    } else {
      selection.selectionChoice = "Non ho capito";
    }
  }

  // funzione per l'aggiunta di una reazione senza la selezione
  highlightWithoutSelection(paragraphNumber, number) {

    this.clearReaction(paragraphNumber);
    var text = $('#p' + paragraphNumber).html();
    if (number == 1)
      var spn = '<span class="firstHighlight">' + text + '</span>';
    else
      var spn = '<span class="secondHighlight">' + text + '</span>';
    $('#p' + paragraphNumber).html(spn);
    var selection = {};
    selection.selection = "Paragrafo intero";
    this.paragraphReaction(number, selection);
    this.sections.forEach(function(section) {
      if (section.id == current_section) {
        section.paragraphs.forEach(function(paragraph) {
          if (paragraph.id == paragraphNumber)
          paragraph.reactions.push(selection);
        })
      }
    })
    trovaTerminiMedici(paragraphNumber);
  }

  // funzione per controllare se sono state aggiunte delle reazioni durante la lettura
  checkReactions() {

    var found = false;
    this.sections.forEach(function(section) {
      for (var i = 0; i < section.paragraphs.length; i++) {
        if (section.paragraphs[i].reactions.length != 0) {
          $('#agree').attr('disabled', true);
          $('#agree').prop('checked', false);
          $('#agreeLabel').addClass("text-muted");
          $('#disagree').prop('checked', true);
          $('#disagree').click();
          found = true;
        } else if (found == false) {
          $('#agree').attr('disabled', false);
          $('#agree').prop('checked', false);
          $('#agreeLabel').removeClass("text-muted");
          $('#disagree').prop('checked', false);
          $('#finalSubmit').attr('disabled', true);
        }
      }
    });

    var section = this.sections[current_section - 1];
    var bool = true;
    for (var i = 0; i < section.paragraphs.length; i++) {
      if (section.paragraphs[i].reactions.length != 0) {
        $('#resetReactions').prop('disabled', false);
        $("#carousel"+ current_section).html('<i class="fas fa-tasks"></i>');
        bool = false;
      }
    }
    if(bool){
      $('#resetReactions').prop('disabled', true);
      $("#carousel"+ current_section).html('<i class="fas fa-tasks" style="opacity: 0.0;"></i>');
    }
  }


  agreed(choice) {
    this.accepted = choice;
  }


  // funzione che crea le progress bar
  createProgressBar() {
    var percentage = Math.floor(1 / (this.sections.length) * 100);
    if(percentage == 100) //progress a 100% solo dopo invio CI
      percentage = 99;
    var progressBar =
    '<div class="progress" style="height: 30px;">' +
      '<div id="slider-progress" class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="' + percentage + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + percentage + '%;"></div>' +
      '<div class="progress-bar-title pt-2">' + percentage + '% Completato</div>' +
    '</div>';
    $('#progressBar').html(progressBar);
  }


  // funzione per aggiornare le progress bar
  updateProgressBar(section_id) {
    var percentage = Math.round(section_id / (this.sections.length) * 100);
    if(percentage == 100) //progress a 100% solo dopo invio CI
      percentage = 99;
    $('#slider-progress').attr('aria-valuenow', percentage);
    $('#slider-progress').css('aria-valuenow', percentage);
    $('#slider-progress').css({
      'width': percentage + '%'
    });
    $('.progress-bar-title').text(percentage + '% Completato');
  }


  // query fondametale per l'utilizzo di molte funzioni
  query(object, attribute = null, value = null, parent = this) {
    if (Array.isArray(parent) && typeof parent[0] == 'object') {
      for (var i = 0; i < parent.length; i++) {
        var result = this.query(object, attribute, value, parent[i]);
        if (result)
        return result;
      }
    }
    if (object in parent) {
      if (attribute == null) {
        return parent[object];
      } else {
        for (var i = 0; i < parent[object].length; i++) {
          if (attribute in parent[object][i]) {
            if (parent[object][i][attribute] == value) {
              return parent[object][i];
            }
          }
        }
        return undefined;
      }
    }
    var properties = Object.getOwnPropertyNames(parent);
    for (var j = 0; j < properties.length; j++) {
      var property = properties[j];
      if (Array.isArray(parent[property]) && typeof parent[property] != 'string') {
        var result = this.query(object, attribute, value, parent[property]);
        if (result)
        return result;
      }
    }
  }

}
