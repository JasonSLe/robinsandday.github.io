// Cal App functions

  //************************************* OPERATING SYSTEM DETECTION *****************************************   
var OperatingSystem = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
   },

   iOS: function() {
     if(navigator.vendor.match(/google/i)) { return false;}
     else if(navigator.vendor.match(/apple/i)) {return true;}
   }
};

//************************************* GO INTO FULLSCREEN (ONLY ANDRIOD DEVICE WORK) *****************************************
function goToFullscreen(){
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
  }
  
  function exitFullscreen(){
  //EXIT FULL SCREEN MODE
  if (document.exitFullscreen) {
   document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
   document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
   document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
   document.msExitFullscreen();
  }
  }

//prepares everything for opening the camera and taking the photo
function prepareCameraView(imgToSaveName){
  var imageCapture;

  var video = document.querySelector('video');
  var takePhotoButton = document.querySelector('button#scanTakePhoto');
  var confirmButton = document.querySelector('#scanCameraConfirm');
  var retakeButton = document.querySelector('#scanCameraRetake');
  var exitButton = document.querySelector('#scanCameraExit');

  const constraints = {
    width: { min: 1440, max: 3984 },
    height: { min: 1080, max: 2988 },
    aspectRatio: 4/3,
    frameRate:{max: 30},
  };

  function openCamera(getUserMediaC, constraints){
    navigator.mediaDevices.getUserMedia(getUserMediaC).then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream;

      const track = mediaStream.getVideoTracks()[0];

      track.applyConstraints(constraints);
  
      if (OperatingSystem.Android()) {
        imageCapture = new ImageCapture(track);
      }
  
    })
    .catch(error =>{
      if (error.toString().includes('Permission denied')){
        alert('This application needs your permission to camera. If you have accidentally Blocked the camera access you need to unblock it in your browser settings.')
      } else {
        alert('Error starting camera. Please report this error to admin.'+ error)
      }
    });
}

if (OperatingSystem.Android()) {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      let deviceId = '';
      let countOfBackCameras = 0;
      devices.forEach(function(device) {
        if (device.label.toLowerCase().includes('back')){
            countOfBackCameras += 1;
            deviceId = device.deviceId;
        }
      });

      if (countOfBackCameras<=1){
        openCamera({video: {facingMode: {exact: "environment"}}},constraints);
      } else {
        openCamera({video: {deviceId: {exact: deviceId}}},constraints);
      }
    })
    .catch(function(err) {
      alert('error enumeration devices, contact support')
      alert(err.name + ": " + err.message);
    });
  } else {
    openCamera({video: {facingMode: {exact: "environment"}}},constraints);
  }

  exitButton.onclick = function() {
    try {
      video.srcObject.getVideoTracks().forEach(track => track.stop());
    } catch (e) {}

    hideCalibrateApp();
  }  
}

//**************************** DETECT SCREEN ORIENTATION WHEN THE APP IS LOADED AND DETECT WHEN USER CHANGES SCREEN ORIENTATION*****************************************
var isLandscape = false;
//DETECT WHICH ORIENTATION THE USEER IS IN
if(window.innerHeight > window.innerWidth){ // if portrait
     $("#cameraLine").hide();
     $("#calibrate").hide();
     $("#cameraRotate").show();
     $(stop);
     isLandscape = false;
}

if(window.innerWidth > window.innerHeight){ // if landscape
    $("#calibrate").show();
    $("#cameraRotate").hide();
    $(go);
    isLandscape = true;
}

window.addEventListener("deviceorientation", handleOrientation, true);

var permissionForOrientation = 'none';
  // when page loads checks if the device requires user to to enable motion sensors, If they do then display the dialog
  // but here it just gives to the property permissionForOrientation the info about need, the dialog is shown after 1 second if no orientation events are coming
  if ( window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function' ){
    permissionForOrientation = 'need';
      console.log("permision needed");
      //This function after 1 second checks if the events are coming or not
      setTimeout(function() {
        if (permissionForOrientation==='need'){
          $('#cameraModal').show(); // show dialog asking user to enable motion sensor
          //De-activate takephoto button until user agnet agreed
          $("#calibrate").hide();

          acceptButton.onclick = function(){
            DeviceOrientationEvent.requestPermission()
            .then(response => {
              if (response == 'granted') {
                window.addEventListener("deviceorientation", handleOrientation, true);
                $('#cameraModal').hide();
                //$("#takePhoto").removeAttr('disabled');
                if (isLandscape) $("#calibrate").show();
              }
            })
            .catch(console.error)
          }
        }
      }, 1000);
  }

//**************************** SPIRIT LEVEL *****************************************
var lineVisible = true;
var canTakePhoto = false;
function handleOrientation(event) {
 var absolute = event.absolute;
 var alpha    = event.alpha;
 var beta     = event.beta;
 var gamma    = event.gamma;
 console.log(beta);

 if (isLandscape && beta && lineVisible) {
   $("#cameraLine").show();
 } else {
   $("#cameraLine").hide();
 }

 if(beta <=2 && beta >= -2 && gamma <= -80)
 {
   line.style.backgroundColor = 'green';
   if (!OperatingSystem.iOS() && !canTakePhoto && lineVisible) window.navigator.vibrate(50);
   canTakePhoto = true;
 }
 else
 {
   line.style.backgroundColor = 'red';
   if (!OperatingSystem.iOS() && canTakePhoto && lineVisible) window.navigator.vibrate(50);
   canTakePhoto = false;
 }
 line.style.transform = 'rotate(' + (-beta).toString() + 'deg)';
 permissionForOrientation = 'none'
}

var cameraView = false;
var takingPhoto = false;

function afterLoad(){
    prepareCameraView();
}