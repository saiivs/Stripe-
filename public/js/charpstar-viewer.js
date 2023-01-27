window.onload = function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const ARClass = urlParams.get('ARClass');    
    const currentVariantId = urlParams.get('variant');
    if (currentVariantId !== null && ARClass !== null) {
     var arElement = document.getElementsByClassName("arConfigButton")[0];
        arElement.setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/" + currentVariantId + ".glb" ); 
        arElement.setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/" + currentVariantId + ".usdz" ); 
        activateAR(arElement);
    }
    checkForARSupport();
    
}
const openIOSARQuickLook = (() => {
    const anchor = document.createElement('a');
    anchor.setAttribute('rel', 'ar');
    anchor.appendChild(document.createElement('img'));
    anchor.setAttribute("id", "charpstar");
    return (usdzSrc) => {
        anchor.setAttribute('href', usdzSrc);
        anchor.click();
    };
})();
const openSceneViewer = (() => {
    const anchor = document.createElement('a');
    const noArViewerSigil = '#model-viewer-no-ar-fallback';
    let fallbackInvoked = false;
    return (gltfSrc, title, arScale) => {
        // If the fallback has ever been invoked this session, bounce early:
        if (fallbackInvoked) {
            return;
        }

        
        const location = self.location.toString();
        const locationUrl = new URL(location);
        const modelUrl = new URL(gltfSrc, location);
        const scheme = modelUrl.protocol.replace(':', '');
        locationUrl.hash = noArViewerSigil;
        let intentParams = `?file=${encodeURIComponent(modelUrl.toString())}&mode=ar_preferred&link=${location}&title=${encodeURIComponent(document.title)}`;
        intentParams += `&resizable=false`;
        intentParams += `&disable_occlusion=true`;
        var x = document.getElementsByClassName("charpstarARViewer");
         for (var i = 0; i < x.length; i++) {
          if (x[i].hasAttribute("data-wallPlace")) {
               intentParams += `&enable_vertical_placement=true`;
          }}
          
          
        const intent = `intent://arvr.google.com/scene-viewer/1.0?${intentParams.toString() + '&file=' +encodeURIComponent(modelUrl.toString())}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(locationUrl.toString())};end;`;
        const undoHashChange = () => {
            if (self.location.hash === noArViewerSigil && !fallbackInvoked) {
                fallbackInvoked = true;
                self.history.back();
            }
        };
        self.addEventListener('hashchange', undoHashChange, {
            once: true
        });
        anchor.setAttribute('href', intent);
        anchor.click();
    };
})();

function activateAR(e) {
    
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
        openSceneViewer(e.getAttribute("data-androidSrc"));
    } else if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        openIOSARQuickLook(e.getAttribute("data-iosSrc"));
    } else {
     //QR Code Toggle on Desktops
        toggleModal();
    }
}


function mainElementActivateAR() {
     currentStatus = mainARStatus;
     toggleModal();
}

function checkForiOSSupport() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var userAgentSafari = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgentSafari)
    // check for AR support
    const a = document.createElement('a'),
        supportsAR = a.relList.supports('ar') ? true : false;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream && !supportsAR) {
        hideARButton();
    }
    if (!safari){
            hideARButton();
    }

    
}

function checkForAndroidSupport() {
    var a = navigator.userAgent;
    if ( a.includes ('wv')) {
          hideARButton();
    } 
}

function checkForARSupport() {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone/i);
        },
        iPad: function() {
            return (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        },
        any: function() {
            return (isMobile.Android() || isMobile.iOS() || isMobile.iPad());
        }
    };
    if (!isMobile.any()) {
        //You can either Hide the AR Button Here for desktop devices or decide to show it. If Visible and When clicked, the button will pop up a QR code. 
        //hideARButton();
         var x = document.getElementsByClassName("charpstarARViewer");
         var i;
         for (i = 0; i < x.length; i++) {
          if (!x[i].hasAttribute("data-desktopQR")) {
               hideARButton();
          }
         
    }
    } else if (isMobile.Android()) {
      checkForAndroidSupport();
    } else if (isMobile.iOS() || isMobile.iPad()) {
     
        checkForiOSSupport();
    }
}

function hideARButton() {
    if ( document.getElementsByClassName("charpstarARViewer")) {
    var x = document.getElementsByClassName("charpstarARViewer");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    }
}
 
//QR Code Logic 

var QRCodeModalActive = false;
var QRMainSrc = "https://charpstar.se/InPlace-Integration-Full/QRGen.html?charpstar-ar-href=";
var QRMainSrcSv = "https://charpstar.se/InPlace-Integration-Full/QRGenSv.html?charpstar-ar-href=";



var QRCurrentProductAppend;

var QRModalDiv = document.createElement("div");
QRModalDiv.setAttribute('class', 'QRModal');
QRModalDiv.style.zIndex = "15";
QRModalDiv.style.width = "100%";
QRModalDiv.style.height = "100%";
QRModalDiv.style.position = "fixed";
QRModalDiv.style.background = "rgba(0, 0, 0, 0.5)";
QRModalDiv.style.opacity = "1";
QRModalDiv.style.visibility = "visible";
QRModalDiv.style.transform = "scale(1.1)";
QRModalDiv.style.transition = "visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s";
QRModalDiv.style.top = "0";
QRModalDiv.style.left = "0";
var QRModaliframe = document.createElement('iframe');
QRModaliframe.frameborder = "0";
QRModaliframe.height = "585px";
QRModaliframe.width = "404px";
QRModaliframe.style.top = "50%";
QRModaliframe.style.left = "50%";
QRModaliframe.style.position = "absolute";
QRModaliframe.style.transform = "translate(-50%, -50%)";
QRModalDiv.appendChild(QRModaliframe);

function toggleModal() {

QRCurrentProductAppend = window.location.href + "?variant="+currentStatus+ "%26ARClass=charpstarARViewer";
    
if (document.documentElement.lang == "sv-SE" || document.documentElement.lang == "sv"){
   var fullQRSrc = QRMainSrcSv + QRCurrentProductAppend;
}
else {
    var fullQRSrc = QRMainSrc + QRCurrentProductAppend;
}
   
    QRModaliframe.src = fullQRSrc;
    if (QRCodeModalActive == false) {
        document.body.appendChild(QRModalDiv);
        setTimeout(function() {
            QRCodeModalActive = true;
        }, 200);
    } else {
        document.body.removeChild(QRModalDiv);
        QRCodeModalActive = false;
    }
}

function windowOnClick(event) {
    if (QRCodeModalActive == true) {
        toggleModal();
    }
}
window.addEventListener("click", windowOnClick);

function QRCloseButtonEvent(msg) {
    if (msg.data == "CloseQRModal") {
        toggleModal();
    }
}
if (window.addEventListener) {
    window.addEventListener("message", QRCloseButtonEvent, false);
} else {
    window.attachEvent("onmessage", QRCloseButtonEvent);
}