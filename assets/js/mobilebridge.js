
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
        paragraph['id'] = par.attr('id');
        paragraph['text'] = par.text();
        paragraph['visibility'] = calculateVisibilityForParagraph(par);
        paragraph['boundingbox'] = par[0].getBoundingClientRect();
		paragraph['numwords'] = par[0].innerHTML.split(' ').length;
        paragraphs.push(paragraph);
    });
    return paragraphs;
}

function predictCurrentParagraph(gaze_position){	
    var predicted_paragraph = {};
    calculateAndDisplayForAllParagraphs().forEach(function (item) {
        if( gaze_position != null && gaze_position.y >= item.boundingbox.y && gaze_position.y <= item.boundingbox.y + item.boundingbox.height )
        {
            predicted_paragraph = item;
        }
    });
	if(predicted_paragraph){
		predicted_paragraph['heatmap_position'] = {x: gaze_position.x, y: predicted_paragraph.boundingbox.y + gaze_position.y, scroll: window.scrollY };
    }
	return predicted_paragraph;
}

function trackSession(){
    AndroidBridge.trackWebSession(new Date().getTime(), window.location.href)
	AndroidBridge.startStreaming();
}

function androidNativeInterfaceCall() {
	var gaze = getEyePrediction();
	var paragraph = predictCurrentParagraph(gaze);
   //AndroidBridge.trackJavascriptData(new Date().getTime(), JSON.stringify(calculateAndDisplayForAllParagraphs()), JSON.stringify(getEyePrediction()));
   AndroidBridge.trackJavascriptData(new Date().getTime(), JSON.stringify(paragraph), JSON.stringify(gaze));
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

	try{
		AndroidBridge.isLoadedFromMobileApp();
	}catch(ex){
		return;
	}

    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(false) /* shows a square every 100 milliseconds where current prediction is */
		.showFaceOverlay(false)
        .showVideo(false)
        .showFaceFeedbackBox(false);


	trackSession();
	calculateAndDisplayForAllParagraphs();
	setInterval(androidNativeInterfaceCall, 500);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions
	AndroidBridge.stopStreaming();	
	AndroidBridge.updateWebSession(new Date().getTime());
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart(){
    ClearCalibration();
    PopUpInstruction();
}

