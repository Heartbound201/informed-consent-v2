this.gulpease = function(text) {
  var lettersNumber = 0;
  var wordsNumber = 1;
  var sentencesNumber = 0;
  for (i = 0; i < text.length; i++) {
    if (text[i].match(/[a-zA-Z0-9àèéìòù%€$£]/)) {
      lettersNumber++;
    }
    if (text[i].match(/[ \t]/)) {
      wordsNumber++;
    }
    if (text[i].match(/[.!?]/) && (text[i] !== text[i + 1])) {
      sentencesNumber++;
    }
  }

  if (wordsNumber < 5)
    return null;
  var gulpease = 89 + (300 * sentencesNumber - 10 * lettersNumber) / wordsNumber;
  gulpease = gulpease * 5 / 100;
  //console.log(text + "\nlettere:"+lettersNumber + "\nparole:"+wordsNumber + "\nfrasi:"+sentencesNumber + "\n"+ Math.ceil(gulpease));
  return Math.ceil(gulpease);
}


var wrd_DeMauro = [];
this.costaCabitza = function(text) {

  var url = new URL(window.location.href);
  var education = url.searchParams.get("education");

  var diffwrd_vocab, medwrd_vocab, periods_words;

  var wrd_total = 1;
  var periods = 0;
  for (i = 0; i < text.length; i++) {
    if (text[i].match(/[.!?]/) && (text[i] !== text[i + 1]))
      periods++;
  }

  //il paragrafo potrebbe non contenere frasi che termimna con .!? ma vale comunque come 1 periodo
  if(periods == 0)
    periods = 1;

  var wrd_difficili = 0, wrd_univoche = [];
  var parole = text.replace(/\/|\“|\”|\’|\"|,|\.|:|;|_|\'|\(|\)|\[|\]/g," ");
  parole = parole.split(" ");

  wrd_total = parole.length;
  for ( i = 0; i < parole.length; i++) {
    if(parole[i] == "" || parole[i] == " ")
      wrd_total--;
    if(wrd_univoche.indexOf(parole[i].toLowerCase()) == -1 && parole[i] != "" && parole[i] != " ")
      wrd_univoche.push(parole[i].toLowerCase());
  }

  if (wrd_total < 5)
    return null;

  for ( i = 0; i < wrd_univoche.length; i++) {
    //conto parole difficili considerando maschile, femminile, singolare e plurale
    if(!wrd_univoche[i].match(/[0-9]+/) && wrd_univoche[i].length > 1){
      var wrd = [];
      if(wrd_univoche[i].length > 3){
        wrd[0] = wrd_univoche[i].substr(0 , wrd_univoche[i].length - 1) + 'a' ;
        wrd[1] = wrd_univoche[i].substr(0 , wrd_univoche[i].length - 1) + 'e' ;
        wrd[2] = wrd_univoche[i].substr(0 , wrd_univoche[i].length - 1) + 'i' ;
        wrd[3] = wrd_univoche[i].substr(0 , wrd_univoche[i].length - 1) + 'o' ;
      }
      if(wrd_DeMauro.indexOf(wrd_univoche[i]) == -1 && wrd_DeMauro.indexOf(wrd[0]) == -1 && wrd_DeMauro.indexOf(wrd[1]) == -1 && wrd_DeMauro.indexOf(wrd[2]) == -1 && wrd_DeMauro.indexOf(wrd[3]) == -1){
        wrd_difficili++;
      }
    }
  }

  var wrd_mediche = 0;
  for ( i = 0; i < parole.length; i++) {
    if(items.map( function(x){ return x.key;}).indexOf(parole[i].toUpperCase()) != -1)
      wrd_mediche++;
  }

  diffwrd_vocab = 1 - (wrd_difficili / wrd_univoche.length);
  medwrd_vocab = 1 - (wrd_mediche / wrd_univoche.length);
  periods_words = periods / wrd_total;

  var costaCabitza = - 0.92 + (0.08 * education) + (0.36 * diffwrd_vocab) + (1.28 * medwrd_vocab) + (1.13 * periods_words);
  if(costaCabitza <= 0)
    costaCabitza = 0.001;
  costaCabitza = costaCabitza * 5;
  //console.log(Math.ceil(costaCabitza) + "--> "+ text);
  return Math.ceil(costaCabitza);
}
