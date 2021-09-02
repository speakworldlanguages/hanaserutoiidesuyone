// This is included in parent htmls only. Not in lesson htmls.
// Even though this is deferred, looks like we still need to wait for the load event before we call a function from another js file.
var deactivationSound1 = new Howl({  src: ['user_interface/sounds/thingy_one_deactivate.mp3']  }); // Desktops: FULLSCREEN,,, Mobiles: NAVIGATION MENU
// See js_for_browser_device_issues_in_parents ... Also see js_for_the_sliding_navigation_menu
var activationSound1 = new Howl({  src: ['user_interface/sounds/thingy_one_activate.mp3']  }); // Desktops: FULLSCREEN,,, Mobiles: NAVIGATION MENU
// See js_for_browser_device_issues_in_parents ... Also see js_for_the_sliding_navigation_menu
var errorSound = new Howl({  src: ['user_interface/sounds/thingy_two_error.mp3']  }); // Mobiles only: Touch once - Touch twice distinction

var hasGoneFullscreen = false;
// Go fullscreen by touching anywhere on the screen.
window.addEventListener("load",function() {
  const iframe = document.getElementById('theIdOfTheIframe'); // Actually the exact same thing was defined with const iFrameScriptAccess in js_for_all_container_parent_htmls.js
  const iDoc = iframe.contentWindow || iframe.contentDocument;

  // HOW TO GO AND STAY IN FULLSCREEN ON MOBILES
  function handleTouchForFullscreen() {
    if (!hasGoneFullscreen){  openFullscreen();  } // This works but it gives an error for the first touch. Was able to turn the error into something useful by adding errorSound.play();
  }
  function iframeHasBeenLoaded() {
    iDoc.document.addEventListener("touchstart", handleTouchForFullscreen); // Tried to removeEventListener with 'unload' but neither 'unload' nor 'hashchange' fires on the iframe.
  }
  // See js_for_all_container_parent_htmls to find how openFullscreen() is called.
  // openFullscreen() is called via handleTheFirstGoingFullscreenOnMobiles() when either of these two things happen,
  // 1- when user taps on a button in the main menu (language selection menu) 2- when user taps the "return to the last saved point" button
  // But ALSO must RETURN TO FULLSCREEN WITH THE FIRST TOUCH if user navigates away from the app and comes back and THE REASON is
  // BECAUSE most browsers won't allow going fullscreen without a user gesture... That means calling openFullscreen() with Onblur Onfocus or document.visibilitychange won't work.
  // So here is how we do it...
  if (deviceDetector.isMobile) {
    iframe.addEventListener("load",iframeHasBeenLoaded); // We cannot directly add an event listener for touchstart/mousedown on the iframe without this.
  }
  // THE RIGHT CLICK METHOD ON DESKTOPS
  else {
    var currentSrcParsed;
    // Every time the iframe is loaded, add the custom context menu to either the parent document or the framed document.
    iframe.onload = function() {
      currentSrcParsed = iframe.src.substring(iframe.src.length - 10, iframe.src.length-5); // Get the name of the html file from a string like "/user_interface/blank.html"
      // When user is viewing the main menu
      if (currentSrcParsed == "blank") {
        document.addEventListener('contextmenu', rightClickHandlerFunction);
        document.addEventListener('mousedown', coordinatesF);
        window.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        document.addEventListener('mousedown', toggleRightClickMenuOff);
        document.addEventListener('dblclick', toggleFullScreen);
      }
      // When user is viewing a lesson
      else {
        iframe.contentWindow.document.addEventListener('contextmenu', rightClickHandlerFunction);
        iframe.contentWindow.document.addEventListener('mousedown', coordinatesF);
        iframe.contentWindow.onkeyup = function(e) {  if ( e.keyCode === 27 ) {    toggleRightClickMenuOff();   }  }; // When the “Esc”ape key is hit
        iframe.contentWindow.addEventListener('mousedown', toggleRightClickMenuOff);
        iframe.contentWindow.addEventListener('dblclick', toggleFullScreen); // NOTE: dblclick means either left double-click or right double-click
      }

    }; // This line is the end of iframe.onload = function(){}; for DESKTOPS
  } // End of “else”

},{ once: true });


var rightClickMenu = document.createElement("DIV");
var goFullscreenWebp = document.createElement("IMG");
var exitFullscreenWebp = document.createElement("IMG");
// AVOID: Do not use reference to root with "/" as it could be uncertain what the root is in case of deep-iframing for domain masking.
goFullscreenWebp.src = "user_interface/images/right_click_go_for_fullscreen.webp";
exitFullscreenWebp.src = "user_interface/images/right_click_no_more_fullscreen.webp";
rightClickMenu.appendChild(goFullscreenWebp);
rightClickMenu.appendChild(exitFullscreenWebp);
rightClickMenu.classList.add("rightClickMenuWithWebpsInside"); // See css_for_every_single_html.css

var isContextMenuDisplayed = false;

var x,y;
function coordinatesF(event) {   x=event.clientX;  y=event.clientY;     }

function rightClickHandlerFunction(event) {

  event.preventDefault();
  if (!hasGoneFullscreen) {
    goFullscreenWebp.style.display = "block";
    exitFullscreenWebp.style.display = "none";
  } else {
    goFullscreenWebp.style.display = "none";
    exitFullscreenWebp.style.display = "block";
  }
  rightClickMenu.style.left = String(x)+"px";
  rightClickMenu.style.top = String(y)+"px";
  document.body.appendChild(rightClickMenu);
  isContextMenuDisplayed = true;
  rightClickMenu.addEventListener("mousedown",toggleFullScreen,{ once: true });
}

function toggleFullScreen() { // Note: It double fires during a lesson if main menu was already fullscreened before arriving at the lesson.
  if (!hasGoneFullscreen) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function toggleRightClickMenuOff() {
  if (isContextMenuDisplayed) {
    document.body.removeChild(rightClickMenu);
    isContextMenuDisplayed = false;
  }
}

var theWholeDocument = document.documentElement;
/* Function to open fullscreen mode */
function openFullscreen() {
  /* There is a weird thing on Android as fullscreen permission is not granted before the second touch event. It still work though. */
  if (theWholeDocument.requestFullscreen) {
    theWholeDocument.requestFullscreen();
  } else if (theWholeDocument.mozRequestFullScreen) { /* Firefox */
    theWholeDocument.mozRequestFullScreen();
  } else if (theWholeDocument.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    theWholeDocument.webkitRequestFullscreen();
  } else if (theWholeDocument.msRequestFullscreen) { /* IE/Edge */
    theWholeDocument = window.top.document.body; //To break out of frame in IE
    theWholeDocument.msRequestFullscreen();
  }
  /*Handle audio on mobile with RESIZE*/ // See js_for_the_sliding_navigation_menu.js
  if (deviceDetector.device=="desktop") {
    activationSound1.play();
  } else {
    // Handle audio according to the "weird two touches problem"
    errorSound.play();
  }
}

/* Function to close fullscreen mode */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    window.top.document.msExitFullscreen();
  }
  /*Handle audio on mobile with RESIZE*/ // See js_for_the_sliding_navigation_menu.js
  if (deviceDetector.device=="desktop") {
    deactivationSound1.play(); // Actually: This wouldn't play on mobiles even if wasn't inside an "if-desktop" since on mobiles exiting fullscreen happens without closeFullscreen().
  }
}

/* Change boolean hasGoneFullscreen every time fullscreen is opened or closed*/
document.addEventListener("fullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
    // console.log("fullscreenchange event fired! and now it is fullscreen");
  } else {
    hasGoneFullscreen = false;
    // console.log("fullscreenchange event fired! and now it is back to default view");
  }
});
document.addEventListener("mozfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
document.addEventListener("webkitfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
document.addEventListener("msfullscreenchange", function() {
  if (!hasGoneFullscreen) {
    hasGoneFullscreen = true;
  } else {
    hasGoneFullscreen = false;
  }
});
