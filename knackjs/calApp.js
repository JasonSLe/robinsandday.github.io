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

var cameraView = false;
var takingPhoto = false;

function afterLoad(){
    prepareCameraView();
}