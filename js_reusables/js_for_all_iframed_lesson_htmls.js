// CAREFUL! DEFER or NOT DEFER
// Is iFrameLoadHasHappenedThisManyTimes TOTALLY USELESS???
if (sessionStorage.iFrameLoadHasHappenedThisManyTimes) {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = Number(sessionStorage.iFrameLoadHasHappenedThisManyTimes) + 1;  }
else {  sessionStorage.iFrameLoadHasHappenedThisManyTimes = 1;  } // CAN: Use modulus to repeat things every two or three times.
var thisLessonHasBeenLoadedFresh = true; // Access this from js_for_the_sliding_navigation_menu to switch the function of the goBackOrRefreshButton

/**/
window.onload = function() { // DANGER: Do not use window.onload anywhere else. Use addEventListener "load" instead in order to avoid overwriting.

  // progress_chart
  const whereAreWe = window.location.pathname;
  if (whereAreWe.search("progress_chart") != -1) { // This means we have landed on the progress_chart
    // Bring the installation&notification-subscription button (footer in parent)
    parent.revealNotificationAndInstallation_2in1_button();
    /* Handle NAV MENU - Remove PAUSE THE APP ceramic button */
    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); //
    }
  } else if (whereAreWe.search("information") != -1) { // information
    if (deviceDetector.isMobile) {
      setTimeout(function () {   parent.makeTheNavMenuGoDownOnMobiles();   },500); // See js_for_the_sliding_navigation_menu // The function checks if the menu was up
    }
    // Hide the installation&notification-subscription button (footer in parent)
    parent.hideNotificationAndInstallation_2in1_button();
    if (parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { // Used to be in progress.js
      parent.containerDivOfTheNavigationMenu.removeChild(parent.clickToPauseTheAppDiv); //
    }
  } else { // We have landed on a lesson
    if (deviceDetector.isMobile) {
      setTimeout(function () {   parent.makeTheNavMenuGoDownOnMobiles();   },1500); // See js_for_the_sliding_navigation_menu // The function checks if the menu was up
    }
    // Hide the installation&notification-subscription button (footer in parent)
    parent.hideNotificationAndInstallation_2in1_button();
    /* Handle NAV MENU - Add PAUSE THE APP ceramic button */
    setTimeout(afterATinyDelay,100); // So that it won't come before HOME button
    function afterATinyDelay() {
      if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToPauseTheAppDiv)) { //
        parent.containerDivOfTheNavigationMenu.insertBefore(parent.clickToPauseTheAppDiv,parent.clickToFinanceDiv); //
      }
    }
  } // Progress from one lesson to the next with the rotating-globe-preloader of parent

  /* Handle NAV MENU - HOME OF PROGRESS ceramic button */
  if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToMainMenuDiv)) { // If never existed in the beginning or perhaps was removed
    if (!parent.containerDivOfTheNavigationMenu.contains(parent.clickToGoToPreviousDiv)) { // If user is not coming directly from [Choose the language you want to learn] screen
      parent.containerDivOfTheNavigationMenu.insertBefore(parent.clickToGoToMainMenuDiv,parent.clickToFinanceDiv); // TESTED: Looks like it???s working.
    }
  }


  // Hide the preloader whenever a new lesson is ready to be shown through the iFrame
  parent.preloadHandlingDiv.classList.remove("addThisClassToRevealThePreloader"); // See css_for_every_single_html
  parent.preloadHandlingDiv.classList.add("addThisClassToHideThePreloader"); // See css_for_every_single_html
  // BETTER: if typeof checkTimeoutIfLoadingIsTooSlow == ... clearTimeout
  setTimeout(function () { thisLessonHasBeenLoadedFresh = false; },8000); // DEPRECATED??? The CAR MOVING BACKWARDS button is no more a go-back button and becomes a refresh button.
};

window.addEventListener('DOMContentLoaded', function(){
  function getConnection() {return navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection;}
  var internet = getConnection();
  if(internet){ // Chrome, Edge, Opera, SamsungInternet ?? Check how fast the internet is now, thanks to the NetworkInformation API
    if(internet.downlink<1.2){ // Too slow,, Get ready to let the user know that Speech Recognition may not work
      if (sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed) {
        // Do nothing. Connection is still slow but the user has already been notified.
      } else {
        // fetch txt in userInterfaceLanguage and display it with an alert box
        const filePathForHeyYourConnectionIsTooSlow = "/user_interface/text/"+userInterfaceLanguage+"/0-network_connection_too_slow.txt";
        fetch(filePathForHeyYourConnectionIsTooSlow,myHeaders).then(function(response){return response.text();}).then(function(contentOfTheTxtFile){
          alert(contentOfTheTxtFile); sessionStorage.internetIsTooSlowNotificationHasBeenDisplayed = "yes"; // Prevent all alerts from now on.
        });
      }
    }
  } else {  } // Firefox, Safari ?? No information about network speed ,,, NetworkInformation API is not supported
}, { once: true });
// CHECK IF ACCESS IS GOOD and block (or just fix) direct linking!
// MUST REVIEW if masked forwarding is implemented.
if (parent.thisIsTheParentWhichContainsAllIFramedLessons == "yes") {
  // This lesson html is inside its parent html as it is supposed to. That is good!
  // console.log("Safely parented!");
} else {
  // Someone is trying to access this lesson with a direct link. Must put it inside its parent html.
  alert("Redirecting to main...")
  // CONSIDER: Discontinue using reference to the root with "/" in case deep-iframing or domain masking causes a navigation problem.
  window.open("/","_top"); // Has been tested. It works.
  // RESULT: If one tries to open "https://myproject.github.io/forbidden/folder/index.html" this will force it to open "https://myproject.github.io/index.html"
}

// HANDLE PAGE UNLOAD IF THE BROWSER'S ???BACK??? BUTTON IS USED
// WARNING: onbeforeunload doesn't fire when src of the iframe changes nor does hashchange on mobile chrome
window.onbeforeunload = function() {
  // PROBLEM: When user makes progress and then clicks the browser's REFRESH button and then clicks the browser's BACK button the last lesson starts playing hidden behind the main menu.
  // console.log("iframe onbeforeunload has been fired -> js_for_all_iframed..."); // TESTED: It works on desktop Chrome // Why does this not show in eruda // LATER: because eruda must be a frame-level-eruda not parent-level-eruda
  // Turn OFF annyang if it was ON
  if (parent.annyang) { // DO NOT OMIT! Firefox and other no-speech browsers need this "if (parent.annyang)" to let the app work without Web Speech API.
    if (parent.annyang.isListening()) {
      parent.annyang.removeCommands();
      parent.annyang.abort();
    }
  }
  // Check if the functions exist in the lessons own js (like bread.js, water.js etc) before trying to call them.
  // NOTE: These are for the possibility of browser's back button being used or iFrame src change via nav menu buttons etc.
  if (typeof stopAudioInputVisualization === "function") {
    stopAudioInputVisualization(); // Stop Wavesurfer and turn off the microphone. See js_for_microphone_input...
  }
  if (typeof unloadTheSoundsOfThisLesson === "function") {
    unloadTheSoundsOfThisLesson(); // Every time defined with a different list in the lesson. See the unique js file of each lesson.
  }
};

// BUTTON TYPE 1: Classical with playstation style
const hoverSoundForProceedToNextButton115 = new parent.Howl({  src: ["/user_interface/sounds/proceed_to_next_hover."+parent.audioFileExtension]  }); // DESKTOPS ONLY! Could add code to disable it on mobile but guess it just works when left like this.
const clickSoundForProceedToNextButton115 = new parent.Howl({  src: ["/user_interface/sounds/proceed_to_next_click."+parent.audioFileExtension]  });
let allLessonButtonElementsAreInThisArray = document.getElementsByTagName("BUTTON");
let i;
for (i = 0; i < allLessonButtonElementsAreInThisArray.length; i++)
{
  /* The styles are standard for all devices. See css_for_all_iframed_lesson_htmls.css */
  /* Playstation style disappear */
  allLessonButtonElementsAreInThisArray[i].addEventListener("click", clickClassical);
  /* Classical sounds for hover and click */
  allLessonButtonElementsAreInThisArray[i].addEventListener("mousedown", mouseDownClassical);
  if (deviceDetector.device == "desktop") {
    allLessonButtonElementsAreInThisArray[i].addEventListener("mouseenter", mouseEnterClassical);
  }
}

function clickClassical(event) {
  event.target.classList.add('addThisToAButtonForPlayStationStyleClick');
}
function mouseEnterClassical() {
  hoverSoundForProceedToNextButton115.play();
}
function mouseDownClassical() {
  clickSoundForProceedToNextButton115.play();
}

// BUTTON TYPE 2: Glassy button with glassy sounds
const hoverSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_hover."+parent.audioFileExtension]  }); // DESKTOPS ONLY! Could add code to disable it on mobile but guess it just works when left like this.
const clickSoundForGlassyButtons = new parent.Howl({  src: ["/user_interface/sounds/glass_button_click."+parent.audioFileExtension]  });
/* Use ASIDE elements as a second type of button */
let allLessonAsideElementsAreInThisArray = document.getElementsByTagName("ASIDE");
let j;
for (j = 0; j < allLessonAsideElementsAreInThisArray.length; j++)
{
  /* GLASSMORPHISM visual style depends on the device and browser because mobiles need more readability */
  /* See @supports in css_for_all_iframed_lesson_htmls.css to find how alternative rules replace defaults in browsers like Firefox2021 */
  if (deviceDetector.isMobile) {
    allLessonAsideElementsAreInThisArray[j].classList.add('glassmorphismOnMobiles'); /*See css_for_all_iframed_lesson_htmls.css*/
  } else {
    allLessonAsideElementsAreInThisArray[j].classList.add('glassmorphismOnDesktops'); /*See css_for_all_iframed_lesson_htmls.css*/
  }
  /* Click makes it explode. Touch makes it fade out */
  allLessonAsideElementsAreInThisArray[j].addEventListener("click", clickGlassy);
  /* Glassy sounds for hover and click */
  if (deviceDetector.device == "desktop") { // Desktops
    allLessonAsideElementsAreInThisArray[j].addEventListener("mouseenter", mouseEnterGlassy);
    allLessonAsideElementsAreInThisArray[j].addEventListener("mousedown", mouseDownOrTouchStartGlassy, { once: true });
  }
  else { // Mobiles
    allLessonAsideElementsAreInThisArray[j].addEventListener("touchstart", mouseDownOrTouchStartGlassy, { once: true });
  }
}

function clickGlassy(event) {
  if (deviceDetector.isMobile) { // Mobiles
    event.target.parentNode.classList.add('addThisToTheButtonWhenItIsTouchedOnMobiles'); //See css_for_all_iframed_lesson_htmls.css
    //event.target.removeEventListener("touchstart", mouseDownOrTouchStartGlassy);
  }
  else { // Desktops
    event.target.parentNode.classList.add('addThisToTheButtonWhenItIsClickedOnDesktops'); //See css_for_all_iframed_lesson_htmls.css
    event.target.removeEventListener("mouseenter", mouseEnterGlassy);
    //event.target.removeEventListener("mousedown", mouseDownOrTouchStartGlassy);
  }
}
function mouseEnterGlassy() {
  hoverSoundForGlassyButtons.play();
}
function mouseDownOrTouchStartGlassy() {
  clickSoundForGlassyButtons.play();
}
