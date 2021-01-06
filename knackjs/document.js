// Camera app share functions
//************************************* SAVE THE PICTURE YOU'VE JUST TAKEN WITH THE CAMERA TO KNACK*****************************************

  //this function just parses recordId from URL //maybe needs to be altered acording the use
  function getRecordIdFromHref(ur) {
    var ur = ur.substr(0, ur.length - 1);
    return ur.substr(ur.lastIndexOf('/') + 1)
  }

  function uploadFileOnly(app_id, fileBlob, fileName) {
    var url = 'https://api.knack.com/v1/applications/'+app_id+'/assets/file/upload';
    var form = new FormData();
    var headers = {
      'X-Knack-Application-ID': app_id,
      'X-Knack-REST-API-Key': 'knack',
    };

    form.append('files', fileBlob, fileName);

    try {
      $('#infoText').text('File upload started.');
      var rData = $.ajax({
        url: url,
        type: 'POST',
        headers: headers,
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form,
        async: false
      });
      $('#infoText').text('File upload finished.');
      try {
        if (typeof rData === 'string'){ rData = JSON.parse(rData);};
        $('#dev').text(JSON.stringify(rData));
        return {
          'status': 'ok',
          'data' : rData
        };
      } catch (e) {
        return {
          'status': 'fail'
        };
      }
    } catch (ex){
      return {
        'status': 'fail'
      };
    }
  }

  async function uploadImage(token, updatingRecordId , app_id, imgUrl, imageObject, infoText) {
    var url = `https://api.knack.com/v1/applications/${app_id}/assets/image/upload`;
    var form = new FormData();
    var headers = {
      'X-Knack-Application-ID': app_id,
      'X-Knack-REST-API-Key': `knack`,
    };

    fetch(imgUrl)
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        form.append('files', blob, "fileimage.jpg");

       $.ajax({
        url: url,
        type: 'POST',
        headers: headers,
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form,
        async: false
      }).then(function(rData){
        try {
          var rDataP = JSON.parse(rData);
          if (rDataP.id) {
            var imageId = rDataP.id;
    
            $('#'+infoText).text('Image uploaded, saving data to Knack');
            var resp2 = saveImageLinkToKnack(imageObject.field, imageId, app_id, token, updatingRecordId, imageObject.scene)
            if (resp2.status !== 'ok') {
              alert('IMAGE NOT SAVED.');
            } else {
              $('#'+infoText).text('Take photos now');
              $('#'+imageObject.name).attr('data-cameraImageUploaded', 'YES');
              alert('IMAGE SAVED');
              return {
                'status': 'ok'
              };
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
      })

      });

  }

  function getTokenFromApify(tokenName) {
    var token = $.ajax({
      url: 'https://api.apify.com/v2/key-value-stores/2qbFRKmJ2qME8tYAD/records/'+tokenName+'_token_open?disableRedirect=true',
      type: `GET`,
      async: false
    }).responseText;
    if (!token) return '';
    token = token.replace('"', '').replace('"', '');
    return token;
  }

  function saveImageLinkToKnack(fieldName, imageId, app_id, token, updatingRecordId, knackSceneView) {
    var dataF = '{"' + fieldName + '": "' + imageId + '"}'

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


  //************************************* LAYOUT *****************************************
function prepareLayout(cameraView, takingPhoto){
    if (cameraView){
        $('#cameraTakePhotoDiv').show();
        $('#cameraDocGallery').hide();
        if (takingPhoto){
            $('#videoElement').show();
            $('#cameraVid_container').show();
            $('#cameraGui_controls').show();
            $("#cameraConfirm").attr("disabled", false);
            $("#cameraExit").show();
            $("#cameraRetake").hide();
            $("#cameraConfirm").hide();
            $('#cameraGrid').hide();
            $("#cameraText").hide();
            $("#takePhoto").show();
        } else {
            //HIDE VIDEO & OVERLAY ELEMENT
            $('#videoElement').hide();

            //DISPLAY COMPARISION CONTENT
            $('#cameraGrid').show();
            $("#cameraText").show();

            //SHOW RETAKLE AND CONFIORM BUTTON
            $("#cameraRetake").show();
            $("#cameraConfirm").show();

            //HIDE EXIT BUTTON
            $("#cameraExit").hide();

            // DISABLE TAKEPHOTO BUTTON
            //$("#takePhoto").attr("disabled", true);
            $("#takePhoto").hide();
        }
    } else {
        $('#cameraDocGallery').show();
        $('#cameraTakePhotoDiv').hide();
        $('#cameraVid_container').hide();
        $('#cameraGrid').hide();
        $('#cameraGui_controls').hide();
    }
}

function prepareCameraView(imgToSaveName){
  cameraView = true;
  takingPhoto = true;
  prepareLayout(cameraView, takingPhoto);

  var imageCapture;

  var img = document.querySelector("#cameraFrontpic");
  var video = document.querySelector('video');
  var takePhotoButton = document.querySelector('button#takePhoto');
  var confirmButton = document.querySelector('#cameraConfirm');
  var retakeButton = document.querySelector('#cameraRetake');
  var exitButton = document.querySelector('#cameraExit');
  var grid = document.querySelector('#cameraGrid');

  img.style.visibility = 'hidden';

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
    width: { min: 1440, max: 3984 },
    height: { min: 1080, max: 2988 },
    aspectRatio: 4/3,
    frameRate:{max: 30},
  };

  navigator.mediaDevices.getUserMedia({video: {facingMode: {exact: "environment"}}
 }).then(mediaStream => {
      document.querySelector('video').srcObject = mediaStream;

      const track = mediaStream.getVideoTracks()[0];

      track.applyConstraints(constraints);

      //$('#dev').text(JSON.stringify(track.getCapabilities()));

      imageCapture = new ImageCapture(track);

    })
    .catch(error => ChromeSamples.log('Argh!', error.name || error));


//************************************* TAKE A PICTURE AND CROP*****************************************
var sndCameraTakePhoto = document.createElement('audio');  
sndCameraTakePhoto.type = "audio/mpeg";     
sndCameraTakePhoto.src = "https://github.com/robinsandday/Camera_App-for-Image-Overlay/raw/main/camera-shutter-click.mp3";                 
sndCameraTakePhoto.load(); 

takePhotoButton.onclick = takePhoto;
  function takePhoto() {
    if (OperatingSystem.Android()) {     
      imageCapture.takePhoto().then(function(blob) {
        //so I use the blob to the shown image but also for the imageBeforeResize, which when is loaded updates the shown image with smaller image
        //theoretically the blob can be given only to the imageBeforeResize, and it should then update them shown image but this approach shows the image sooner ...
        img.classList.remove('hidden');
        img.style.visibility = 'visible';
        img.src = URL.createObjectURL(blob);
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
        img.classList.remove('hidden');
        img.style.visibility = 'visible';
	      img.src = URL.createObjectURL(blob);
	    }, 'image/jpeg', 1);
    } else {
     	alert('unsuported system'); 
	    alert(navigator.userAgent);
    }
    
    sndCameraTakePhoto.play();
    //sndCameraTakePhoto.currentTime=0;

    takingPhoto = false;
    prepareLayout(cameraView, takingPhoto);
  }

  function removeMe(){
    var imageToRemove = this;
    document.getElementById("modalText").textContent = "Delete image?";
    document.getElementById("modalYes").onclick = function() {
      imageToRemove.remove();
      document.getElementById("modalDialog").style.display = "none";
    }
    document.getElementById("modalDialog").style.display = "block"
  }

  //CONFIRM BUTTON, WILL SAVE THE PHOTO TO KNACK//
  confirmButton.onclick = function() {
    var imgToSave = document.createElement('img');
    imgToSave.id = imgToSaveName;
    imgToSave.classList.add("photoGrid");
    imgToSave.onclick = removeMe;
    document.getElementById("cameraTakenPhotos").appendChild(imgToSave);
    photosTaken += 1;
    //var imgToSave = document.getElementById(imgToSaveName);
    let outputCanvas = document.createElement("canvas");
    let outputCtx = outputCanvas.getContext("2d"); 
    if (img.naturalWidth>img.naturalHeight){
      outputCanvas.height = img.naturalWidth;
      outputCanvas.width = img.naturalHeight;
      outputCtx.translate(0, img.naturalWidth);
      outputCtx.rotate(-90*Math.PI/180);
      outputCtx.drawImage(img, 0, 0);
    } else {
      outputCanvas.height = img.naturalHeight;
      outputCanvas.width = img.naturalWidth;
      outputCtx.drawImage(img, 0, 0);
    }
    imgToSave.src = outputCtx.canvas.toDataURL("image/jpeg", 1.0);
    imgToSave.setAttribute('data-cameraImageUploaded', 'NOT')
    // DISABLE SAVE BUTTON
    $("#cameraConfirm").attr("disabled", true);

    //STOP TRACK WHEN USER SAVES IMAGE
    video.srcObject.getVideoTracks().forEach(track => track.stop());

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
    
    prepareFileView()
  };


//*************************************RETAKE BUTTON, THIS WILL DELETE THE PHOTO TAKEN*****************************************

  retakeButton.onclick = function() {
    //CLEAR TAKEN PHOTO
    img.src = '';
    if (OperatingSystem.iOS()) {
        // on iOS devices it should hide the img tag when user agent clicks retake.
        img.style.visibility = 'hidden';
    }      

    takingPhoto = true;
    prepareLayout(cameraView, takingPhoto);
  }


 //*************************************EXIT BUTTON TAKE USER BACK TO HOME PAGE*****************************************

  exitButton.onclick = function() {
    //REDIRECT USER BACK TO HOME PAGE
    /*setTimeout(function() {
      window.location = backUrl;
    }, 100);
    */
    prepareFileView()

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

var cameraView = false;
var takingPhoto = false;
var photosTaken = 0;

function prepareFileView(){
  cameraView = false;
  prepareLayout(cameraView, takingPhoto);
  if ($('img[id*="cameraImg"]').length === 0) {$('#cameraUploadOnce').hide()} else {$('#cameraUploadOnce').show()}
}

function prepareFileViewOnce(){
    let cameraTakePhoto = document.getElementById('cameraTakePhoto');
    cameraTakePhoto.onclick = function() {
        prepareCameraView('cameraImg'+(photosTaken+1));
    }

    let cancelAll = document.getElementById('cameraCancelAll');
    cancelAll.onclick = function(){
      let message = {'event':'scanDocument','status':'cancel'}
      window.parent.postMessage(JSON.stringify(message), '*')
      /*
      setTimeout(function() {
        window.location = returnData.returnUrl;
      }, 100);
      */
    }

    document.getElementById('cameraUploadOnce').onclick = function(){
        $('#cameraUploadOnce').hide();
        $('#infoText').text('File conversion and upload started.');
        $('#infoDialog').show();
        uploadImages('cameraUploadInfo');
    }

    document.getElementById("modalClose").onclick = function() {
      document.getElementById("modalDialog").style.display = "none";
    }
    document.getElementById("modalCancel").onclick = function() {
      document.getElementById("modalDialog").style.display = "none";
    }
}

function uploadImages(infoText){
  $('#infoText').text('PDF creationg started.');
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF("p", "mm", "a4");

  var pdfWidth = doc.internal.pageSize.getWidth();
  var pdfHeight = doc.internal.pageSize.getHeight();

  let isFirstPage = true;
  for (let i = 1; i <= photosTaken; i++) { 
    if ($('#cameraImg'+i).length!==0){
      if (!isFirstPage) { doc.addPage("a4","portrait"); } else { isFirstPage=false }
      doc.addImage($('#cameraImg'+i).attr('src'), 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
  }
  //doc.save("HTML-Document.pdf");
  try {
    var blobPDF = doc.output('blob');

    $('#infoText').text('PDF created, starting upload.');

    var ret = uploadFileOnly(returnData.app_id, blobPDF,'created.pdf');
    if (ret.status==='ok' && ret.data){
      $('#infoText').text('Upload succesfull, returning to app.');
      let respText = JSON.parse(ret.data.responseText);
      let message = {'event':'scanDocument','status':'ok','pdfAssetField':returnData.pdfAssetField,'pdfAssetId':respText.id}
      window.parent.postMessage(JSON.stringify(message), '*')
      /*
      setTimeout(function() {
        window.location = returnData.returnUrl+'?pdfAssetField='+returnData.pdfAssetField+'&pdfAssetId='+respText.id;
      }, 100);
      */
    } else {
      alert('File upload was not succesfull.')
      alert(ret);
    }
  } catch(e){
    alert(e);
  }
}

var returnData = {};
function afterLoad(){
  var params = new URLSearchParams( window.location.search);
  returnData = {
    'app_id':params.get('app_id'),
    'returnUrl':params.get('returnUrl'),
    'pdfAssetField':params.get('pdfAssetField')
  }
  prepareFileViewOnce();
  prepareFileView();
}

