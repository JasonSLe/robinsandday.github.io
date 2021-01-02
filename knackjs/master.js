// Declare Global Variables for use in all functions //
var TrackerID = "";

//we need the app to be on secure connection, so if we find we are on http:// we redirect to secure https:// on the same page ...
$(document).on('knack-view-render.any', function (event, view, data) {
  if (location.href.includes('http://')){
    window.setTimeout(function() {
      window.location.href = location.href.replace('http://','https://');
    }, 500);
  }
});

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_257').keyup(function() {
      this.value = this.value.toUpperCase();
      $(this).css("background-color", "#FFE74C");  			// yellow
      $(this).css("font-weight", "bold", "important");		// bolder
      $(this).css("text-align", "center", "important");		// centre
      $(this).css("fontSize", "24px", "important");         // bigger
  });
});

// Auto Capitalise Registration Input on Used Car Check In //

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_4941').keyup(function() {
      this.value = this.value.toUpperCase();
      $(this).css("background-color", "#FFE74C");  			// yellow
      $(this).css("font-weight", "bold", "important");		// bolder
      $(this).css("text-align", "center", "important");		// centre
      $(this).css("fontSize", "24px", "important");         // bigger
  });
});

// Auto Capitalise PRIVATE PLATE Registration Input on Used Car Check In //

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_5554').keyup(function() {
      this.value = this.value.toUpperCase();
      $(this).css("background-color", "#FFE74C");  			// yellow
      $(this).css("font-weight", "bold", "important");		// bolder
      $(this).css("text-align", "center", "important");		// centre
      $(this).css("fontSize", "24px", "important");         // bigger
  });
});

// --- Hide Robins & Day Logo on Customer Order Tracker View ---
$(document).on('knack-view-render.view_1522', function(event, view) {
 var myElement = document.querySelector("#knack-logo");
 myElement.style.display = "none";
});

//* Change the below icons to your personalized icon links. */
$("head").append("<link rel='apple-touch-icon-precomposed' sizes='57x57' href='https://i.postimg.cc/gkBsWtfK/Robins-Day-by-PSA-Retail-Favicon-57x57.png' />");
$("head").append("<link rel='apple-touch-icon-precomposed' sizes='72x72' href='https://i.postimg.cc/Qd9bxkDZ/Robins-Day-by-PSA-Retail-Favicon-72x72.png' />");
$("head").append("<link rel='apple-touch-icon-precomposed' sizes='114x114' href='https://i.postimg.cc/x1wPkJjJ/Robins-Day-by-PSA-Retail-Favicon-114x114.png' />");
$("head").append("<link rel='apple-touch-icon-precomposed' sizes='144x144' href='https://i.postimg.cc/3w2F28WL/Robins-Day-by-PSA-Retail-Favicon-144x144.png' />");


/* Change Keyword Search Placeholder Text for used stock management */
$(document).on('knack-scene-render.scene_370', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Type Dealer Name,Reg etc.")
});


// ********* Mike's grand iFrame experiment *********************************************************************************

// *** First grab the UID we need ***
$(document).on('knack-view-render.view_1526', function(event, view, data) {
  
  //console.log("view_1526 rendered");
  
  // Grab the Tracker UID value we need 
  $("#view_1526 div.field_3409").each(function() { 
        TrackerID = $(this).find("span:last").text();
    	//console.log(TrackerID);
  })

  var iFrameString = "<!DOCTYPE html>" + "\n" + "<html>" + "\n" + "<body>" + "\n" + "<p>" + "\n";
  iFrameString = iFrameString + "<iframe src='https://salesjourney.knack.com/vehicle-tracking#track-and-trace/";
  iFrameString = iFrameString + "delivery-tracker-vehicle-details/" + TrackerID + "/delivery-tracker/" + TrackerID + "/'";
  iFrameString = iFrameString + " height='800' width='100%' scrolling='auto' allowfullscreen='' frameborder='0'>" + "\n";
  iFrameString = iFrameString + "</iframe>" + "\n";
  iFrameString = iFrameString + "</p>" + "\n" + "</body>" + "\n" + "</html>";
  
  //console.log(iFrameString);
  
  $("#view_1526 div.field_4267 .kn-detail-body").html(iFrameString);
  
});

// ************************************************************************************************************************************************
// Apify dates of data checking download Added by HH on 01052019***********************************************************************************
// ************************************************************************************************************************************************

// Listen for the list page view
$(document).on('knack-records-render.view_1492', function(event, view, records) {
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
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
         var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/VINENQ_'+$(this).find('td').eq(0).text().match(new RegExp(/Dialog Order: \d*/))[0].replace('Dialog Order: ','')+'?disableRedirect=true';
		  //AJAX Get for the URL - response is now just the date, so we will only print it to html page
          $.ajax({url:url, success: function(data){
              $(this).find('div[id="dod9v8"]').text(data);
          }, async:true, context:this, cache: false, timeout: 15000});
     };
      if($(this).find('div[id="dodg"]').length){
          //This is fixed URL of Apify storage, where the Actors are pushing dates when records are checked, we only add Order number parsed from App webpage for given row
        	var tmpV = $(this).find('td').eq(2).html();
        	tmpV = tmpV.substr(tmpV.indexOf('VIN:</b>'),100).replace('VIN:</b>','');
        	tmpV = tmpV.substr(0,tmpV.indexOf('<')).trim();
          	var url = 'https://api.apify.com/v2/key-value-stores/MGAH5Tr9TFctDnMTD/records/GEFCO_'+tmpV+'?disableRedirect=true';
		  //AJAX Get for the URL - response is now just the date, so we will only print it to html page
          $.ajax({url:url, success: function(data){
              $(this).find('div[id="dodg"]').text(data);
          }, async:true, context:this, cache: false, timeout: 15000});
      };
	});
  
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

// ************************************************************************************************************************************************
// ************Hyneks Code to Embed new app and autologin for Ordrs App aded 08/05/19**************************************************************
// ************************************************************************************************************************************************

// Listen for page view load
$(document).on('knack-view-render.any', function(event, view, data) {
    var appContainer = document.querySelector('.kn-content');
    if (appContainer) {
        if (view.key !=='view_2163') {
            appContainer.classList.remove('view_2163');
            return;
        }
        appContainer.classList.add('view_2163');
    }
});

$(document).on('knack-view-render.view_2163', function(event, view, data) {
    //getting the username = email from the field
    var userName = Knack.getUserAttributes().email;
    var timeStamp = Math.floor((new Date()).getTime() / 30000);
    var hash = 'H' + hashCode('U' + userName + timeStamp)
    $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?user=' + encodeURIComponent(userName) + '&hash=' + encodeURIComponent(hash) + '&timeStamp=' + encodeURIComponent(timeStamp) + '" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3921', function(event, view, data) {
  //getting the username = email from the field
  var userName = Knack.getUserAttributes().email;
  var timeStamp = Math.floor((new Date()).getTime() / 30000);
  var hash = 'H' + hashCode('U' + userName + timeStamp)
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?user=' + encodeURIComponent(userName) + '&hash=' + encodeURIComponent(hash) + '&timeStamp=' + encodeURIComponent(timeStamp) + '#new-digital-deal-file" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3923', function(event, view, data) {
  //getting the username = email from the field
  var userName = Knack.getUserAttributes().email;
  var timeStamp = Math.floor((new Date()).getTime() / 30000);
  var hash = 'H' + hashCode('U' + userName + timeStamp)
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?user=' + encodeURIComponent(userName) + '&hash=' + encodeURIComponent(hash) + '&timeStamp=' + encodeURIComponent(timeStamp) + '#new-deal-file-admin" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3925', function(event, view, data) {
  //getting the username = email from the field
  var userName = Knack.getUserAttributes().email;
  var timeStamp = Math.floor((new Date()).getTime() / 30000);
  var hash = 'H' + hashCode('U' + userName + timeStamp)
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?user=' + encodeURIComponent(userName) + '&hash=' + encodeURIComponent(hash) + '&timeStamp=' + encodeURIComponent(timeStamp) + '#new-vehicle-sales-admin" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});


// ************************************************************************************************************************************************
// ************Pete's Code to add menu toggle option on all pages aded 27/06/19**************************************************************
// ************************************************************************************************************************************************

var headerElement, toggleButton, firstLoad = true;
var toggleHeaderVisibility = function() {
    if (!headerElement) {
        return;
    }
    $(headerElement).slideToggle(350, function() {
        if (headerElement.style.display == 'none') {
            document.body.classList.add('rad-header-closed');
            toggleButton.innerHTML = "Show Header";
            return;
        }
        document.body.classList.remove('rad-header-closed');
        toggleButton.innerHTML = "Hide Header";
    });
}

$(document).on('knack-scene-render.any', function(event, scene) {
    console.log(event, scene);
    var userBar = document.querySelector('.kn-info-bar .kn-current_user');
    toggleButton = document.createElement('span');
    toggleButton.classList.add('rad-toggle-header');
    var toggleButtonText = document.createTextNode("Hide Header");
    toggleButton.appendChild(toggleButtonText);
    var logOutElement = (userBar) ? userBar.querySelector('.kn-log-out') : false;
    if (userBar && logOutElement) {
        userBar.insertBefore(toggleButton, logOutElement);
        userBar.insertBefore(document.createTextNode(" - "), logOutElement);
    }

    // Animate the button on first load
    if (firstLoad) {
        toggleButton.classList.add('highlight-button-animation');
        firstLoad = false;
    }

    // Find the header element once only
    headerElement = document.getElementById('kn-app-header');

    // Setup the onclick event for our toggle button to slideToggle the header open and closed, and add a class to the body tag so we can adjust the iframe height
    toggleButton.addEventListener('click', toggleHeaderVisibility);

    // Always hide the header when rendering scene 860 - New Vehicle Order Tracking
    if ((scene.key == 'scene_860' || scene.key == 'scene_1269' || scene.key == 'scene_1271' || scene.key == 'scene_1273') && headerElement.style.display !== 'none') {
        if (window.matchMedia('(min-width: 768px)').matches !== false) {
            toggleHeaderVisibility();
        }
    }
  
 //**************************************************************************************************************
//****** Hynek's Code to check version on user Browser with what is stored in Apify. If version is different, 
//Browser will refresh and add new version to Cookies. Added 01/12/2020 ******************************************

  	//version check on Apify
  	var versionTimeCheck = readCookie('RDDigitalVersionTime');
  	var versionC = readCookie('RDDigitalVersion');
  	console.log('versionC',versionC);
    if (!versionC){
      	console.log('set cookie');
      	createCookie('RDDigitalVersion',appVersionID,365);
    }
    
   	if (!versionTimeCheck || (Date.now()-versionTimeCheck)>600000){ 
      createCookie('RDDigitalVersionTime',Date.now(),365);
      console.log('check version');
      var appVersionID = getVersionFromApify();
      if (versionC!==appVersionID && appVersionID!==''){
          console.log('not same');
          createCookie('RDDigitalVersion',appVersionID,365);
          window.location.reload(false);
      }
    }
  
  //version check every day
  var versionRefreshTime = readCookie('RDDigitalVersionRefreshTime');
  if (!versionRefreshTime){
    createCookie('RDDigitalVersionRefreshTime',Date.now(),1);
  } else {
    var todayS = new Date(Date.now());
    todayS = todayS.toDateString();
    var versionRefreshTimeS = new Date(parseInt(versionRefreshTime));
    versionRefreshTimeS = versionRefreshTimeS.toDateString();
    if (todayS!==versionRefreshTimeS){
      console.log('first day');
      createCookie('RDDigitalVersionRefreshTime',Date.now(),1);
      window.location.reload(false);
    }
  }
  
   //***************************************************************************************************************
//****** Hynek's Code to check Browser Is not IE. If it is, it will redirct user to different page. Added 01/12/2020 
// *****************************************************************************************************************

    
  //control of Internet Explorer and redirect
  var ua = window.navigator.userAgent;
  var isIE = /MSIE|Trident/.test(ua);

  if ( isIE ) {
	window.setTimeout(function() {
        window.location.href = 'https://www.robinsandday.co.uk/digital#browser-incompatible-user-page/';
    }, 500);
  }
  	
});


  function getVersionFromApify(){
    
    var token = $.ajax({
      url: 'https://api.apify.com/v2/key-value-stores/60ues2gA9nwF71pzK/records/KNACKVERSION?disableRedirect=true',
      type: 'GET',
      async: false
    }).responseText;

    if (!token) return '';

    token = token.replace('"', '').replace('"', '');

    return token;
  }






//**************************************************************************************************************
//****** Hynek's Code to Secure Customer Portal - Only Connected Customers can view their own Deal File *********
//**************************************************************************************************************

//this code is for checking the right user in the Customer portal, if logged in user is not the same as car connected user it redirects
checkUser = function(data) {
  //alert(JSON.stringify(Knack.getUserAttributes()));
  //alert(JSON.stringify(data));
  //alert(Knack.getUserAttributes().email);
  //alert(data.field_5539_raw.email);
  if (Knack.getUserAttributes().email!==data.field_5539_raw.email){
    alert('Sorry, you are not authorised to view this page. Please follow the link from your Customer Portal to view details & status of your Vehicle');
    location.href = 'https://www.robinsandday.co.uk/digital#customer-portal/';
  }	
};

//this code calls the function for checking the user rights, it needs to be called in view which has the connected customer
//Used Vehicle Deal fIle Page
$(document).on('knack-view-render.view_2809', function(event, view, data) {
	checkUser(data);
});

//Used Vehicle Order Form Page
$(document).on('knack-view-render.view_2870', function(event, view, data) {
	checkUser(data);
});

//Used Vehicle Order Form Terms & Conditions Page
$(document).on('knack-view-render.view_2871', function(event, view, data) {
	checkUser(data);
});

//Used Vehicle Invoice Page
$(document).on('knack-view-render.view_2872', function(event, view, data) {
	checkUser(data);
});

//Used Vehicle Invoice Terms & Conditions Page
$(document).on('knack-view-render.view_2873', function(event, view, data) {
	checkUser(data);
});

//Handover Checklist Page
$(document).on('knack-view-render.view_2874', function(event, view, data) {
	checkUser(data);
});

//Rate Our Service Page
$(document).on('knack-view-render.view_2875', function(event, view, data) {
	checkUser(data);
});

//FCA Demands & Needs Page
$(document).on('knack-view-render.view_2876', function(event, view, data) {
	checkUser(data);
});

//Receipt of Deposit Page
$(document).on('knack-view-render.view_2877', function(event, view, data) {
	checkUser(data);
});

//Customer Handover Appointment Page
$(document).on('knack-view-render.view_2902', function(event, view, data) {
	checkUser(data);
});

//Handover Documents Page
$(document).on('knack-view-render.view_2911', function(event, view, data) {
	checkUser(data);
});

//Service Schedule Page
$(document).on('knack-view-render.view_2916', function(event, view, data) {
	checkUser(data);
});

//Customer Satisfaction Survey Page
$(document).on('knack-view-render.view_2938', function(event, view, data) {
	checkUser(data);
});

//Warranty Confirmation Page
$(document).on('knack-view-render.view_2947', function(event, view, data) {
	checkUser(data);
});

//Service Plan Quote Page
$(document).on('knack-view-render.view_2951', function(event, view, data) {
	checkUser(data);
});




//********************************* Used Vehicle Check In Work ********************************

//******* Live Character Count on Used Vehicle Check In Attention Grabber *******
$(document).on("knack-view-render.view_2303", function(event, view, data) {
$( document ).ready(function() {
$(".kn-form.kn-view.view_2303 form #field_5342")
.after( "<p class='typed-chars'>0 out of 30 Characters</p>" );

$(".kn-form.kn-view.view_2303 form #field_5342").on('input',function(e){
var $input = $(this);
$input.siblings('.typed-chars').text($input.val().length + " out of 30 Characters");
});
});
});

// Disable SIV Field on Disposal Route Page is NOT Blank
$(document).on('knack-view-render.view_2303', function(event, view) {

 if ($('#view_2303 #field_5071').val() != "") {

      $('#view_2303 #field_5071').attr('disabled', 'disabled'); // disable input field

    }; // end if

});

// Disable VAT Price Field on Disposal Route Page is NOT Blank
$(document).on('knack-view-render.view_2303', function(event, view) {

 if ($('#view_2303 #field_5048').val() != "") {

      $('#view_2303 #field_5048').attr('disabled', 'disabled'); // disable input field

    }; // end if

});


//******************************** Used Vehicle Quick Edit Advert Work *****************************//

//******* Live Character Count for Attention Grabber *******
$(document).on("knack-view-render.view_3280", function(event, view, data) {
$( document ).ready(function() {
$(".kn-form.kn-view.view_3280 form #field_4882")
.after( "<p class='typed-chars'>Maximum of 30 Characters</p>" );

$(".kn-form.kn-view.view_3280 form #field_4882").on('input',function(e){
var $input = $(this);
$input.siblings('.typed-chars').text($input.val().length + " out of 30 Characters");
});
});
});


//***************************************** USED VEHICLE DEAL FILE *******************************************//

//******************* USED DEAL FILES TABLE *****************//

/* Change Keyword Search Placeholder Text for used stock management */
$(document).on('knack-scene-render.scene_960', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Dealer, Reg, Stock No. etc.")
});

// Disable Stock Number & VSB Location Fields on ORDER Retrieval if NOT Blank
//$(document).on('knack-view-render.view_2520', function(event, view) {

 //if ($('#view_2520 #field_5388').val() != "") {

   //   $('#view_2520 #field_5388').attr('disabled', 'disabled'); // disable Stock Number input field

   // }; // end if

//});

$(document).on('knack-view-render.view_2520', function(event, view) {

 if ($('#view_2520 #field_5389').val() != "") {

      $('#view_2520 #field_5389').attr('disabled', 'disabled'); // disable VSB Location input field

    }; // end if

});

// Disable Stock Number & VSB Location Fields on INVOICE Retrieval if NOT Blank
//$(document).on('knack-view-render.view_2548', function(event, view) {

 //if ($('#view_2548 #field_5388').val() != "") {

   //   $('#view_2548 #field_5388').attr('disabled', 'disabled'); // disable Stock Number input field

    //}; // end if

//});

$(document).on('knack-view-render.view_2548', function(event, view) {

 if ($('#view_2548 #field_5389').val() != "") {

      $('#view_2548 #field_5389').attr('disabled', 'disabled'); // disable VSB Location input field

    }; // end if

});


//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Order Retrieval ****************//

$(document).on('knack-record-update.view_2520', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 12000);
  
  alert("Please wait while we fetch the Order, Customer & P/X Details from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});


//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Invoice Retrieval ****************//

$(document).on('knack-record-update.view_2548', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 12000);
  
  alert("Please wait while we fetch the Vehicle Invoice from Autoline. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});


//****************** Refresh HPI Check when Re-done to Clear Finance ****************//

$(document).on('knack-record-update.view_3089', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 8000);

  Knack.showSpinner();
  
});

//****************** Refresh Handover Checklist Page if Selected to update ****************//

$(document).on('knack-record-update.view_3342', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});

//****************** Refresh Customer Satisfaction Survey Page if Selected to update ****************//

$(document).on('knack-record-update.view_3343', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 500);

  Knack.showSpinner();
  
});




//HANDOVER APPOINTMENT PAGE
//Restrict Available Times for Handover Appointment to 8am - 7pm

var view_names = ["view_2925", "view_2901"]; ///add view numbers as necessary

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

//CUSTOMER HANDOVER DIARY Add Filter Button

$(document).on('knack-view-render.view_2884', function(event, view, record) {
  $('.kn-add-filter').text('Click to Filter by Sales Advisor, Dealer, New or Used etc.')
});  

$(document).on('knack-scene-render.any', function(event, scene) {	
// GOOGLE ANALYTICS

// set variables to be used as the page URL and Title - 
// you can customize these using jquery if you want to pull something different than I did.
var pagetitle = $('.kn-crumbtrail a:first-child').text()+' - '+$('.kn-scene h1').text();
var pageurl = window.location;

// this part needs to all be on one line - be sure to replace your ga ID/code
$("#knack-body").append("<script>\n\n(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\nm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n\nga('create', 'UA-179021155-1', 'auto');\nga('send', 'pageview', {\n 'page':'"+pageurl+"',\n'title':'"+pagetitle+"'\n});\n\n</script>");
  	
});

// ----------  hide blank Enquiry Max table on New Vehicle P/X appraisal    ----------

//$(document).on('knack-view-render.view_3254', function (event, view, data) {
//  $('.kn-td-nodata').parents('.kn-view').hide();
//});

//.............................................................................................



// ----------  refresh Prep Centre driver pickup table every 60 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_1152', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3435").is(":visible")==true){ Knack.views["view_3435"].model.fetch();recursivecall();} }, 100000);
}

// ----------  refresh Prep Centre driver drop off Table every 60 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_1152', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3437").is(":visible")==true){ Knack.views["view_3437"].model.fetch();recursivecall();} }, 100000);
}

// ----------  refresh Prep Centre Table every 60 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_1150', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3432").is(":visible")==true){ Knack.views["view_3432"].model.fetch();recursivecall();} }, 100000);
}

// ----------  refresh Prep Centre Dealer View Table every 60 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_1145', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3418").is(":visible")==true){ Knack.views["view_3418"].model.fetch();recursivecall();} }, 100000);
}

// ----------  refresh Enquiry Max Table every 5 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_146', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3254").is(":visible")==true){ Knack.views["view_3254"].model.fetch();recursivecall();} }, 5000);
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setDate(date.getDate() + days); 
        date.setHours(0);
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

var scanDocsViewNames = ["view_3919"]; ///add view numbers as necessary

scanDocsViewNames.forEach(scanDocsLinkFunction);

function scanDocsLinkFunction(selector_view){
  $(document).on("knack-view-render." + selector_view, function(event, view, data) {
    console.log(getRecordIdFromHref(location.href))
    if ($('div[class="content"] a[href*="RECORDID"]').length>0){
      console.log($('div[class="content"] a[href*="RECORDID"]').attr('href'));
      let replacedRecordId = $('div[class="content"] a[href*="RECORDID"]').attr('href').replace(new RegExp('RECORDID','g'),getRecordIdFromHref(location.href))
      console.log(replacedRecordId);
      $('div[class="content"] a[href*="RECORDID"]').attr('href',replacedRecordId);
    }
  });
}  

//Camera app code

// Camera app share functions
//************************************* SAVE THE PICTURE YOU'VE JUST TAKEN WITH THE CAMERA TO KNACK*****************************************

  //this function just parses recordId from URL //maybe needs to be altered acording the use
  function getRecordIdFromHref(ur) {
    var ur = ur.substr(0, ur.length - 1);
    return ur.substr(ur.lastIndexOf('/') + 1)
  }

  async function uploadImage(app_id, imgUrl) {
    var url = 'https://api.knack.com/v1/applications/'+app_id+'/assets/image/upload';
    var headers = {
      'X-Knack-Application-ID': app_id,
      'X-Knack-REST-API-Key': 'knack',
    };
    var form = new FormData();

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
            return {'status': 'ok', 'id': rDataP.id}
          }
          alert('uploadFail_1:'+rData);
          alert(imgUrl);
          return {'status': 'fail'};
        } catch (e) {
          alert('uploadFail_2:'+e.toString());
          return {'status': 'fail'};
        }
      });
  }

  function getTokenFromApify() {
    var token = $.ajax({
      url: 'https://api.apify.com/v2/key-value-stores/2qbFRKmJ2qME8tYAD/records/photoapi1_token_open?disableRedirect=true',
      type: 'GET',
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
      type: 'PUT',
      headers: headersForSecureView,
      contentType: 'application/json',
      data: dataF,
      async: false
    }).responseText;

    try {
      var rData2P = JSON.parse(rData2);
      if (rData2P.record) {
        return {'status': 'ok'}
      }
    } catch (e) {
      alert(rData2)
      return {'status': 'fail'};
    }
  }

function prepareCameraView(backUrl,app_id,imageFieldOnKnack,imageViewOnKnack){
// ***************************************************************************************************************************
// ****************************************CAMERA APP WITH PICTURE OVERLAY******************************************************
// *****************************************************************************************************************************
  var go = () => {
    effect.show();
    if(interval===0) { // if interval is equal to 0     
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

  //Hide the spirit line in the begining
  $('#cameraLine').hide();

  var imageCapture;

  var img = document.getElementById('cameraFrontpic');
  var video = document.querySelector('video');
  var takePhotoButton = document.querySelector('button#takePhoto');
  var confirmButton = document.querySelector('#cameraConfirm');
  var retakeButton = document.querySelector('#cameraRetake');
  var exitButton = document.querySelector('#cameraExit');
  var line = document.getElementById('cameraLine');
  var acceptButton = document.querySelector('#cameraAccept');

  goToFullscreen();

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
     .catch(error => console.log('Argh!', error.name || error));
  
  //**************************** APPLY PICTURE OVERLAY WHICH IS DRAWN ONTO THE CANVAS. WITH THE OVERLAY EFFECT*****************************************

  const canvas = document.getElementById('cameraOverlayCanvas');  
  const ctx = canvas.getContext('2d');
  var interval = 0;
  const effect = $('#cameraOverlayCanvas');

  const image = new Image('naturalWidth', 'naturalHeight');
  image.onload = drawImageActualSize;
  //image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebg.png?token=AK2DHPRJXE5E2DFU5EXYCXS7Y6ROW';
  image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebgv3.png';

   //this image gets the captured photo and when it is loaded it resizes iteslf and saves the image to shown image
  var imageBeforeResize = document.createElement('img');

  //************************************* LAYOUT *****************************************
  //HIDE RETAKE AND CONFIRM BUTTONS
  $("#cameraRetake").hide();
  $("#cameraConfirm").hide();
  //HIDE THE COMPARISION PICTURE AND TEXT
  $("#cameraCompare").hide();
  $("#cameraText").hide();

//**************************** DETECT SCREEN ORIENTATION WHEN THE APP IS LOADED AND DETECT WHEN USER CHANGES SCREEN ORIENTATION*****************************************
  var isLandscape = false;
  //DETECT WHICH ORIENTATION THE USEER IS IN
  if(window.innerHeight > window.innerWidth){ // if portrait
       $("#cameraLine").hide();
       $("#takePhoto").hide();
       $("#cameraRotate").show();
       $(stop);
       isLandscape = false;
  }

  if(window.innerWidth > window.innerHeight){ // if landscape
      $("#takePhoto").show();
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
          $("#takePhoto").hide();

          acceptButton.onclick = function(){
            DeviceOrientationEvent.requestPermission()
            .then(response => {
              if (response == 'granted') {
                window.addEventListener("deviceorientation", handleOrientation, true);
                $('#cameraModal').hide();
                //$("#takePhoto").removeAttr('disabled');
                if (isLandscape) $("#takePhoto").show();
              }
            })
            .catch(console.error)
          }
        }
      }, 1000);
  }

  //PROPERTY AND EVENTS FOR ONLINE/OFFLINE DETECTION
  var isOnline = true;
  window.addEventListener('online', () => isOnline = true);
  window.addEventListener('offline', () => isOnline = false);


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

imageBeforeResize.onload = () => {
   const elem = document.createElement('canvas');
   elem.width = 768;
   elem.height = 576;
   const ctx = elem.getContext('2d');
  //check if the resolution of the image is 4:3

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

  if(beta <=1 && beta >= -1 && gamma <= -80)
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

  //IF THE USER CHANGES SCREEN ORIENTATION

$(window).on("orientationchange",function(){
  if(window.orientation == 0 || window.orientation == 180){ // Portrait
    $(stop);
    $("#cameraLine").hide();
    $("#takePhoto").hide();
    $("#cameraRotate").show();
    isLandscape = false;
  }
  else if(window.orientation == 90 || window.orientation == 270){ // Landscape
    $("#takePhoto").show();
    $("#cameraRotate").hide();
    $(go);
    isLandscape = true;
  }
});


var sndCameraTakePhoto = document.createElement('audio');  
sndCameraTakePhoto.type = "audio/mpeg";     
sndCameraTakePhoto.src = "https://github.com/robinsandday/Camera_App-for-Image-Overlay/raw/main/camera-shutter-click.mp3";                 
sndCameraTakePhoto.load(); 
//************************************* TAKE A PICTURE AND CROP*****************************************

takePhotoButton.onclick = function () {
    Knack.showSpinner();
    sndCameraTakePhoto.play();

    //HIDE VIDEO & OVERLAY ELEMENT
    $('video').hide();
    $(stop);

    //DISPLAY COMPARISION CONTENT
    $("#cameraCompare").show();
    $("#cameraText").show();

   //SHOW RETAKLE AND CONFIORM BUTTON
    $("#cameraRetake").show();
    $("#cameraConfirm").show();

    //HIDE EXIT BUTTON
    $("#cameraExit").hide();

    //HIDE LEVEL LINE
    $("#cameraLine").hide();
    lineVisible = false;

    // DISABLE TAKEPHOTO BUTTON
    $("#takePhoto").hide();

    if (OperatingSystem.Android()) {
      imageCapture.takePhoto().then(function(blob) {
        //console.log('Photo taken:', blob);
        //so I use the blob to the shown image but also for the imageBeforeResize, which when is loaded updates the shown image with smaller image
        //theoretically the blob can be given only to the imageBeforeResize, and it should then update them shown image but this approach shows the image sooner ...
        img.classList.remove('hidden');
        img.src = URL.createObjectURL(blob);
        imageBeforeResize.src = img.src; 
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
          img.src = URL.createObjectURL(blob);
          imageBeforeResize.src = img.src; //c.toDataURL('image/webp');
	      }, 'image/jpeg', 1);
    } else {
     	alert('unsuported system'); 
	    alert(navigator.userAgent);
    }
  }

  //CONFIRM BUTTON, WILL SAVE THE PHOTO TO KNACK//
  confirmButton.onclick = function() {
    if (!isOnline){
      alert('You are offline, please go online before confirming the photo.');
      return;
    }

    Knack.showSpinner();

    // DISABLE SAVE BUTTON
    $("#cameraConfirm").attr("disabled", true);
    $("#cameraConfirm").hide();
    $("#cameraRetake").hide();

    //STOP TRACK WHEN USER SAVES IMAGE
    video.srcObject.getVideoTracks().forEach(track => track.stop());

    var imgUrl = $('#cameraFrontpic').attr('src');

    setTimeout(function(){
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
        } 

        //EXIT FULL SCREEN MODE
        exitFullscreen();

        Knack.hideSpinner();

        setTimeout(function() {
          window.location = backUrl;
        }, 100);

      });
    }, 100);

  };


//*************************************RETAKE BUTTON, THIS WILL DELETE THE PHOTO TAKEN*****************************************
  retakeButton.onclick = function() {
    if (OperatingSystem.iOS()) {
      // on iOS devices it should hide the img tag when user agent clicks retake.
      img.style.visibility = 'hidden';
    }
    //CLEAR TAKEN PHOTO
    img.src = '';

    // SHOW LEVEL LINE
    lineVisible = true;

    //SHOW CAMERA AND CANVAS ELEMENT WHEN THE USER CLICKS RETAKE
    $('video').show();
    $("#cameraCompare").hide();
    $("#cameraText").hide();
    $(go);

    // HIDE RETAKE AND CONFIRM BUTTON
    $("#cameraRetake").hide();
    $("#cameraConfirm").hide();

    // SHOW EXIT BUTTON
    $("#cameraExit").show();

    // ACTIVATE TAKEPHOTO BUTTON
	  $("#takePhoto").show();
  }

 //*************************************EXIT BUTTON TAKE USER BACK TO HOME PAGE*****************************************
  exitButton.onclick = function() {

    //REDIRECT USER BACK TO HOME PAGE
    setTimeout(function() {
      window.location = backUrl;
    }, 100);

    //EXIT FULL SCREEN MODE
    exitFullscreen();

    //STOP TRACK WHEN USER EXIT THE APP
    video.srcObject.getVideoTracks().forEach(track => track.stop());
  }  
}

//end of shared camera app code


$(document).on('knack-view-render.view_3900', function(event, view, data) {
  $('[class="kn-view kn-back-link"]').hide();
	prepareCameraView(location.origin+"/digital#used-vehicle-check-in/used-vehicle-check-in-2/"+getRecordIdFromHref(location.href)+"/used-vehicle-check-in-3/"+getRecordIdFromHref(location.href)+"/","591eae59e0d2123f23235769",'field_4944','scene_1262/views/view_3904');
});

$(document).on('knack-view-render.view_3910', function(event, view, data) {
  $('[class="kn-view kn-back-link"]').hide();
	prepareCameraView(location.origin+"/digital#new-appraisal/retail-appraisal-aesthetic-condition/"+getRecordIdFromHref(location.href)+"/","591eae59e0d2123f23235769",'field_532','scene_1262/views/view_3911');
});


// refresh background replaced image at used vehicle check in - disposal selection page

//****************** Show Alert & Refresh Digital Deal File Page 12 seconds after Invoice Retrieval ****************//

$(document).on('knack-record-update.view_3926', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 12000);
  
  alert("Please wait while we process the image. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});

