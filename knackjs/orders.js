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
      if($(this).find('div[id="dodp"]').length){
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
         var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/DETAIL_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
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
           var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/VINENQ_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
            //AJAX Get for the URL - response is now just the date, so we will only print it to html page
            $.ajax({url:url, success: function(data){
                $(this).find('div[id="dod9v8"]').text(data);
            }, async:true, context:this, cache: false, timeout: 15000});
          }
     };

     if($(this).find('div[id="doAFRL"]').length){
       if ($(this).find('div[id="doAFRL"]').text()!==''){
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
         var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/AFRL_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
		  //AJAX Get for the URL - response is now just the date, so we will only print it to html page
          $.ajax({url:url, success: function(data){
              $(this).find('div[id="doAFRL"]').text(data);
          }, async:true, context:this, cache: false, timeout: 15000});
       }
     };
     if($(this).find('div[id="doINV"]').length){
       if ($(this).find('div[id="doINV"]').text()!==''){
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
         var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/INVOICE_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
		  //AJAX Get for the URL - response is now just the date, so we will only print it to html page
          $.ajax({url:url, success: function(data){
              $(this).find('div[id="doINV"]').text(data);
          }, async:true, context:this, cache: false, timeout: 15000});
       }
     };
     if($(this).find('div[id="doGEFCO"]').length){
       if ($(this).find('div[id="doGEFCO"]').text()!==''){
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
         var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/GEFCO_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
		  //AJAX Get for the URL - response is now just the date, so we will only print it to html page
          $.ajax({url:url, success: function(data){
              $(this).find('div[id="doGEFCO"]').text(data);
          }, async:true, context:this, cache: false, timeout: 15000});
       }
     };
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
    var userName = params.get('user');
    var hash = params.get('hash');
    var timeStamp = params.get('timeStamp');
    //timeStamp = timeStamp.match(/(\d+){1}\D.*/);
    //console.log('ttt'+timeStamp)
    //timeStamp = timeStamp[1] || false;
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
    //type userName from url, my secret password and click login
    //if auth successfully then it shows the app, otherwise login screen
    $('[id="email"]').val(userName);
    //alert('Pass'+hashCode(userName).toString());
    $('[id="password"]').val('Pass' + hashCode(userName).toString());
    $('input[type="submit"]').click();
};

//on the login page
$(document).on("knack-view-render.view_2146", function (event, view) {
    // Initialise Sentry reporting
    $.getScript("https://browser.sentry-cdn.com/5.15.5/bundle.min.js")
        .done(function (script, textStatus) {
            console.log("Sentry was loaded.");
            try {
                Sentry.init({ dsn: 'https://6ab7dea15b284e85b6921a92a6e817ae@o308309.ingest.sentry.io/5249006' });
            } catch (error) {
                console.error("Unable to initialise sentry", error);
            }
            submitUserLoginForm();
        })
        .fail(function (jqxhr, settings, exception) {
            console.error("Unable to load sentry", exception);
            submitUserLoginForm();
        });
});

var loginSceneNames = ["scene_917","scene_989","scene_883","scene_1074"]; ///add view numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    console.log(selector_scene)
    // Initialise Sentry reporting
    $.getScript("https://browser.sentry-cdn.com/5.15.5/bundle.min.js")
        .done(function (script, textStatus) {
            console.log("Sentry was loaded.");
            try {
                Sentry.init({ dsn: 'https://6ab7dea15b284e85b6921a92a6e817ae@o308309.ingest.sentry.io/5249006' });
            } catch (error) {
                console.error("Unable to initialise sentry", error);
            }
            submitUserLoginForm();
        })
        .fail(function (jqxhr, settings, exception) {
            console.error("Unable to load sentry", exception);
            submitUserLoginForm();
        });
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
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 12000);
  
  alert("Please wait while we fetch the Order, Customer & P/X Details from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Invoice Retrieval ****************//

$(document).on('knack-record-update.view_2855', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 12000);
  
  alert("Please wait while we fetch the Invoice from Autoline. Click 'OK' & this page will refresh in a few moments...");

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
			 "scene_1066", "scene_978", "scene_979"];
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

