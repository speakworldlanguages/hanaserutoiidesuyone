// All settings here will depend on the content of the lesson
let theNewWordUserIsLearningNowAndPossibleMishaps; // Get this from txt file
const filePathForTheWordOrPhrase = "../../../../speech_recognition_dictionary/"+parent.theLanguageUserIsLearningNow+"/1-7-1-door.txt";
// See js_for_fetch_api_character_encoding.js for the headers setting.
fetch(filePathForTheWordOrPhrase,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){ theNewWordUserIsLearningNowAndPossibleMishaps = contentOfTheTxtFile; });

/* ___AUDIO ELEMENTS___ */
const say1say2Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_7/lesson_1/door_1-2.mp3";
const say3say4Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_7/lesson_1/door_3-4.mp3";
const say5say6Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_7/lesson_1/door_5-6.mp3";
const say7say8Path = "audio_files_for_listening/"+parent.theLanguageUserIsLearningNow+"/level_1/unit_7/lesson_1/door_7-8.mp3";

const sayAB = new parent.Howl({  src: [say1say2Path]  });
const sayCD = new parent.Howl({  src: [say3say4Path]  });
const sayEF = new parent.Howl({  src: [say5say6Path]  });
const sayGH = new parent.Howl({  src: [say7say8Path]  });

const doorSoundAB = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_7/lesson_1/door1.mp3"]  });
const doorSoundCD = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_7/lesson_1/door2.mp3"]  });
const doorSoundEF = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_7/lesson_1/door3.mp3"]  });
const doorSoundGH = new parent.Howl({  src: ["lessons_in_iframes/level_1/unit_7/lesson_1/door4.mp3"]  });

const successTone = new parent.Howl({  src: ['user_interface/sounds/success1.mp3']  });
const notificationDingTone = new parent.Howl({  src: ['user_interface/sounds/ding.mp3']  });
function unloadTheSoundsOfThisLesson() { // Call this as the last thing before leaving.
  notificationDingTone.unload();
  successTone.unload();
  doorSoundGH.unload();
  doorSoundEF.unload();
  doorSoundCD.unload();
  doorSoundAB.unload();
  sayGH.unload();
  sayEF.unload();
  sayCD.unload();
  sayAB.unload();
}

/* ___VISUAL ELEMENTS___ */
const imgA = document.getElementById("imageA");
const imgB = document.getElementById("imageB");
const imgC = document.getElementById("imageC");
const imgD = document.getElementById("imageD");
const imgE = document.getElementById("imageE");
const imgF = document.getElementById("imageF");
const imgG = document.getElementById("imageG");
const imgH = document.getElementById("imageH");
const imgI = document.getElementById("imageI");
const imgJ = document.getElementById("imageJ");
const the1stDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer1');
const the2ndDivThatWillAppearWhenMicrophoneStartsListening = document.getElementById('idOfTheFullViewportDivWithNOWYOUSAYITAnimationInsideLayer2');
const the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer1');
const the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne = document.getElementById('idOfTheNowYouSayItAnimationLayer2');
const giveUpAndContinueButtonIsInsideThisDiv = document.getElementById('giveUpSkipNextContinueButtonDivID');
const theWhitePreexitDivWithAHiddenGlobeInside = document.getElementById('idOfTheWhiteCoverDivBeforeExitAtTheEndOfLesson');
const theGlobeInsideTheWhiteOutroIMG = document.getElementById('theGlobeInsideTheWhiteOutroID');
function unloadTheImagesOfThisLesson() { // Call this as the last thing before leaving.
  imgA.src = onePixelTransparentGif;
  imgB.src = onePixelTransparentGif;
  imgC.src = onePixelTransparentGif;
  imgD.src = onePixelTransparentGif;
  imgE.src = onePixelTransparentGif;
  imgF.src = onePixelTransparentGif;
  imgG.src = onePixelTransparentGif;
  imgH.src = onePixelTransparentGif;
  imgI.src = onePixelTransparentGif;
  imgJ.src = onePixelTransparentGif;
}
// These are already hidden with display: none and here we get them ready to fade in using classList.remove() when it’s time.
imgC.classList.add("toZeroOpacity");
imgD.classList.add("toZeroOpacity");
imgE.classList.add("toZeroOpacity");
imgF.classList.add("toZeroOpacity");
imgG.classList.add("toZeroOpacity");
imgH.classList.add("toZeroOpacity");
imgI.classList.add("toZeroOpacity");
imgJ.classList.add("toZeroOpacity");
// These are already hidden with left: -9999px and here we get them ready to fade in using classList.remove() when it’s time.
the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");

/* ___PROGRESSION___ */
window.addEventListener("load",function(){   loadingIsCompleteFunction();   }, { once: true });
// Change the speed gradually...
function loadingIsCompleteFunction()
{
  setTimeout(function(){ doorSoundAB.play(); }, 1000);
  setTimeout(function(){ sayAB.play(); }, 6000); // 1000+5000=6000
  setTimeout(goFromABtoCD,4500*parent.speedAdjustmentCoefficient+5000); // See js_for_the_sliding_navigation_menu.js
}

function goFromABtoCD()
{
  setTimeout(function(){ doorSoundCD.play(); }, 2000); // after 1s fade out plus 1s fade in
  setTimeout(function(){ sayCD.play(); }, 7000); // 2000+5000=7000 // after 1s fade out plus 1s fade in
  imgA.classList.add("toZeroOpacity");
  imgB.classList.add("toZeroOpacity");
  setTimeout(betweenABandCD,1000);
}

function betweenABandCD()
{
    imgA.style.display = "none";
    imgB.style.display = "none";
    imgC.style.display = "initial";
    imgD.style.display = "initial";
    setTimeout(waitALittleFunc,100);
    function waitALittleFunc(){
    imgC.classList.remove("toZeroOpacity");
    imgD.classList.remove("toZeroOpacity");
    }
    setTimeout(goFromCDtoEF,5500*parent.speedAdjustmentCoefficient+5000);
}

function goFromCDtoEF()
{
  setTimeout(function(){ doorSoundEF.play(); }, 2000);
  setTimeout(function(){ sayEF.play(); }, 7900); // 2000 + 5900 = 7900
  imgC.classList.add("toZeroOpacity");
  imgD.classList.add("toZeroOpacity");
  setTimeout(betweenCDandEF,1000);
}

function betweenCDandEF()
{
  imgC.style.display = "none";
  imgD.style.display = "none";
  imgE.style.display = "initial";
  imgF.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgE.classList.remove("toZeroOpacity");
  imgF.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromEFtoGH,6000*parent.speedAdjustmentCoefficient+5500);
}

function goFromEFtoGH()
{
  setTimeout(function(){ doorSoundGH.play(); }, 2000);
  setTimeout(function(){ sayGH.play(); }, 6500); // 2000 + 4500 = 6500
  imgE.classList.add("toZeroOpacity");
  imgF.classList.add("toZeroOpacity");
  setTimeout(betweenEFandGH,1000);
}

function betweenEFandGH()
{
  imgE.style.display = "none";
  imgF.style.display = "none";
  imgG.style.display = "initial";
  imgH.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgG.classList.remove("toZeroOpacity");
  imgH.classList.remove("toZeroOpacity");
  }
  setTimeout(goFromGHtoIJ,7000*parent.speedAdjustmentCoefficient+4500); // See js_for_the_sliding_navigation_menu.js
}

function goFromGHtoIJ()
{
  imgG.classList.add("toZeroOpacity");
  imgH.classList.add("toZeroOpacity");
  setTimeout(betweenGHandIJ,1000);
}

function betweenGHandIJ()
{
  imgG.style.display = "none";
  imgH.style.display = "none";
  imgI.style.display = "initial";
  imgJ.style.display = "initial";
  setTimeout(waitALittleFunc,100);
  function waitALittleFunc(){
  imgI.classList.remove("toZeroOpacity");
  imgJ.classList.remove("toZeroOpacity");
  }
  setTimeout(speakToTheMic,1500*parent.speedAdjustmentCoefficient);
}

/* ___SPEECH RECOGNITION___ */
var userHasGivenUp = false;
var preventGiveUpButtonIfSuccessHappens;
function speakToTheMic() {

  the1stDivThatWillAppearWhenMicrophoneStartsListening.style.left=0; // See css_for_new_vocabulary_with_photos
  the2ndDivThatWillAppearWhenMicrophoneStartsListening.style.left=0; // See css_for_new_vocabulary_with_photos
  // Reset the webp animation
  const srcOfNowYouSayItImg = the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src;
  the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = onePixelTransparentGif; // See js_for_preload_handling_of_all_htmls.js
  the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = onePixelTransparentGif; // See js_for_preload_handling_of_all_htmls.js
  setTimeout(function () {
    the1stImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = srcOfNowYouSayItImg;
    the2ndImgOfNOWYOUSAYITwebpThatMustBeResetToFrameOne.src = srcOfNowYouSayItImg;
  },250);
  // Display the “It's your turn” animation if the user's browser is whitelisted.
  if (parent.isTheUsersBrowserWhitelisted) {
    the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.remove("toZeroOpacity"); // MAKE IT APPEAR
    the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.remove("toZeroOpacity"); // MAKE IT APPEAR
    setTimeout(function () {
      the1stDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
      the2ndDivThatWillAppearWhenMicrophoneStartsListening.classList.add("toZeroOpacity");
    },4800); // AND DISAPPEAR AS SOON AS ANIMATION ENDS
  }
  // A slight whiteout and then the GIVE-UP-BUTTON (Go-To-Next-Button on Safari2021,Firefox2021 etc) appears SLOWLY.
  // Use clearTimeout before it appears to prevent it accordingly.
  // For sake of GUI simplicity the Speed Adjustment Slider is available on desktops only as well as the Global Volume Slider.
  preventGiveUpButtonIfSuccessHappens = setTimeout(function () {
    theWhitePreexitDivWithAHiddenGlobeInside.classList.add("postloaderInNewVocabularyGetSlightlyVisible"); // 1.75
    setTimeout(function () {  giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonToUnhide");  },1000);

  },howLongBeforeGiveUpButtonAppears);

  // REMEMBER: To find “what language the browser will listen to (via annyang)” see the code in js_for_all_container_parent_htmls.js
  // TRICKY: Must know how to set the contents of a script object dynamically as well as how to use regular expressions.
  var commands = {};
  const magicalSelectionRegex = /\S+/gim; // So called “regular expression” to get each and every word separated by a space (i.e. either the Latin space or the Asian “big space”)
  const eachWordArray = theNewWordUserIsLearningNowAndPossibleMishaps.match(magicalSelectionRegex);
  for(i=0;i<eachWordArray.length;i++)
  {
    let oneOfTheWords = eachWordArray[i];
    commands[oneOfTheWords] = stopListeningAndProceedToNext;
  }

  if (parent.annyang) {
    // Add commands to annyang
    parent.annyang.addCommands(commands);
    if (parent.deviceDetector.device == "desktop") {
        notificationDingTone.play(); // Better be heard on desktops only.
    }
    // Start listening.
    setTimeout(function() {  parent.annyang.start();  },200);
    setTimeout(function() {  startAudioInputVisualization();  },300); // Will work only on desktops. See js_for_microphone_input_visualization.js
  }

}

// stopListeningAndProceedToNext
var stopListeningAndProceedToNext = function () {
  if (!userHasGivenUp) {
    successTone.play();
    clearTimeout(preventGiveUpButtonIfSuccessHappens);
    giveUpAndContinueButtonIsInsideThisDiv.classList.add("addThisToGlassButtonWhenSuccessHappens");
  }
  if (parent.annyang) {
    parent.annyang.removeCommands();
    parent.annyang.abort();
  }
  stopAudioInputVisualization();
  theWhitePreexitDivWithAHiddenGlobeInside.classList.add("postloaderInNewVocabularyGetTotallyVisible"); // 1.75s
  setTimeout(function() { theGlobeInsideTheWhiteOutroIMG.classList.add("postloaderInNewVocabularyGetTotallyVisible"); },1750); // 1.75s+1.75s=3.5s
  // See js_for_all_iframed_lesson_htmls about unloadTheSoundsOfThisLesson() unloadTheImagesOfThisLesson()
  setTimeout(function() { self.location.href = '../lesson_2/index.html'; },3600);
};