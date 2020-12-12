// Camera app share functions
//************************************* SAVE THE PICTURE YOU'VE JUST TAKEN WITH THE CAMERA TO KNACK*****************************************

  //this function just parses recordId from URL //maybe needs to be altered acording the use
  function getRecordIdFromHref(ur) {
    var ur = ur.substr(0, ur.length - 1);
    return ur.substr(ur.lastIndexOf('/') + 1)
  }

  function uploadImage(app_id, imgUrl) {
    var url = `https://api.knack.com/v1/applications/${app_id}/assets/image/upload`;

    var form = new FormData();

    var headers = {
      'X-Knack-Application-ID': app_id,
      'X-Knack-REST-API-Key': `knack`,
    };

    var blob = {};

    return fetch(imgUrl)
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        form.append('files', blob, "fileimage.jpg");


        var rData = $.ajax({
          url: url,
          type: 'POST',
          headers: headers,
          processData: false,
          contentType: false,
          mimeType: 'multipart/form-data',
          data: form,
          async: false
        }).responseText;



        try {
          var rDataP = JSON.parse(rData);
          if (rDataP.id) {
            return {
              'status': 'ok',
              'id': rDataP.id
            }
          }
          return {
            'status': 'fail'
          };
        } catch (e) {
          return {
            'status': 'fail'
          };
        }

      });

  }

  function getTokenFromApify() {
    var token = $.ajax({
      url: 'https://api.apify.com/v2/key-value-stores/2qbFRKmJ2qME8tYAD/records/apiaccount_token_open?disableRedirect=true',
      type: `GET`,
      async: false
    }).responseText;

    if (!token) return '';

    token = token.replace('"', '').replace('"', '');

    return token;
  }



  function saveImageLinkToKnack(fieldName, imageId, app_id, token, updatingRecordId, knackSceneView) {
    var dataF = '{"' + fieldName + '": "' + imageId + '"}'
    //alert(dataF);

    var headersForSecureView = {
      'X-Knack-Application-ID': app_id,
      'Authorization': token
    };



    var rData2 = $.ajax({
      url: 'https://api.knack.com/v1/pages/' + knackSceneView + '/records/' + updatingRecordId,
      type: `PUT`,
      headers: headersForSecureView,
      contentType: 'application/json',
      data: dataF,
      async: false
    }).responseText;

    Knack.showSpinner();

    try {
      var rData2P = JSON.parse(rData2);
      if (rData2P.record) {
        return {
          'status': 'ok'
        }
      }
    } catch (e) {
      return {
        'status': 'fail'
      };

    }
  }


function prepareCameraView(backUrl,app_id,imageFieldOnKnack,imageViewOnKnack){
// ***************************************************************************************************************************
// ****************************************CAMERA APP WITH PICTURE OVERLAY******************************************************
// *****************************************************************************************************************************

  var imageCapture;

  var img = document.querySelector('img');
  var frontpic = document.querySelector("#cameraFrontpic");
  var video = document.querySelector('video');
  var takePhotoButton = document.querySelector('button#takePhoto');
  var confirmButton = document.querySelector('#cameraConfirm');
  var retakeButton = document.querySelector('#cameraRetake');
  var exitButton = document.querySelector('#cameraExit');
  var rotateButton = document.querySelector('#cameraRotate');
  var grid = document.querySelector('#cameraGrid');
  var line = document.getElementById('cameraLine');
  var modal = document.querySelector('#cameraModal');
  var acceptButton = document.querySelector('#cameraAccept');

//************************************* OPERATING SYSTEM DETECTION *****************************************   
var OperatingSystem = {
   Android: function() {
       return navigator.userAgent.match(/Android/i);
    },

    iOS: function() {
	if(navigator.vendor.match(/google/i)) {
		return false;
        	//browserName = 'chrome/blink';
    	}
    	else if(navigator.vendor.match(/apple/i)) {
		return true;
        	//browserName = 'safari/webkit';
    	}
       //return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
};


//************************************* GO INTO FULLSCREEN (ONLY ANDRIOD DEVICE WORK) *****************************************

     if (document.documentElement.requestFullscreen) {
       document.documentElement.requestFullscreen();
     } else if (document.documentElement.mozRequestFullScreen) {
       document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullscreen) {
       document.documentElement.webkitRequestFullscreen();
     } else if (document.documentElement.msRequestFullscreen) {
       document.documentElement.msRequestFullscreen();
     }

//************************************* OPEN THE CAMERA BY ASKING USER PERMISSION(APPLE DEVICE) AND APPLY VIDEO STREAM SETTINGS*****************************************

const constraints = {
 width: { min: 1440, ideal: 1280, max: 3984 },
 height: { min: 1080, ideal: 720, max: 2988 },
 aspectRatio: 4/3,
 frameRate:{max: 30}
  };

  navigator.mediaDevices.getUserMedia({video: {facingMode: {exact: "environment"}}
 }).then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream;

      const track = mediaStream.getVideoTracks()[0];

      track.applyConstraints(constraints);

      imageCapture = new ImageCapture(track);

    })
    .catch(error => ChromeSamples.log('Argh!', error.name || error));



//**************************** APPLY PICTURE OVERLAY WHICH IS DRAWN ONTO THE CANVAS. WITH THE OVERLAY EFFECT*****************************************

 const canvas = document.getElementById('cameraOverlayCanvas');  
 const ctx = canvas.getContext('2d');
 let interval = 0;
 const effect = $('#cameraOverlayCanvas');

 const image = new Image('naturalWidth', 'naturalHeight');
 image.onload = drawImageActualSize;
 //image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebg.png?token=AK2DHPRJXE5E2DFU5EXYCXS7Y6ROW';
 image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebg_with_guide.png?token=AK2DHPXYOXJWES4XWCG2HUK72D522';

   //this image gets the captured photo and when it is loaded it resizes iteslf and saves the image to shown image
var imageBeforeResize = document.createElement('img');

imageBeforeResize.onload = () => {
   const elem = document.createElement('canvas');
   elem.width = 768;
   elem.height = 576;
   const ctx = elem.getContext('2d');
  //check if the resolution of the image is 4:3

 //ONE STEP RESIZE
 /*
  if ((imageBeforeResize.width/imageBeforeResize.height)===(4/3)){
    var percentOfPicture = 0.6;
    ctx.drawImage(imageBeforeResize, imageBeforeResize.width * (1-percentOfPicture)/2, imageBeforeResize.height * (1-percentOfPicture)/2, imageBeforeResize.width * percentOfPicture,imageBeforeResize.height * percentOfPicture, 0, 0, 768, 576);
  } else {
    var percentOfPicture69 = 0.7;
    //if not, compute what you need to crop, now it expects the width/heigth more than 4/3, so it crops just width
    var sx = ((imageBeforeResize.width-((4/3)*imageBeforeResize.height))/imageBeforeResize.width) * imageBeforeResize.width / 2;
    var sw = imageBeforeResize.width - (((imageBeforeResize.width-((4/3)*imageBeforeResize.height))/imageBeforeResize.width) * imageBeforeResize.width);
    ctx.drawImage(imageBeforeResize, sx + sw * (1-percentOfPicture69)/2, imageBeforeResize.height * (1-percentOfPicture69)/2, sw * percentOfPicture69, imageBeforeResize.height * percentOfPicture69, 0, 0, 768, 576);
  }
  */
if (typeof ctx.filter === "undefined") {
 alert("Sorry, the browser doesn't support Context2D filters.")
}
  if ((imageBeforeResize.width/imageBeforeResize.height)===(4/3)){
    var percentOfPicture = 0.6;
    ctx.drawImage(imageBeforeResize, imageBeforeResize.width * (1-percentOfPicture)/2, imageBeforeResize.height * (1-percentOfPicture)/2, imageBeforeResize.width * percentOfPicture,imageBeforeResize.height * percentOfPicture, 0, 0);
  } else {
    var percentOfPicture69 = 0.7;
    //if not, compute what you need to crop, now it expects the width/heigth more than 4/3, so it crops just width
    var sx = ((imageBeforeResize.width-((4/3)*imageBeforeResize.height))/imageBeforeResize.width) * imageBeforeResize.width / 2;
    var sw = imageBeforeResize.width - (((imageBeforeResize.width-((4/3)*imageBeforeResize.height))/imageBeforeResize.width) * imageBeforeResize.width);
    ctx.drawImage(imageBeforeResize, sx + sw * (1-percentOfPicture69)/2, imageBeforeResize.height * (1-percentOfPicture69)/2, sw * percentOfPicture69, imageBeforeResize.height * percentOfPicture69, 0, 0);
  }
   //save the resized image to the shown img
   ctx.canvas.toBlob((blob) => {
      img.src = URL.createObjectURL(blob);
  }, 'image/jpeg', 1);
  Knack.hideSpinner();
}

 function drawImageActualSize() {
   canvas.width = this.naturalWidth;
   canvas.height = this.naturalHeight;
   ctx.drawImage(this, 0, 0);
 }

 var go = () => {
   effect.show();
   if(!interval) { // if `interval` is equal to 0     
    interval = setInterval(function () {
       effect.fadeIn(1500, function () {
         effect.fadeOut(1500);
       });
     }, 3000);
 }
 }

 var stop = () => {
   effect.hide();
   if(interval) {
     clearInterval(interval);
     interval = 0; 
   }
 }


//**************************** SPIRIT LEVEL *****************************************

 function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  console.log(beta);

  if(beta <=1 && beta >= -1)
  {
    line.style.backgroundColor = 'green';
  }
  else
  {
    line.style.backgroundColor = 'red';
  }
  line.style.transform = 'rotate(' + beta.toString() + 'deg)';
}

   // when page loads checks if the device requires user to to enable motion sensors, If they do then display the dialog
if ( window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function' ){
    console.log("permision needed");
    $('#cameraModal').show(); // show dialog asking user to enable motion sensor
    //$("#takePhoto").attr("disabled", true);//De-activate takephoto button until user agnet agreed
   $("#takePhoto").hide();

  acceptButton.onclick = function(){
  DeviceOrientationEvent.requestPermission()
.then(response => {
  if (response == 'granted') {
    window.addEventListener("deviceorientation", handleOrientation, true);
    $('#cameraModal').hide();
    //$("#takePhoto").removeAttr('disabled');
	  $("#takePhoto").show();
  }
})
.catch(console.error)
  }
} else {
  // non iOS 13+
  window.addEventListener("deviceorientation", handleOrientation, true);
}

 //************************************* LAYOUT *****************************************

  //HIDE RETAKE AND CONFIRM BUTTONS
  $("#cameraRetake").toggle();
  $("#cameraConfirm").toggle();


  //HIDE THE COMPARISION PICTURE AND TEXT
  $("#cameraCompare").toggle();
  $("#cameraText").toggle();


//**************************** DETECT SCREEN ORIENTATION WHEN THE APP IS LOADED AND DETECT WHEN USER CHANGES SCREEN ORIENTATION*****************************************


  //DETECT WHICH ORIENTATION THE USEER IS IN

  if(window.innerHeight > window.innerWidth){

    // if portrait
       $("#cameraLine").hide();
       $("#takePhoto").hide();
       $("#cameraRotate").show();
       $("#cameraOverlayCanvas").hide();
       //$(stop);
  }


if(window.innerWidth > window.innerHeight){

  // if landscape
    $("#cameraLine").show();
  	$("#takePhoto").show();
  	$("#cameraRotate").hide();
    $("#cameraOverlayCanvas").hide();
    $(go);
}


  //IF THE USER CHANGES SCREEN ORIENTATION

$(window).on("orientationchange",function(){
  if(window.orientation == 0 || window.orientation == 180)
    // Portrait
  {
    $(stop);
    $("#cameraLine").hide();
    $("#takePhoto").hide();
    $("#cameraRotate").show();


  }
  else if(window.orientation == 90 || window.orientation == 270) // Landscape
  {
    $("#takePhoto").show();
    $("#cameraLine").show();
    $("#cameraRotate").hide();
    $(go);
  }
});


//************************************* TAKE A PICTURE AND CROP*****************************************

takePhotoButton.onclick = takePhoto;

  function takePhoto() {

    Knack.showSpinner();

    if (OperatingSystem.Android()) {

      imageCapture.takePhoto().then(function(blob) {
        console.log('Photo taken:', blob);
        //so I use the blob to the shown image but also for the imageBeforeResize, which when is loaded updates the shown image with smaller image
        //theoretically the blob can be given only to the imageBeforeResize, and it should then update them shown image but this approach shows the image sooner ...
        img.classList.remove('hidden');
        img.src = URL.createObjectURL(blob);
        imageBeforeResize.src = URL.createObjectURL(blob);
      }).catch(function(error) {
        console.log('takePhoto() error: ', error);
      });
    } else if (OperatingSystem.iOS()) {
      	var c = document.createElement('canvas');
 		c.width = video.videoWidth;
		c.height = video.videoHeight;
	    	var ctx = c.getContext('2d');
	    	ctx.drawImage(video, 0, 0);
	    ctx.canvas.toBlob((blob) => {
		img.style.visibility = 'visible';
        	imageBeforeResize.src = URL.createObjectURL(blob); //c.toDataURL('image/webp');
	      	img.src = URL.createObjectURL(blob);
	  }, 'image/jpeg', 1);
    } else {
     	alert('unsuported system'); 
	    alert(navigator.userAgent);
    }

    //HIDE VIDEO & OVERLAY ELEMENT
    $('video').toggle();
    $(stop);

    //DISPLAY COMPARISION CONTENT
    $("#cameraCompare").toggle();
    $("#cameraText").toggle();

   //SHOW RETAKLE AND CONFIORM BUTTON
    $("#cameraRetake").toggle();
    $("#cameraConfirm").toggle();

    //HIDE EXIT BUTTON
    $("#cameraExit").toggle();

    //HIDE LEVEL LINE
    $("#cameraLine").hide();

    // DISABLE TAKEPHOTO BUTTON
    //$("#takePhoto").attr("disabled", true);
	  $("#takePhoto").hide();
  }


  //CONFIRM BUTTON, WILL SAVE THE PHOTO TO KNACK//
  confirmButton.onclick = function() {

    Knack.showSpinner();

    // DISABLE SAVE BUTTON
    $("#cameraConfirm").attr("disabled", true);

    //STOP TRACK WHEN USER SAVES IMAGE
    video.srcObject.getVideoTracks().forEach(track => track.stop());

    var imgUrl = $('#cameraFrontpic').attr('src');

    uploadImage(app_id, imgUrl)
      .then(function(resp) {
        if (!resp || resp.status !== 'ok') {
          alert('Upload of image failed.');
          return;
        }
        var imageId = resp.id;

        var token = getTokenFromApify();

        if (token === '') {
          alert('Authorizing problem.');
          return;


        }

        var updatingRecordId = getRecordIdFromHref(location.href);

        var resp2 = saveImageLinkToKnack(imageFieldOnKnack, imageId, app_id, token, updatingRecordId, imageViewOnKnack)
        if (resp2.status !== 'ok') {
          alert('IMAGE NOT SAVED.');
        } else {

        }

        setTimeout(function() {
          window.location = backUrl;
        }, 100);

      });

  };


//*************************************RETAKE BUTTON, THIS WILL DELETE THE PHOTO TAKEN*****************************************

  retakeButton.onclick = function() {


        if (OperatingSystem.iOS()) {
          // on iOS devices it should hide the img tag when user agent clicks retake.
          img.src = '';
          img.style.visibility = 'hidden';

        }else{   
     }         
    //CLEAR TAKEN PHOTO
    img.src = '';


    //SHOW CAMERA AND CANVAS ELEMENT WHEN THE USER CLICKS RETAKE
    $('video').toggle();
    $("#cameraCompare").toggle();
    $("#cameraText").toggle();
    $(go);


    // HIDE RETAKE AND CONFIRM BUTTON
    $("#cameraRetake").toggle();
    $("#cameraConfirm").toggle();

    // SHOW EXIT BUTTON
    $("#cameraExit").toggle();

    // SHOW LEVEL LINE
    $("#cameraLine").show();

    // ACTIVATE TAKEPHOTO BUTTON
    //$("#takePhoto").removeAttr('disabled');
	  $("#takePhoto").show();

  }


 //*************************************EXIT BUTTON TAKE USER BACK TO HOME PAGE*****************************************

  exitButton.onclick = function() {

    //REDIRECT USER BACK TO HOME PAGE
    setTimeout(function() {
      window.location = backUrl;
    }, 100);

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

    //STOP TRACK WHEN USER EXIT THE APP
    video.srcObject.getVideoTracks().forEach(track => track.stop());

  }  
}

$(document).on('knack-view-render.view_56', function(event, view, data) {
	prepareCameraView("https://salesjourney.knack.com/christians-test-app2#imaging-test-that-reflects-live-app/take-images/"+getRecordIdFromHref(location.href)+"/","5f6de40a07e72b0018484802",'field_22','scene_15/views/view_39');
});
