// ************************************************************************************************************************************************
// Apify dates of data checking download Added by HH on 01052019***********************************************************************************
// ************************************************************************************************************************************************

// Listen for the list page view
$(document).on('knack-records-render.view_2157', function(event, view, records) {
  // Do something after the records render
  //2console.log(records.length);
  //alert('listener for records, # of records is: ' + records.length);
  //Go through all rows
  
  $('tbody tr').each(function(){ 
      //Check if the row has field for the date - it should be by all when it is updated
      try {
        if ($(this).attr('id')!==undefined){
          let orderNumber = $(this).find('td').eq(0).text().match(new RegExp(/PCD\/VX Order: \d*/))[0].replace('PCD/VX Order: ','');
          console.log('orderNumber',orderNumber);
          if($(this).find('div[id="dodp"]').length){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/DETAIL_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="dodp"]').text(data);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("error. textStatus: %s  errorThrown: %s", textStatus, errorThrown);
              }, async:true, context:this, cache: false, timeout: 15000});
              
          };

        if($(this).find('div[id="dod9v8"]').length){
              if ($(this).find('div[id="dod9v8"]').text()!==''){
                //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
              var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/VINENQ_'+orderNumber+'?disableRedirect=true';
                //AJAX Get for the URL - response is now just the date, so we will only print it to html page
                $.ajax({url:url, success: function(data){
                    $(this).find('div[id="dod9v8"]').text(data);
                }, async:true, context:this, cache: false, timeout: 15000});
              }
        };

        if($(this).find('div[id="doAFRL"]').length){
          if ($(this).find('div[id="doAFRL"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/AFRL_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doAFRL"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
        if($(this).find('div[id="doINV"]').length){
          if ($(this).find('div[id="doINV"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/INVOICE_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doINV"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
        if($(this).find('div[id="doGEFCO"]').length){
          if ($(this).find('div[id="doGEFCO"]').text()!==''){
              //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
            var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/GEFCO_'+orderNumber+'?disableRedirect=true';
          //AJAX Get for the URL - response is now just the date, so we will only print it to html page
              $.ajax({url:url, success: function(data){
                  $(this).find('div[id="doGEFCO"]').text(data);
              }, async:true, context:this, cache: false, timeout: 15000});
          }
        };
      }
    } catch (e){
      console.log(e);
    }
	});
    
});


//HIDE THE LOGO AND logged in user in all pages
$(document).on('knack-view-render.any', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

hashCode = function(elem) {
  var hash = 0, i, chr;
  if (elem.length === 0) return hash;
  for (i = 0; i < elem.length; i++) {
    chr   = elem.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

var submitUserLoginForm = function() {
  if ($('[id="email"]').length===0){ 
    return;
  }
    var url = window.location.toString();
    if (!url.indexOf('https://www.robinsandday.co.uk/digital-orders?') === 0) {
        alert("Invalid URL");
        return;
    }

    var params = new URLSearchParams( window.location.search);
    //console.log(window.location.search);
    /*
    var userName = params.get('user');
    var hash = params.get('hash');
    var timeStamp = params.get('timeStamp');
    
    var myHash = 'H' + hashCode('U' + userName + timeStamp);
    if (myHash !== hash) {
      console.log({
        url, userName, hash, timeStamp
      });
        alert('BAD SECURITY HASH');
        return;
    }
    timeStamp = parseInt(timeStamp);
    var myTimeStamp = Math.floor((new Date()).getTime() / 30000);
    if ((myTimeStamp - timeStamp) > 4) {
      console.log({
        url, userName, hash, timeStamp
      });      
        //alert('OLD TIME STAMP');
        return;
    }
    */
    
    var token = params.get('token');
    token = atob(token);
    if (!token.includes('#')){
      alert('Wrong token');
      return;
    }
    let userName2 = token.split('#')[0];
    let password = token.split('#')[1];
    
    //type userName from url, my secret password and click login
    //if auth successfully then it shows the app, otherwise login screen
    $('[id="email"]').val(userName2);
    //alert('Pass'+hashCode(userName).toString());
    $('[id="password"]').val(password);
    $('input[type="submit"]').click();
};

//on the login page
$(document).on("knack-view-render.view_2146", function (event, view) {
  submitUserLoginForm();
});

var loginSceneNames = ["scene_917","scene_989","scene_883","scene_1074","scene_1113","scene_1115"]; ///add scene numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    console.log(selector_scene)
    submitUserLoginForm();
  });
}

//this code is for checking the right user in the Customer portal, if logged in user is not the same as car connected user it redirects
checkUser = function(data) {
  if (Knack.getUserAttributes().email!==data.field_6218_raw.email && Knack.getUserAttributes().roles.includes('object_126')){
    alert('Sorry, you are not authorised to view this page. Please follow the link from your Customer Portal to view details & status of your Vehicle');
    location.href = 'https://salesjourney2.knack.com/digital-deal-file-orders#dialog-order-information/new-digital-deal-file/customer-details/';
  }	
};

//this code calls the function for checking the user rights, it needs to be called in view which has the connected customer
$(document).on('knack-view-render.view_2605', function(event, view, data) {
  checkUser(data);
});



//************************************* NEW VEHICLE DEAL FILE *****************************************

/* Change Keyword Search Placeholder Text for used deal files */
$(document).on('knack-scene-render.scene_917', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Dealer Address, Reg, Stock No.")
});


//HANDOVER APPOINTMENT PAGE
//Restrict Available Times for Handover Appointment to 8am - 7pm

var view_names = ["view_2630"]; ///add view numbers as necessary

view_names.forEach(bindToUpdate1);

function bindToUpdate1(selector_view_name){
$(document).on('knack-view-render.' + selector_view_name, function(event, view, data) {

$(document).ready(function(){
$('.ui-timepicker-input').timepicker({
minTime: '08:00:00',     //  8:00 AM,  Change as necessary
maxTime: '19:00:00',        //  7:00 PM,  Change as necessary
step: '15'		// Dropdown Interval every 15 mins

});
});
});

}

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Order Refresh ****************//

$(document).on('knack-record-update.view_2854', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 16000);
  
  alert("Please wait while we fetch the Order, Customer & P/X Details from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Invoice Retrieval ****************//

$(document).on('knack-record-update.view_2855', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 16000);
  
  alert("Please wait while we fetch the Invoice from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 10 seconds after Re-Check for for P/X Valuation ****************//

$(document).on('knack-record-update.view_2584', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 10000);
  
  alert("Please wait while we search for a Completed Digital Part Exchange Appraisal. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 10 seconds after Re-Check for for P/X Valuation ****************//

$(document).on('knack-record-update.view_2574', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 10000);
  
  alert("Please wait while we search for a Completed Digital Part Exchange Appraisal. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

// Disable Stock Number Field on INVOICE Retrieval if NOT Blank
//$(document).on('knack-view-render.view_2855', function(event, view) {

// if ($('#view_2855 #field_6115').val() != "") {

//      $('#view_2855 #field_6115').attr('disabled', 'disabled'); // disable Stock Number input field

//    }; // end if

//});

//****************** Refresh Handover Checklist Page if Selected to update ****************//

$(document).on('knack-record-update.view_2760', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});

//****************** Refresh Customer Satisfaction Survey Page if Selected to update ****************//

$(document).on('knack-record-update.view_2767', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});

// ----------  Service Plan table expand or collapse groupings ----------

// Call the function when your table renders – do this for each table you’re applying this to
$(document).on('knack-view-render.view_3668', function(event, view, data) {
    addGroupExpandCollapse(view);
})

// The function itself – only needed once
var addGroupExpandCollapse = function(view) {

    $('#' + view.key + ' .kn-table-group').css("cursor", "pointer");

    $('#' + view.key + " .kn-group-level-1 td").each(function() {
        if ($(this).text().length > 1) {
            var RowText = $(this).html();
            $(this).html('<i class="fa fa-minus-square-o"></i>&nbsp;' + RowText);
        }
    });

    // This line causes groups to be collapsed by default.
    //$('#' + view.key + ' .kn-table-group').nextUntil('.kn-table-group').toggle();

    $('#' + view.key + ' .kn-table-group').click(function() {

        $(this).nextUntil('.kn-table-group').toggle();

        if ($(this).html().indexOf('fa-minus') !== -1) {
            $(this).html($(this).html().replace('minus', 'plus'));
        } else {
            $(this).html($(this).html().replace('plus', 'minus'));
        }
    });

}

//**************************** NEW DEAL FILE SIGN ONLINE ***********************

// Code to wait following Form Submission while PIN is Checked in Integromat

$(document).on('knack-form-submit.view_3676', function(event, view, data) { 


	setTimeout(function(){ 

    	Knack.showSpinner();

    }, 0); 

  

	commandURL = "https://hook.integromat.com/vxmlosfeinmtjdo3mfn3v7tfcqru491z?recordid=" + data.id ;


 	$.get(commandURL, function(data, status){


      Knack.hideSpinner();

      $(".kn-message.success").html("<b>" + data + "</b>");


    });

});

//Hide Crumbtrail & Header on Sign Online Customer Pages
$(document).on('knack-scene-render.scene_1086', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1088', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1089', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1090', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1091', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1092', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1093', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1094', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1095', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1096', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1097', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

//DOCUMENT SCAN APP
var scanAppHTML = '';
function embedScanApp(){
  let scanApp = document.getElementById('scanApp');
  if (!scanApp){
    if (scanAppHTML===''){
      scanAppHTML = $.ajax({
          type: "GET",
          url: 'https://robinsandday.github.io/photoTakeApp/documentPart.html',
          cache: false,
          async: false
      }).responseText;
    }
    scanApp = document.createElement('div');
    scanApp.innerHTML = scanAppHTML;
    scanApp.id = 'scanApp';
    scanApp.style="display: none;"
    document.body.appendChild(scanApp);
  } else {
    scanApp.innerHTML = scanAppHTML;
  }

  var nowS = Date.now().toString();

  if ($('#scanAppCss').length===0){
    var style = document.createElement('link');
    style.id = "scanAppCss";
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'https://robinsandday.github.io/knackjs/document.css?'+nowS;
    document.getElementsByTagName( 'head' )[0].appendChild( style )
  }

  function emptyCallback() { }

  function loadScript(src, id,  callback){
    var script, scriptTag;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = id;
    script.src = src;
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState == 'complete' ){ callback(); }
    };
    scriptTag = document.getElementsByTagName('script')[0];
    scriptTag.parentNode.insertBefore(script, scriptTag);
  }
  if ($('#scanAppJS').length===0){
    loadScript("https://robinsandday.github.io/knackjs/document.js?"+nowS,'scanAppJS', emptyCallback);
  }
  if ($('#jsPDF').length===0){
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.2.0/jspdf.umd.min.js','jsPDF', emptyCallback)
  }
}

function showScanApp(button){
  afterLoad(button.getAttribute('data-app_id'), button.getAttribute('data-pdfassetfield'));
  $('#scanApp').show();
  $('.kn-content').hide();
}

function hideScanApp(){
  $('#scanApp').hide();
  $('.kn-content').show();
}

function fillDataToKnack(message){
  hideScanApp();
  $('input[name="'+message.pdfAssetField+'"]').val(message.pdfAssetId);
  $('div[id="kn-input-'+message.pdfAssetField+'"] div[class="kn-asset-current"]').html(message.fileName);
  $('#'+message.pdfAssetField+'_upload').hide();
  $('.kn-file-upload').html('File uploaded successfully.');
}

//END OF SCAN APP CODE

//THIS IS ARRAY OF scenes with document scan
var scanDocsSceneNames = ["scene_931","scene_959", "scene_952", "scene_984", "scene_957", "scene_967", "scene_972", "scene_973", "scene_979", "scene_976", "scene_981", "scene_980", 
			 "scene_1066", "scene_978", "scene_979", "scene_964", "scene_862", "scene_1068"];
scanDocsSceneNames.forEach(scanDocsLinkFunction);
function scanDocsLinkFunction(selector_view){
  $(document).on("knack-scene-render." + selector_view, function(event, view, data) {
    embedScanApp();
    if ($('button[id="scanDocument"]').length>0){
      for (let i = 0;i<$('button[id="scanDocument"]').length;i++){
        $('button[id="scanDocument"]').eq(i).on("click",function(){
          showScanApp(this);
        });
      }
    }
  });
}  

// ----------  refresh Sales Manager To Do (New Deal File Admin) Table every 50 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_989', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3766").is(":visible")==true){ Knack.views["view_3766"].model.fetch();recursivecall();} }, 50000);
}

// ----------  refresh Sales Admin To Do (New Deal File Admin) Table every 50 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_989', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3767").is(":visible")==true){ Knack.views["view_3767"].model.fetch();recursivecall();} }, 50000);
}

// NEW DEAL FILE – TRIGGER INTEGROMAT UPON CUSTOMER SURVEY FORM COMPLETION
$(document).on('knack-form-submit.view_2765', function(event, view, data) { 
	let commandURL = "https://hook.integromat.com/lnunp83lom13c9swu0vgabmurbjxj5x6" ;
  let dataToSend = JSON.stringify({"recordid":data.id,"field_6481_raw":data.field_6481_raw,"typeOfCustomerSurvey":"NEW"})
  //or theoretically to have all data from form 
  //let dataToSend = Object.assign(data,{"typeOfCustomerSurvey":"NEW"}); 
  var rData = $.ajax({
    url: commandURL,
    type: 'POST',
    contentType: 'application/json',
    data: dataToSend,
    async: false
  }).responseText;
  console.log(rData);
});


