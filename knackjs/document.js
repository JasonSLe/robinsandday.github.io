// Camera app share functions
//************************************* SAVE THE PICTURE YOU'VE JUST TAKEN WITH THE CAMERA TO KNACK*****************************************

  async function uploadFileOnly(app_id, fileBlob, fileName, pdfAssetField, infoElementId) {
    var url = 'https://api.knack.com/v1/applications/'+app_id+'/assets/file/upload';
    var form = new FormData();
    var headers = {
      'X-Knack-Application-ID': app_id,
      'X-Knack-REST-API-Key': 'knack',
    };

    form.append('files', fileBlob, fileName);

    try {
      $('#'+infoElementId).text('File upload started.');
      $.ajax({
        xhr: function() {
          var xhr = new window.XMLHttpRequest();
          xhr.upload.addEventListener("progress", function(evt) {
              if (evt.lengthComputable) {
                  var percentComplete = (evt.loaded / evt.total) * 100;
                  //Do something with upload progress here
                  $('#'+infoElementId).text('File upload progress: ' + parseInt(percentComplete)+'%');
              }
         }, false);
         return xhr;
        },
        url: url,
        type: 'POST',
        headers: headers,
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form
      }).then(rData => {
        $('#'+infoElementId).text('File upload finished.');
        try {
          if (typeof rData === 'string'){ rData = JSON.parse(rData);};

          $('#'+infoElementId).text('Upload succesfull, returning to app.');
          $('#kn-loading-spinner').hide();

          let message = {'event':'scanDocument','status':'ok','pdfAssetField':pdfAssetField,'pdfAssetId':rData.id, 'fileName':fileName}
          window.parent.postMessage(JSON.stringify(message), '*')
        } catch (e) {
          alert('File upload was not succesfull.')
          alert(e);
        }
      })
    } catch (ex){
      alert('File upload was not succesfull.')
      alert(ex);
    }
  }

  //************************************* LAYOUT *****************************************
  //this function sets the layout of page based on two params, if we are in cameraView and if we are actualy taking photo
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

            //SHOW RETAKE AND CONFIORM BUTTON
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
    $('#kn-loading-spinner').hide();
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

  img.style.visibility = 'hidden';

//************************************* OPERATING SYSTEM DETECTION *****************************************   
var OperatingSystem = {
   Android: function() {
       return navigator.userAgent.match(/Android/i);
    },

    iOS: function() {
	    if(navigator.vendor.match(/google/i)) {
		    return false;
    	}
    	else if(navigator.vendor.match(/apple/i)) {
		    return true;
    	}
    }
};


//************************************* GO INTO FULLSCREEN (ONLY ANDRIOD DEVICE WORK) *****************************************
/*
     if (document.documentElement.requestFullscreen) {
       document.documentElement.requestFullscreen();
     } else if (document.documentElement.mozRequestFullScreen) {
       document.documentElement.mozRequestFullScreen();
     } else if (document.documentElement.webkitRequestFullscreen) {
       document.documentElement.webkitRequestFullscreen();
     } else if (document.documentElement.msRequestFullscreen) {
       document.documentElement.msRequestFullscreen();
     }
*/
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


//************************************* TAKE A PICTURE AND CROP*****************************************
var sndCameraTakePhoto = document.createElement('audio');  
sndCameraTakePhoto.type = "audio/mpeg";     
sndCameraTakePhoto.src = "https://github.com/robinsandday/Camera_App-for-Image-Overlay/raw/main/camera-shutter-click.mp3";                 
sndCameraTakePhoto.load(); 

takePhotoButton.onclick = takePhoto;

  function takePhoto() {
    $('#kn-loading-spinner').show();
    if (OperatingSystem.Android()) {     
      imageCapture.takePhoto().then(function(blob) {
        img.classList.remove('hidden');
        img.style.visibility = 'visible';
        img.src = URL.createObjectURL(blob);
      }).catch(function(error) {
        console.log('takePhoto() error: ', error);
        alert('Photo taking error, please reload page.');
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
    
    try {
      new PinchZoom.default(document.getElementById('cameraTakePhotoDiv'), {});
    } catch (e) { alert(e)};

    takingPhoto = false;
    prepareLayout(cameraView, takingPhoto);
  }

  //CONFIRM BUTTON, WILL SAVE THE PHOTO TO KNACK//
  confirmButton.onclick = onclickConfimrButton;

  function onclickConfimrButton(){
    $('#kn-loading-spinner').show();
    confirmImage();
  }

  async function confirmImage(){
    var imgToSave = document.createElement('img');
    imgToSave.id = imgToSaveName;
    imgToSave.classList.add("photoGrid");
    imgToSave.onclick = removeMe;
    document.getElementById("cameraTakenPhotos").appendChild(imgToSave);
    photosTaken += 1;
    let outputCanvas = document.createElement("canvas");
    let outputCtx = outputCanvas.getContext("2d"); 
    if (img.naturalWidth>img.naturalHeight){
      let scale = 1190 / img.naturalWidth //for pdf size
      outputCanvas.height = img.naturalWidth * scale;
      outputCanvas.width = img.naturalHeight * scale;
      outputCtx.translate(0, img.naturalWidth * scale);
      outputCtx.rotate(-90*Math.PI/180);
      outputCtx.drawImage(img, 0, 0, img.naturalWidth * scale, img.naturalHeight * scale);
    } else {
      let scale = 1190 / img.naturalWidth //for pdf size
      outputCanvas.height = img.naturalHeight * scale;
      outputCanvas.width = img.naturalWidth * scale;
      outputCtx.drawImage(img, 0, 0, img.naturalWidth * scale, img.naturalHeight * scale);
    }
    imgToSave.src = outputCtx.canvas.toDataURL("image/jpeg", 0.8);
    imgToSave.setAttribute('data-cameraImageUploaded', 'NOT')
    // DISABLE SAVE BUTTON
    $("#cameraConfirm").attr("disabled", true);

    //STOP TRACK WHEN USER SAVES IMAGE
    video.srcObject.getVideoTracks().forEach(track => track.stop());

    //EXIT FULL SCREEN MODE
    /*
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    */
    prepareFileView()
  }


//*************************************RETAKE BUTTON, THIS WILL DELETE THE PHOTO TAKEN*****************************************

  retakeButton.onclick = function() {
    //CLEAR TAKEN PHOTO
    img.src = '';
    if (OperatingSystem.iOS()) {
        img.style.visibility = 'hidden';
    }      

    takingPhoto = true;
    prepareLayout(cameraView, takingPhoto);
  }


 //*************************************EXIT BUTTON TAKE USER BACK TO HOME PAGE*****************************************

  exitButton.onclick = function() {
    //EXIT FULL SCREEN MODE
    /*
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
*/
    //STOP TRACK WHEN USER EXIT THE APP
    try {
      video.srcObject.getVideoTracks().forEach(track => track.stop());
    } catch (e) {}

    prepareFileView()
  }  
}

var cameraView = false;
var takingPhoto = false;
var photosTaken = 0;

function removeMe(){
  var imageToRemove = this;
  document.getElementById("modalText").textContent = "Delete image?";
  document.getElementById("modalYes").onclick = function() {
    imageToRemove.remove();
    document.getElementById("modalDialog").style.display = "none";
  }
  document.getElementById("modalDialog").style.display = "block"
}

function prepareFileView(){
  cameraView = false;
  prepareLayout(cameraView, takingPhoto);
  if ($('img[id*="cameraImg"]').length === 0) {$('#cameraUploadDiv').hide()} else {$('#cameraUploadDiv').show()}

  $('#kn-loading-spinner').hide();
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
    }

    function cameraUpload(){
      $('#kn-loading-spinner').show();
      $('#cameraUploadOnce').attr("disabled", true);
      $('#cameraTakePhoto').attr("disabled", true);
      $('#cameraCancelAll').attr("disabled", true);
      $('#infoText').text('File conversion and upload started.');
      $('#infoDialog').show();
      uploadImages('infoText');
    }

    document.getElementById('cameraUploadOnce').onclick = cameraUpload;

    document.getElementById("modalClose").onclick = function() {
      document.getElementById("modalDialog").style.display = "none";
    }
    document.getElementById("modalCancel").onclick = function() {
      document.getElementById("modalDialog").style.display = "none";
    }
}

function right(str, chr){
	return str.slice(str.length-chr,str.length);
}

async function uploadImages(infoText){
  try {
    var pdfName = $('#cameraUploadFileName').attr('value');
    if (pdfName===''){pdfName='ScannedDocument.pdf'};
    if (right(pdfName,4).toLowerCase()!=='.pdf'){pdfName = pdfName+'.pdf'}

    $('#'+infoText).text('PDF creationg started.');
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF("p", "mm", "a4", true);

    var pdfWidth = doc.internal.pageSize.getWidth();
    var pdfHeight = doc.internal.pageSize.getHeight();

    let isFirstPage = true;
    for (let i = 1; i <= photosTaken; i++) { 
      if ($('#cameraImg'+i).length!==0){
        if (!isFirstPage) { doc.addPage("a4","portrait"); } else { isFirstPage=false }
        doc.addImage($('#cameraImg'+i).attr('src'), 'JPEG', 0, 0, pdfWidth, pdfHeight,undefined,'SLOW');
      }
    }
  } catch (e){
    alert(e)
  }
  try {
    var blobPDF = doc.output('blob');

    $('#'+infoText).text('PDF created, starting upload.');

    uploadFileOnly(returnData.app_id, blobPDF,pdfName, returnData.pdfAssetField, infoText);
  } catch(e){
    alert(e);
  }
}

var returnData = {};
function afterLoad(){
  var params = new URLSearchParams( window.location.search);
  returnData = {
    'app_id':params.get('app_id'),
    'pdfAssetField':params.get('pdfAssetField')
  }
  prepareFileViewOnce();
  prepareFileView();
}

