// Declare Global Variables for use in all functions //
var TrackerID = "";
/*
//Service worker
if ('serviceWorker' in navigator) {
  console.log("Will the service worker register?");
  navigator.serviceWorker.register('https://robinsandday.github.io/knackjs/service-worker.js')
    .then(function(reg){
      console.log("Yes, it did.");
   }).catch(function(err) {
      console.log("No it didn't. This happened:", err)
  });
}
*/
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

// Auto Capitalise Registration Input on Physical Stock Audit //

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_7474').keyup(function() {
      this.value = this.value.toUpperCase();
      $(this).css("background-color", "#FFE74C");  			// yellow
      $(this).css("font-weight", "bold", "important");		// bolder
      $(this).css("text-align", "center", "important");		// centre
      $(this).css("fontSize", "24px", "important");         // bigger
  });
});

// Auto Capitalise Chassis Input on Physical Stock Audit //

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_7475').keyup(function() {
      this.value = this.value.toUpperCase();
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

/* Prevent Modal Page from Closing when Clicking Off */
  $(document).on('knack-scene-render.scene_1119', function(event, scene) {
    $('.kn-modal-bg').off('click');
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
  iFrameString = iFrameString + "<iframe src='https://salesjourney.rd.knack.com/vehicle-tracking#track-and-trace/";
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

//MASTER/SLAVE CONNECT - the scene have one view of Account details, where is only email field without header, the source of IFRAME is the public address of slave page

$(document).on('knack-view-render.view_2163', function(event, view, data) {
    var token = Knack.getUserAttributes().values["field_6440"];
    $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3921', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-digital-deal-file" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3923', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-deal-file-admin" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_3925', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-vehicle-sales-admin" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});
$(document).on('knack-view-render.view_3978', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-vehicle-reporting" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4272', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#after-sales-vehicle-lookup?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4364', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#powersupply-orders?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4294', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-deal-files-automotive-compliance" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4295', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-deal-file-manager-view" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5325', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#fleet-vehicle-administration" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4550', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#focus-aftersales-csi?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4887', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#aftersales-service-reporting?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4929', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#parts-sales-reporting?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4946', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#maxoptra?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_4982', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#general-dealer-groups" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5250', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#parts-cash-and-credit-account-administration?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5375', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#focus-net-promoter-csi-data" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5388', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#perpetual-stock-take-reports?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5398', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/digital-orders?token='+encodeURIComponent(token) + '#new-vehicle-credit-note-register" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

$(document).on('knack-view-render.view_5415', function(event, view, data) {
  var token = Knack.getUserAttributes().values["field_6440"];
  $('div[class="field_3"]').html('<iframe src="https://www.robinsandday.co.uk/aftersales#tarot2?token='+encodeURIComponent(token) + '" allow="camera" frameborder="0" width="100%" id="knack-iframe"></iframe>');
});

function openTab(url) {
  // Create link in memory
  var a = window.document.createElement("a");
  a.target = '_blank';
  a.href = url;

  // Dispatch fake click
  var e = window.document.createEvent("MouseEvents");
  e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
};


// ************************************************************************************************************************************************
// ************Pete's Code to add menu toggle option on all pages aded 27/06/19**************************************************************
// ************************************************************************************************************************************************

var headerElement, toggleButton, firstLoad = true;
var toggleHeaderVisibility = function(toWhatState = null) {
    if (!headerElement) {
        return;
    }
    console.log('toWhatState',toWhatState)
    if (toWhatState === 'hidden'){
        $(headerElement).slideUp(350, function(){
          document.body.classList.add('rad-header-closed');
          toggleButton.innerHTML = "<b>Show Header</b>";
        })
    } else {
      $(headerElement).slideToggle(350, function() {
          if (headerElement.style.display === 'none') {
              document.body.classList.add('rad-header-closed');
              toggleButton.innerHTML = "<b>Show Header</b>";
              console.log('hide header')
              console.log(toggleButton.innerHTML)
              return;
          }
          console.log('show header')
          document.body.classList.remove('rad-header-closed');
          toggleButton.innerHTML = "<b>Hide Header</b>";
      });
    }
}

$(document).on('knack-scene-render.any', function(event, scene) {
  console.log('knack-scene-render.any')
    var userBar = document.querySelector('.kn-info-bar .kn-current_user');
    toggleButton = document.createElement('span');
    toggleButton.classList.add('rad-toggle-header');
    toggleButton.setAttribute("id", "toggleButton");
    toggleButton.innerHTML = "<b>Hide Header</b>"
    document.body.classList.remove('rad-header-closed');
    //var toggleButtonText = document.createTextNode("Hide Header");
    //toggleButton.appendChild(toggleButtonText);
    var logOutElement = (userBar) ? userBar.querySelector('.kn-log-out') : false;
    let toogleButtonExists = document.getElementById('toggleButton');
    if (userBar && logOutElement && toogleButtonExists===null) {
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

    //MASTER/SLAVE CONNECT - add scene of master page
    // Always hide/collapse the header when rendering scene in IFRAME, add other scenes if necessary
    if (scene.key === 'scene_860' || scene.key === 'scene_1269' || scene.key === 'scene_1271' || scene.key === 'scene_1273' || scene.key === 'scene_1279' || scene.key === 'scene_1339' || scene.key == 'scene_1362' || scene.key == 'scene_1412' || scene.key == 'scene_1497' || scene.key == 'scene_1505'|| scene.key === 'scene_1510' || scene.key === 'scene_1523' || scene.key === 'scene_1616'  || scene.key === 'scene_1631' || scene.key === 'scene_1636' || scene.key === 'scene_1644' || scene.key === 'scene_1651' || scene.key === 'scene_1656') {
      document.body.style.overflow = "hidden"
        if (window.matchMedia('(min-width: 768px)').matches !== false) {
            toggleHeaderVisibility('hidden');
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
    try {
      var token = $.ajax({
        url: 'https://api.apify.com/v2/key-value-stores/60ues2gA9nwF71pzK/records/KNACKVERSION?disableRedirect=true',
        type: 'GET',
        async: false,
        timeout: 1000
      }).responseText;
  
      if (!token) return '';
  
      token = token.replace('"', '').replace('"', '');
  
      return token;
    } catch (ex){
      console.log(ex);
      return '';
    }
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

/* Change Keyword Search Placeholder Text for used deal files */
$(document).on('knack-scene-render.scene_960', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Dealer Address, Reg, Stock No.")
});

/* Change Keyword Search Placeholder Text for used deal files admin view */
$(document).on('knack-scene-render.scene_1063', function(event, scene) {
  $("input[name='keyword']").attr("placeholder", "Dealer Address, Reg, Stock No.")
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

//****************** Show Alert & Refresh Digital Deal File Page 10 seconds after Re-Check for for P/X Valuation ****************//

$(document).on('knack-record-update.view_2807', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 10000);
  
  alert("Please wait while we search for a Completed Digital Part Exchange Appraisal. Click 'OK' & this page will refresh in a few moments...");

  Knack.showSpinner();
  
});


//************************** CONSOLIDATED HANDOVER PACK ***************************//

//****************** Refresh Handover Pack after Vehicle Invoice ****************//

$(document).on('knack-record-update.view_4657', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);

  Knack.showSpinner();
  
});

//****************** Refresh Handover Pack after Handover Checklist ****************//

$(document).on('knack-record-update.view_4650', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);

  Knack.showSpinner();
  
});

//****************** Refresh Handover Pack after Service Schedule ****************//

$(document).on('knack-record-update.view_4651', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);

  Knack.showSpinner();
  
});

//****************** Refresh Handover Pack after Satisfaction Survey Updated ****************//

$(document).on('knack-record-update.view_4652', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);

  Knack.showSpinner();
  
});

//****************** Refresh Handover Pack after Satisfaction Survey Created ****************//

$(document).on('knack-record-create.view_4652', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);

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
  $('.kn-add-filter').text('Click to Filter by Sales Advisor, Dealer, New or Used, Confirmed by Admin etc.')
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

// USED DEAL FILE SIGN YOUR DOCUMENTS

// Code to wait following Form Submission while PIN is Checked in Integromat

$(document).on('knack-form-submit.view_4099', function(event, view, data) { 


	setTimeout(function(){ 

    	Knack.showSpinner();

    }, 0); 

  

	commandURL = "https://hook.integromat.com/jidc5kuxt4ddjmhondkoyhjpgj6fm7o6?recordid=" + data.id ;


 	$.get(commandURL, function(data, status){


      Knack.hideSpinner();

      $(".kn-message.success").html("<b>" + data + "</b>");


    });

});

//Hide Crumbtrail & Header
$(document).on('knack-scene-render.scene_1298', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1300', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1304', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1307', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1310', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1311', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1312', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1313', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1314', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

$(document).on('knack-scene-render.scene_1314', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
});

// ----------  hide blank Enquiry Max table on New Vehicle P/X appraisal    ----------

//$(document).on('knack-view-render.view_3254', function (event, view, data) {
//  $('.kn-td-nodata').parents('.kn-view').hide();
//});

//.............................................................................................

// ----------  Service Plan table expand or collapse groupings ----------

// Call the function when your table renders – do this for each table you’re applying this to
$(document).on('knack-view-render.view_4220', function(event, view, data) {
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

// USED DEAL FILE ADMIN AND MANAGER VIEW - HIDE AND EXPAND TABLES
// CODE FOR HIDE AND EXPANDING TABLE VIEWS - DO NOT ADD VIEWS HERE - ADD THE VIEW NUMBERS BELOW

var originalHeights = [];

Knack.fn = Knack.fn || {};
Knack.fn.hideExpand = (viewKey) => {
  Knack.$(`#${viewKey} .expandBtn`).show();
  Knack.$(`#${viewKey} .kn-title`).prepend(
    '<i class="fa fa-minus toggleBtn hidden" style="color:#FFA100; margin: 5px"></i>'
  );
  Knack.$(`#${viewKey} section`).show();
  Knack.$(`#${viewKey} .kn-table-wrapper`).show();
  Knack.$(`#${viewKey} .kn-records-nav`).show();
  Knack.$(`#${viewKey} .kn-description`).show();
  Knack.$(`#${viewKey} .toggleBtn`).on("click", function () {
    let classes = Knack.$(this).attr("class").split(/\s+/);
    if (classes.indexOf("hidden") === 2) {
      //show it
      const $section = Knack.$(this).parent().parent().siblings("section");
      const $table = Knack.$(this)
        .parent()
        .parent()
        .siblings(".kn-table-wrapper");
      if ($section.length) {
        $section.show();
      } else if ($table.length) {
        const $navFilters = Knack.$(this)
          .parent()
          .parent()
          .siblings(".kn-records-nav");
        $table.show();
        $navFilters.show();
        //console.log('prevH',originalHeights.find(function(el){return el.viewKey === viewKey}).height);
        $table.height(originalHeights.find(function(el){return el.viewKey === viewKey}).height);
      }
      Knack.$(this).removeClass("hidden");
      Knack.$(this).removeClass("fa-plus");
      Knack.$(this).addClass("fa-minus");
      Knack.$(`#${viewKey} .kn-description`).show();
      
      
      
      
    } else {
      //hide it
      const $section = Knack.$(this).parent().parent().siblings("section");
      const $table = Knack.$(this)
        .parent()
        .parent()
        .siblings(".kn-table-wrapper");
      let isSaved = originalHeights.find(function(el){return el.viewKey === viewKey});
      if (!isSaved){
        originalHeights.push({viewKey:viewKey,height:$table.height()})
      }
      //console.log('height', originalHeights);
      if ($section.length) {
        $section.hide();
      } else if ($table.length) {
        const $navFilters = Knack.$(this)
          .parent()
          .parent()
          .siblings(".kn-records-nav");
        $table.hide();
        $navFilters.hide();
      }
      Knack.$(this).addClass("hidden");
      Knack.$(this).removeClass("fa-minus");
      Knack.$(this).addClass("fa-plus");
      Knack.$(`#${viewKey} .kn-description`).hide();
    }
  });
};

// ADD THE VIEW NUMBERS THAT YOU WOULD LIKE THE HIDE AND EXPAND FEATURE TO WORK ON
// ADMIN VIEWS
$(document).on('knack-view-render.view_4517', function(event, view, data) {
  console.log('view4517');
  Knack.fn.hideExpand("view_4517");
});

$(document).on('knack-view-render.view_3310', function(event, view, data) {
  console.log('view3310');
  Knack.fn.hideExpand("view_3310");
});

$(document).on('knack-view-render.view_4889', function(event, view, data) {
  console.log('view4889');
  Knack.fn.hideExpand("view_4889");
});

$(document).on('knack-view-render.view_3136', function(event, view, data) {
  console.log('view3136');
  Knack.fn.hideExpand("view_3136");
});

$(document).on('knack-view-render.view_3135', function(event, view, data) {
  console.log('view3135');
  Knack.fn.hideExpand("view_3135");
});

$(document).on('knack-view-render.view_3124', function(event, view, data) {
  console.log('view3124');
  Knack.fn.hideExpand("view_3124");
});

$(document).on('knack-view-render.view_4602', function(event, view, data) {
  console.log('view4602');
  Knack.fn.hideExpand("view_4602");
});

$(document).on('knack-view-render.view_4516', function(event, view, data) {
  console.log('view4516');
  Knack.fn.hideExpand("view_4516");
});

$(document).on('knack-view-render.view_4271', function(event, view, data) {
  console.log('view4271');
  Knack.fn.hideExpand("view_4271");
});

$(document).on('knack-view-render.view_5232', function(event, view, data) {
  console.log('view5232');
  Knack.fn.hideExpand("view_5232");
});


// MANAGER VIEWS

$(document).on('knack-view-render.view_4310', function(event, view, data) {
  console.log('view4310');
  Knack.fn.hideExpand("view_4310");
});

$(document).on('knack-view-render.view_4547', function(event, view, data) {
  console.log('view4547');
  Knack.fn.hideExpand("view_4547");
});

$(document).on('knack-view-render.view_4556', function(event, view, data) {
  console.log('view4556');
  Knack.fn.hideExpand("view_4556");
});

$(document).on('knack-view-render.view_4557', function(event, view, data) {
  console.log('view4557');
  Knack.fn.hideExpand("view_4557");
});

$(document).on('knack-view-render.view_4526', function(event, view, data) {
  console.log('view4526');
  Knack.fn.hideExpand("view_4526");
});

$(document).on('knack-view-render.view_5219', function(event, view, data) {
  console.log('view5219');
  Knack.fn.hideExpand("view_5219");
});

//END OF HIDE AND EXPAND CODE




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
  $('div[id="kn-input-'+message.pdfAssetField+'"] div[class="kn-file-upload"]').html('File uploaded successfully.');
}

//END OF SCAN APP CODE
//END

//THIS IS ARRAY OF scenes with document scan
var scanDocsSceneNames = ["scene_1133", "scene_1147", "scene_1135", "scene_1032", "scene_1164", "scene_1035", "scene_1035", "scene_1047", "scene_1031", "scene_1078",
			 "scene_1134", "scene_1051", "scene_1130", "scene_1131", "scene_1050", "scene_993", "scene_996", "scene_1253", "scene_1138"];
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

//Camera app code

// Camera app share functions
//************************************* SAVE THE PICTURE YOU'VE JUST TAKEN WITH THE CAMERA TO KNACK*****************************************

  //this function just parses recordId from URL //maybe needs to be altered acording the use
  function getRecordIdFromHref(ur) {
    var ur = ur.substr(0, ur.length - 1);
    return ur.substr(ur.lastIndexOf('/') + 1)
  }

  async function uploadImage(app_id, imgUrl) {
    var url = 'https://api.rd.knack.com/v1/applications/'+app_id+'/assets/image/upload';
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
          alert(rData);
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
      url: 'https://api.rd.knack.com/v1/pages/' + knackSceneView + '/records/' + updatingRecordId,
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

function IsInHomeScreen(){
  if (OperatingSystem.iOS()){
    if (window.navigator.standalone){
      return true;
    } else {
      return false;
    }
  } 
  if (OperatingSystem.Android()) {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return true;
    } else {
      return false;
    }
  }
  return null;
}

$(document).on('knack-scene-render.scene_435', function(event, scene) {
  let iH = IsInHomeScreen();
  if (iH || iH===null){
    $('div[class="kn-view"]:contains("MUST add Robins")').hide()
    $('div[id="view_5185"]').hide()
  }
 });

function prepareCameraView(backUrl,app_id,imageFieldOnKnack,imageViewOnKnack){
// ***************************************************************************************************************************
// ****************************************CAMERA APP WITH PICTURE OVERLAY******************************************************
// *****************************************************************************************************************************
  var go = () => {
    effect.show();
    /*
      if(interval===0) { // if interval is equal to 0     
        interval = setInterval(function () {
            effect.fadeIn(1500, function () {
              effect.fadeOut(1500);
            });
          }, 3000);
      }
      
    }*/
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
  var calibrateButton = document.querySelector('#cameraCalibrate');
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
  
  //**************************** APPLY PICTURE OVERLAY WHICH IS DRAWN ONTO THE CANVAS. WITH THE OVERLAY EFFECT*****************************************

  const canvas = document.getElementById('cameraOverlayCanvas');  
  const ctx = canvas.getContext('2d');
  var interval = 0;
  const effect = $('#cameraOverlayCanvas');

  const image = new Image('naturalWidth', 'naturalHeight');
  image.onload = drawImageActualSize;
  //image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebg.png?token=AK2DHPRJXE5E2DFU5EXYCXS7Y6ROW';
  
  //if (Knack.getUserAttributes().email.includes('hynek') || Knack.getUserAttributes().email.includes('david.male') || Knack.getUserAttributes().email.includes('conor.power')){
    image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-background-v2.png';
  //} else {
  //  image.src = 'https://raw.githubusercontent.com/robinsandday/Camera_App-for-Image-Overlay/main/car-removebgv3.png';
  //}

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
  var portraitStill = true;
  //DETECT WHICH ORIENTATION THE USEER IS IN
  if(window.innerHeight > window.innerWidth){ // if portrait
       $("#cameraLine").hide();
       $("#cameraCalibrate").hide();
       $("#takePhoto").hide();
       $("#cameraRotate").show();
       $(stop);
       isLandscape = false;
  }

  if(window.innerWidth > window.innerHeight){ // if landscape
    $("#cameraCalibrate").show();
      $("#takePhoto").show();
      $("#cameraRotate").hide();
      $(go);
      isLandscape = true;
      portraitStill = false;
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

imageBeforeResize.onload = () => {
   const elem = document.createElement('canvas');
   elem.width = 768;
   elem.height = 576;
   const ctx = elem.getContext('2d');
  //check if the resolution of the image is 4:3

  if ((imageBeforeResize.width/imageBeforeResize.height)===(4/3)){
    var percentOfPicture = 0.6;
    var left = imageBeforeResize.width * ((1-percentOfPicture)/2);
    var top = imageBeforeResize.height * ((1-percentOfPicture)/2);
    if (OperatingSystem.iOS()){
      if (!window.navigator.standalone){
        //top = 0;
        //alert('Safari with top')
      } else {
        //alert('Safari without top');
      }
    }
    ctx.drawImage(imageBeforeResize, left, top , imageBeforeResize.width * percentOfPicture,imageBeforeResize.height * percentOfPicture, 0, 0, 768, 576);
  } else {
    //alert('another resolution');
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

var isInCalibrationMode = false;
var lastBeta = null;
var calibrationValue = getCookie('rdSpiritCalibration');
//**************************** SPIRIT LEVEL *****************************************
 var lineVisible = true;
 var canTakePhoto = false;
 function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;
  console.log(beta);
  let origBeta = beta;

  //if (Knack.getUserAttributes().email.includes('hynek') || Knack.getUserAttributes().email.includes('david.male') || Knack.getUserAttributes().email.includes('conor.power')){
    if (gamma>0){
      if (beta>0){
        beta = 180 - beta;
      } else {
        beta = Math.abs(beta) - 180;
      }
    }
  //}

  lastBeta = beta;
  let betaComp = beta - (calibrationValue?calibrationValue:0);

  if (Knack.getUserAttributes().email.includes('hynek') || Knack.getUserAttributes().email.includes('david.male') || Knack.getUserAttributes().email.includes('conor.power')){
    if (isInCalibrationMode){
      //$('#infoText').html('b:'+beta+'<br />g:'+gamma+'<br />ob:'+origBeta);
    }
  }

  if (isLandscape && beta && lineVisible) {
    $("#cameraLine").show();
  } else {
    $("#cameraLine").hide();
  }

  if(betaComp <=2 && betaComp >= -2 && gamma <= -80)
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
  line.style.transform = 'rotate(' + (-betaComp).toString() + 'deg)';
  permissionForOrientation = 'none'
}

  //IF THE USER CHANGES SCREEN ORIENTATION

$(window).on("orientationchange",function(){
  if(window.orientation == 0 || window.orientation == 180){ // Portrait
    $(stop);
    $("#cameraCalibrate").hide();
    $("#cameraLine").hide();
    $("#takePhoto").hide();
    $("#cameraRotate").show();
    isLandscape = false;
  }
  else if(window.orientation == 90 || window.orientation == 270){ // Landscape
    $("#cameraCalibrate").show();
    $("#cameraRotate").hide();
    if (!isInCalibrationMode){
      $("#takePhoto").show();
    }
    $(go);
    isLandscape = true;
    portraitStill = false;
  }
});

//This function checks if user is still in Portrait mode
setTimeout(function() {
  if (portraitStill){
    if (OperatingSystem.iOS()) {
      alert('Your Device is still in Portrait mode. Please check that “Screen Orientation Lock” is NOT enabled on your device, and then rotate it to enter Landscape mode and take a photo…')
    } else {
      alert('Your Device is still in Portrait mode. Please check that the device is NOT Locked in Portrait mode, and then rotate it to enter Landscape mode and take a photo…')
    }
  }
}, 10000);

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
    $("#cameraCalibrate").hide();

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
      alert('Your web browser is not supported, detection shows not Android, not Safari on Apple. Please check, if you do not have "Desktop site" on in Chrome settings. Please report your user agent: '+navigator.userAgent); 
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
    $("#cameraCalibrate").show();

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

    if (isInCalibrationMode){
      isInCalibrationMode = false;
      $("#takePhoto").show();
      $(go);
      alert('Calibration canceled.')
      return;
    }

    //REDIRECT USER BACK TO HOME PAGE
    setTimeout(function() {
      window.location = backUrl;
    }, 100);

    //EXIT FULL SCREEN MODE
    exitFullscreen();

    //STOP TRACK WHEN USER EXIT THE APP
    video.srcObject.getVideoTracks().forEach(track => track.stop());
  }  

  //*************************************CALIBRATE BUTTON ASKS AND THEN OPEN CALIBRATION*****************************************
  calibrateButton.onclick = function() {
    if (isInCalibrationMode){
      setCookie('rdSpiritCalibration', lastBeta,365);
      calibrationValue = lastBeta;
      isInCalibrationMode = false;
      $("#takePhoto").show();
      $(go);
      alert('Calibration finished.');
    } else {
      if (confirm('Please confirm that you wish to enter calibration mode to set the spirit level.')) {
        console.log('Let go for calibration.');
        isInCalibrationMode = true;
        if (Knack.getUserAttributes().email.includes('hynek') || Knack.getUserAttributes().email.includes('david.male') || Knack.getUserAttributes().email.includes('conor.power')){
          var infoText = document.createElement('span');
          infoText.setAttribute("id", "infoText");
          document.getElementById('cameraGui_controls').appendChild(infoText);
        }
        $("#takePhoto").hide();
        $(stop);
        alert('Place device upright in landscape mode on level surface and click calibration button.');
      } else {
        $(go);
        goToFullscreen();
        console.log('Calibration canceled.');
      }
    }
  }  
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//end of shared camera app code


$(document).on('knack-view-render.view_3900', function(event, view, data) {
    //***** check if user is on mobile and is not in homescreen */
    let iH = IsInHomeScreen();
    if (!iH && iH!==null){
      alert('We found a problem with the breathing ghost image not aligning to the car when accessing our app as a web page and have now disabled this option. Please goto robinsandday.co.uk/digital and save to your home screen (pin to home screen). Opening our app from there resolves the alignment problem.');
      window.setTimeout(function() {
        window.location.href = 'https://www.robinsandday.co.uk/digital#home/';
      }, 500);
      return;
    }
  $('[class="kn-view kn-back-link"]').hide();
	prepareCameraView(location.origin+"/digital#used-vehicle-check-in/used-vehicle-check-in-2/"+getRecordIdFromHref(location.href)+"/used-vehicle-check-in-3/"+getRecordIdFromHref(location.href)+"/","591eae59e0d2123f23235769",'field_4944','scene_1543/views/view_5014'/*scene_1262/views/view_3904*/);
});

$(document).on('knack-view-render.view_3910', function(event, view, data) {
  //***** check if user is on mobile and is not in homescreen */
  let iH = IsInHomeScreen();
  if (!iH && iH!==null){
    alert('We found a problem with the breathing ghost image not aligning to the car when accessing our app as a web page and have now disabled this option. Please goto robinsandday.co.uk/digital and save to your home screen (pin to home screen). Opening our app from there resolves the alignment problem.');
    window.setTimeout(function() {
      window.location.href = 'https://www.robinsandday.co.uk/digital#home/';
    }, 500);
    return;
  }
  $('[class="kn-view kn-back-link"]').hide();
	prepareCameraView(location.origin+"/digital#new-appraisal/retail-appraisal-aesthetic-condition/"+getRecordIdFromHref(location.href)+"/","591eae59e0d2123f23235769",'field_532','scene_1544/views/view_5016'/*scene_1262/views/view_3911*/);
});


// refresh background replaced image at used vehicle check in - disposal selection page

$(document).on('knack-scene-render.scene_909', function(event, scene) {
 recursivecall();
 $('div[class="field_5038"]').hide()
 setTimeout(function(){
  refreshScene909();
}, 100);
});

function refreshScene909(){
  let refreshData = [
    {
        name : 'HPI Status',
        mainField : 'field_5038', 
        views:['2298','2299','3586','2301']   
    }
  ]
  sceneRefresh(refreshData);
}


function recursivecall(){
 setTimeout(function () { if($("#view_3927").is(":visible")==true){ Knack.views["view_3927"].model.fetch();recursivecall();} }, 100000);
}

// ----------  refresh Parts Hub table table every 10 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_1274', function(event, scene) {
 recursivecall();
});

function recursivecall(){
 setTimeout(function () { if($("#view_3934").is(":visible")==true){ Knack.views["view_3934"].model.fetch();recursivecall();} }, 10000);
}

// LZW-compress a string
function lzw_encode(s) {
  var dict = {};
  var data = (s + "").split("");
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i=1; i<data.length; i++) {
      currChar=data[i];
      if (dict[phrase + currChar] != null) {
          phrase += currChar;
      }
      else {
          out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
          dict[phrase + currChar] = code;
          code++;
          phrase=currChar;
      }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i=0; i<out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
  }
  return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
  var dict = {};
  var data = (s + "").split("");
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i=1; i<data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
          phrase = data[i];
      }
      else {
         phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
  }
  return out.join("");
}

/***Profit and Loss, refresh after warranty cost has been entered by user***/
$(document).on('knack-record-update.view_4086', function(event, view, data) {
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);
  Knack.showSpinner();
});

/***Profit and Loss, refresh after warranty cost has been entered by user (DIGITAL P&L)***/
$(document).on('knack-record-update.view_4562', function(event, view, data) {
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);
  Knack.showSpinner();
});

/***Profit and Loss, refresh after warranty cost has been entered by user***/
$(document).on('knack-record-update.view_4589', function(event, view, data) {
  setTimeout(function () { location.hash = location.hash + "#"; }, 1000);
  Knack.showSpinner();
});

//
//
//       USED VEHICLE STOCK
//
//
//

// New Deal File – **Trigger For Integromat Upon New Vehicle Handover Form Submission {(Deal File) Digital Deal File} Slave App - Replaces https://zapier.com/app/editor/73986254?redirect=true
// "Telephone No 4 ":data.field_6105_raw, THE NAME WAS DECLARED WITH A SPACE IN THE ZAPIER!

// Used Vehicle Stock TRIGGER INTEGROMAT UPON –***Trigger Integromat to refresh Stock record (Form and trigger in Autoline Vehicle Details) Replaces https://zapier.com/app/editor/110795723?redirect=true
$(document).on('knack-form-submit.view_3993', function(event, view, data) {
    
    try{
        

        // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
        function handlAll(valueA, indexA, fieldName){ 
            return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
        }
        
	let commandURL = "https://hook.integromat.com/7hyc8ignx5bg0p598dcd2sp4e91vi0do" ;
        var createData = {"Knack Stock UID":data.id,"Reg":data.field_2694_raw,"Dealer":handlAll(data.field_2721_raw, "0","identifier"),"Source Of Payload" : "knack direct","ConnectedDealer":data.field_6476_raw};
        
        function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
        //Iterate through all the values contained in createData and deletesany undefined object properties
        //Will create the final form of the data sent using POST
        let dataToSend = JSON.stringify(deleteEmpty(createData));

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Used Vehicle Stock TRIGGER INTEGROMAT UPON –***Trigger Integromat to refresh Stock record (Form and trigger in Autoline Vehicle Details)",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});

// Used Vehicle Stock TRIGGER INTEGROMAT UPON –*Trigger Integromat when Dealer Imagery has been Updated for Used Vehicle Adverts Replaces https://zapier.com/app/editor/92841452?redirect=true
$(document).on('knack-form-submit.view_3553', function(event, view, data) { 
    
    try{
      let commandURL = "https://hook.integromat.com/8r1ayrzigjxtimjwafw9lhqae72xy6o7" ;
      let dataToSend = JSON.stringify({"Record ID":data.id,"Source Of Payload" : "knack direct"}) ; 
      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Used Vehicle Stock TRIGGER INTEGROMAT UPON –*Trigger Integromat when Dealer Imagery has been Updated for Used Vehicle Adverts",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});

// Used Vehicle Stock TRIGGER INTEGROMAT UPON –*Trigger Integromat when Marketing Imagery has been Updated for Used Vehicle Adverts Replaces https://zapier.com/app/editor/92838132/nodes/92838135
$(document).on('knack-form-submit.view_3538', function(event, view, data) { 
    
    try{
    
      let commandURL = "https://hook.integromat.com/up2bwidxowgfm5mlb2x52bg34j9czbou" ;
      let dataToSend = JSON.stringify({"Record ID":data.id,"Source Of Payload" : "knack direct"}) ;
      var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
      }).responseText;
  }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Used Vehicle Stock TRIGGER INTEGROMAT UPON –*Trigger Integromat when Marketing Imagery has been Updated for Used Vehicle Adverts Replaces",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});



// Used Vehicle Stock TRIGGER INTEGROMAT UPON –**Trigger Integromat to refresh Stock record (Form and trigger in Vehicle Advert Details) Replaces https://zapier.com/app/editor/110796625?redirect=true
$(document).on('knack-form-submit.view_3994', function(event, view, data) { 
    
    try{
        
        // Searching an undefined collection/aray will result in an exception and the javascript will stop execution!
        function handlAll(valueA, indexA, fieldName){ 
            return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
        }
        
      let commandURL = "https://hook.integromat.com/7hyc8ignx5bg0p598dcd2sp4e91vi0do" ;
      var createData = {"Knack Stock UID":data.id,"Reg":data.field_2694_raw,"Source Of Payload" : "knack direct", "Dealer":handlAll(data.field_2721_raw, "0", "identifier")};
      
        function deleteEmpty(objectA){
        
                for (const [key, value] of Object.entries(objectA)) {
                    if (value === undefined || value === null || value === ""){
                        delete objectA[key];
                    }
                }
                return objectA;
            }
        //Iterate through all the values contained in createData and deletesany undefined object properties
        //Will create the final form of the data sent using POST
        let dataToSend = JSON.stringify(deleteEmpty(createData));

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;

  }catch(exception){
        console.log("error");
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Used Vehicle Stock TRIGGER INTEGROMAT UPON –**Trigger Integromat to refresh Stock record (Form and trigger in Vehicle Advert Details)",
        "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
        var rData = $.ajax({
           url: commandURL,
           type: 'POST',
           contentType: 'application/json',
           data: dataToSend,
           async: false
        }).responseText;
    }
  
});


//**Used Deal File - Credit Note Raised and Check VSB for Credit Note Number
$(document).on('knack-form-submit.view_5239', function(event, view, data) { 
    
    try{
        
        let commandURL = "https://hook.integromat.com/70c9ajyp2qsdg46ezfc4z5q5e2pbnqxu";
        let dataToSend = JSON.stringify({"Record ID":data.id});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Used Deal File - Credit Note Raised and Check VSB for Credit Note Number");
    }
});


//
//       USED VEHICLE CHECK IN
//
//
//
//

// Used Vehicle Check in TRIGGER INTEGROMAT UPON – *Trigger For Integromat When Dealer Pushes Vehicle For Prep Centre {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/88520373?redirect=true 
$(document).on('knack-form-submit.view_3424', function(event, view, data) {
  if(data.field_6041_raw !== null && data.field_6041_raw !== undefined){
    var num = data.field_6041_raw.time;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    var time =  rhours.toString().padStart(2, '0') + ":" + rminutes.toString().padStart(2, '0');
  }else{
      var time = "";
  }
  var createData = {"Knack ID":data.id,"Dare Vehicle Marked Ready For Collection": handlAll(data.field_6041_raw, "date_formatted") + " " + time,
                                           "Dealer ID":handlIndex(data.field_4943_raw, "0", "identifier"),"Source Of Payload" : "knack direct"};
  callPostHttpRequest("https://hook.integromat.com/baxf6i7ag8g6xaxn7nvqcz3f1neajylu",deleteEmpty(createData), "Used Vehicle Check in TRIGGER INTEGROMAT UPON – *Trigger For Integromat When Dealer Pushes Vehicle For Prep Centre {(Deal File) Used Vehicle Deal File}");
});

// Used Vehicle Check in TRIGGER INTEGROMAT UPON – **Trigger Integromat to Background Replace Used Vehicle at point of Vehicle Disposal Selection {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/108678042/nodes/108678042/fields
$(document).on('knack-form-submit.view_3926', function(event, view, data) { 
  var createData = {"Knack ID of Used Deal File":data.id, "Image URL":handlAll(data.field_4944_raw, "url"), "Image thumbnail URL": handlAll(data.field_4944_raw, "thumb_url"),"Dealer": handlIndex(data.field_4943_raw, "0", "identifier"),"Source Of Payload" : "knack direct"} ;
  callPostHttpRequest("https://hook.integromat.com/8mnivmrh1gs4co3kd3k36eg798zt1ko9",deleteEmpty(createData), "Used Vehicle Check in TRIGGER INTEGROMAT UPON – **Trigger Integromat to Background Replace Used Vehicle at point of Vehicle Disposal Selection {(Deal File) Used Vehicle Deal File}"); 
});

// Used Vehicle Check in TRIGGER INTEGROMAT UPON – *Used Vehicle Check In - Retail or Trade Selection - Instant Webhook for Integromat (V2) {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/99112426/nodes/99112426
$(document).on('knack-form-submit.view_2303', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/hrnilld87m88ereruz9m8k9uxywat6eb",{"Knack Record ID":data.id, "Source Of Payload":"knack direct"}, "Used Vehicle Check In - Retail or Trade Selection - Instant Webhook for Integromat (V2) {(Deal File) Used Vehicle Deal File}");   
  if (data.field_5011_raw === "Trade"){
    callPostHttpRequest("https://hook.integromat.com/9mmic64ktusvdxj85i4nyqobfrpef85o",{"RecordID":data.id, "Source Of Payload":"knack direct"}, "Used Vehicle Check In - Retail or Trade Selection - Instant Webhook for Integromat (V2) {(Deal File) Used Vehicle Deal File}");   
  } else if (data.field_5011_raw === "Retail" || data.field_5011_raw === "Vehicle Sold"){
    callPostHttpRequest("https://hook.integromat.com/83njs7wwvslcjlo36abncth5dfmlexpm",{"RecordID":data.id, "Source Of Payload":"knack direct"}, "Used Vehicle Check In - Retail or Trade Selection - Instant Webhook for Integromat (V2) {(Deal File) Used Vehicle Deal File}");   
  }
});

//trigerER INTEGROMAT UPON – *Used Vehicle Check In to Trigger AutoTrader Retail Metrics {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/84075829/nodes/84075829/fields
$(document).on('knack-form-submit.view_2276', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/onkas3qpuuxq16qmnk54zu50uyffqoag",{"RecordID":data.id,"Source Of Payload" : "knack direct"},"Used Vehicle Check in TRIGGER INTEGROMAT UPON – *Used Vehicle Check In to Trigger AutoTrader Retail Metrics {(Deal File) Used Vehicle Deal File}");  
});

//    Capture PDF

/// Used Deal File - Capture PDF - Capture PDFs TRIGGER INTEGROMAT UPON – **Used Deal File PDF - Customer satisfaction survey signed on site V2 {(Deal File) Customer Satisfaction Survey} Replaces https://zapier.com/app/editor/113682381?redirect=true
$(document).on('knack-form-submit.view_2940', function(event, view, data) { 
	if (typeof data.field_5977_raw !== 'undefined' && data.field_5977_raw !== null){
    callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id, "Form":"Customer satisfaction survey", "Source Of Payload": "knack direct"},"Used Deal File - Capture PDF - Capture PDFs TRIGGER INTEGROMAT UPON – **Used Deal File PDF - Customer satisfaction survey signed on site V2 {(Deal File) Customer Satisfaction Survey}");  
  }
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Customer satisfaction survey signed online by Customer {(Deal File) Customer Satisfaction Survey} Replaces https://zapier.com/app/editor/113720424?redirect=true
$(document).on('knack-form-submit.view_4149', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id, "Form":"Customer satisfaction survey", "Source Of Payload": "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Customer satisfaction survey signed online by Customer");  
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Trigger Integromat to create stock record if New Vehicle Purchase Added {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/110797771?redirect=true
$(document).on('knack-form-submit.view_2966', function(event, view, data) { 
  let createData = {"Knack Deal File UID":data.id,"Reg":data.field_4941_raw,"Dealer": handlAll(data.field_4943_raw,"0", "identifier"),"Source Of Payload" : "knack direct"} ;
  callPostHttpRequest("https://hook.integromat.com/7hyc8ignx5bg0p598dcd2sp4e91vi0do",deleteEmpty(createData),"Used Deal File TRIGGER INTEGROMAT UPON – *Trigger Integromat to create stock record if New Vehicle Purchase Added {(Deal File) Used Vehicle Deal File}");    
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Digital P&L when Approved {(Deal File) Profit Sheet} Replaces https://zapier.com/app/editor/111720452/nodes/111720452/fields
$(document).on('knack-form-submit.view_4067', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Digital P&L","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Digital P&L when Approved {(Deal File) Profit Sheet} ");  
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Handover Checklist signed at Dealer OR to be signed remotely {(Deal File) Handover Checklist} Replaces https://zapier.com/app/editor/103143311?redirect=true
$(document).on('knack-form-submit.view_2568', function(event, view, data) { 
	callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Handover checklist","Source Of Payload": "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Handover Checklist signed at Dealer OR to be signed remotely {(Deal File)");  
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Handover Checklist signed online by Customer {(Deal File) Handover Checklist} Replaces https://zapier.com/app/editor/113719265?redirect=true
$(document).on('knack-form-submit.view_4146', function(event, view, data) { 
	callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Handover checklist","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Handover Checklist signed online by Customer {(Deal File) Handover Checklist}");  
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Trigger Integromat to connect Used Deal file to a newly created Autoline VSB stock Item {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/110800495?redirect=true
$(document).on('knack-form-submit.view_3997', function(event, view, data) { 
  let createData = {"Knack Deal File UID":data.id,"Reg":data.field_4941_raw,"Dealer":handlIndex(data.field_4943_raw, "0", "identifier") ,"Source Of Payload": "knack direct"} ;
  callPostHttpRequest("https://hook.integromat.com/7hyc8ignx5bg0p598dcd2sp4e91vi0do",deleteEmpty(createData),"Used Deal File TRIGGER INTEGROMAT UPON – *Trigger Integromat to connect Used Deal file to a newly created Autoline VSB stock Item {(Deal File) Used Vehicle Deal File}");    
 });

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Merge POST Sale Pack and Customer Signature {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/113727087?redirect=true
$(document).on('knack-form-submit.view_4171', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/gx0km24b2cvo6myagf5xlhvxkrurmun4",{"Record ID":data.id,"Form":"Post Sale Pack","Source Of Payload": "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Merge POST Sale Pack and Customer Signature {(Deal File) Used Vehicle Deal File}");  
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Merge PRE Sale Pack and Customer Signature {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/113720873?redirect=true
$(document).on('knack-form-submit.view_4166', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/gx0km24b2cvo6myagf5xlhvxkrurmun4",{"Record ID":data.id,"Form":"Pre Sale Pack","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Merge PRE Sale Pack and Customer Signature {(Deal File) Used Vehicle Deal File}");  
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Order Form signed on site {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/103142236?redirect=true
$(document).on('knack-form-submit.view_2531', function(event, view, data) {
  if((typeof data.field_5441_raw !== "undefined" && data.field_5441_raw !== null) && ( typeof data.field_5957_raw === "undefined" || data.field_5957_raw === null)){
    callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id, "Form":"Order form", "Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Order Form signed on site {(Deal File) Used Vehicle Deal File}");
  }
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Part Ex Purchase Invoice signed at Dealer OR to be signed remotely {(Deal File) Customer Part Exchange Invoice} Replaces https://zapier.com/app/editor/103144500?redirect=true
$(document).on('knack-form-submit.view_3463', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Part exchange purchase invoice","Source Of Payload": "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Part Ex Purchase Invoice signed at Dealer OR to be signed remotely {(Deal File)");
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Part Ex Purchase Invoice signed online by Customer {(Deal File) Customer Part Exchange Invoice} Replaces https://zapier.com/app/editor/113718840?redirect=true
$(document).on('knack-form-submit.view_4136', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Part exchange purchase invoice","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Part Ex Purchase Invoice signed online by Customer {(Deal File)");     
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Service Schedule signed online by Customer {(Deal File) Service Schedule} Replaces https://zapier.com/app/editor/113718447?redirect=true
$(document).on('knack-form-submit.view_4141', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Service schedule","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Service Schedule signed online by Customer {(Deal File) Service Schedule}");   
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – **Used Deal File PDF - Service Schedule signed at Dealer OR to be signed remotely {(Deal File) Service Schedule} Replaces https://zapier.com/app/editor/103143807?redirect=true
$(document).on('knack-form-submit.view_2915', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Service schedule","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – **Used Deal File PDF - Service Schedule signed at Dealer OR to be signed remotely {(Deal File) Service Schedule}");  
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Vehicle Invoice signed at Dealer OR to be signed remotely {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/103142907?redirect=true
$(document).on('knack-form-submit.view_2582', function(event, view, data) { 
  if (typeof data.field_6223_raw === 'undefined' || data.field_6223_raw === null || data.field_6223_raw === ""){
    callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id, "Form":"Vehicle invoice", "Source Of Payload": "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Vehicle Invoice signed at Dealer OR to be signed remotely {(Deal File) Used Vehicle Deal File}");
  }
});

// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Vehicle Invoice signed online by Customer {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/113717705?redirect=true
$(document).on('knack-form-submit.view_4127', function(event, view, data) {
	callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v",{"Record ID":data.id,"Form":"Vehicle invoice","Source Of Payload" : "knack direct"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Vehicle Invoice signed online by Customer {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Handover Appointment Added {(Deal File) Customer Handover Appointment} Replaces https://zapier.com/app/editor/102469925?redirect=true
$(document).on('knack-form-submit.view_2901', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id,"Trigger":"Handover Appointment Added","Source Of Payload": "knack direct"},"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Handover Appointment Added {(Deal File)");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Handover Appointment Updated {(Deal File) Customer Handover Appointment} Replaces https://zapier.com/app/editor/102470844?redirect=true
$(document).on('knack-form-submit.view_2925', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger":"Handover Appointment Updated", "Source Of Payload": "knack direct"},"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Handover Appointment Updated {(Deal File) Customer Handover Appointment}");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Updated {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/102469204?redirect=true
$(document).on('knack-form-submit.view_2825', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger":"Profit & Loss Updated", "Source Of Payload": "knack direct"},"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Updated {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Uploaded {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/102467550?redirect=true
$(document).on('knack-form-submit.view_2824', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger":"Profit & Loss Uploaded", "Source Of Payload": "knack direct"},"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Uploaded {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Invoice Retrieved {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/102574909?redirect=true
$(document).on('knack-form-submit.view_2548', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id,"Trigger":"Vehicle Invoice","Source Of Payload": "knack direct"},"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Invoice Retrieved {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Invoice from Autoline {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/71559469?redirect=true
$(document).on('knack-form-submit.view_2548', function(event, view, data) {
  if(data.field_5842_raw !== undefined &&  data.field_5842_raw !== null){
    var createData = {"KnackID":data.id, "Registration Number":data.field_4941_raw, "Stockbook Number":data.field_5388_raw, "VSB Location":data.field_5389_raw,
              "Dealer":handlAll(data.field_4943_raw, "0", "identifier"), "Date in Stock":handlDate(data.field_5842_raw, "date_formatted"), "Source Of Payload" : "knack direct"};
    callPostHttpRequest("https://hook.integromat.com/2ta4u1ek35jqd5z2xhw4ql19m48edbgf",deleteEmpty(createData) ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Invoice from Autoline {(Deal File) Used Vehicle Deal File}");
    callPostHttpRequest("https://hook.integromat.com/tbljhas7u4i6f2qh5s5xi57bs4a6p85j",{"Record ID":data.id, "Form":"Used Service Quote", "Source Of Payload" : "knack direct"} ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Invoice from Autoline {(Deal File) Used Vehicle Deal File}");
  }else{
    var createData = {"KnackID":data.id, "Registration Number":data.field_4941_raw, "Stockbook Number":data.field_5388_raw, "VSB Location":data.field_5389_raw,
              "Dealer":handlAll(data.field_4943_raw, "0", "identifier"), "Source Of Payload" : "knack direct"};
    callPostHttpRequest("https://hook.integromat.com/2ta4u1ek35jqd5z2xhw4ql19m48edbgf",deleteEmpty(createData) ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Invoice from Autoline {(Deal File) Used Vehicle Deal File}");
    callPostHttpRequest("https://hook.integromat.com/tbljhas7u4i6f2qh5s5xi57bs4a6p85j",{"Record ID":data.id, "Form":"Used Service Quote", "Source Of Payload" : "knack direct"} ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Invoice from Autoline {(Deal File) Used Vehicle Deal File}");
  }
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Checked In {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/102473068?redirect=true
$(document).on('knack-form-submit.view_2303', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id,"Trigger":"Vehicle Check In","Source Of Payload" : "knack direct"} ,"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Checked In {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Delivery and Deal File Contents Status {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/111717789?redirect=true
$(document).on('knack-form-submit.view_4070', function(event, view, data) {
    if(data.field_6461_raw === "Vehicle Delivered and Deal File Contents Complete"){
      callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger":"Vehicle Delivered and Deal File Contents Complete", "Source Of Payload" : "knack direct"} ,"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Delivery and Deal File Contents Status {(Deal File) Used Vehicle Deal File}");
    }else if(data.field_6461_raw === "Vehicle Delivered"){
      callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger": "Vehicle Delivered", "Source Of Payload": "knack direct"} ,"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Delivery and Deal File Contents Status {(Deal File) Used Vehicle Deal File}");
    }else if (data.field_6461_raw === "Deal File Contents Complete"){
      callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1",{"Record ID":data.id, "Trigger": "Deal File Contents Complete", "Source Of Payload": "knack direct"} ,"Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Vehicle Delivery and Deal File Contents Status {(Deal File) Used Vehicle Deal File}");
    }
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Order for Showroom OR Enquiry Max Order {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/95215577?redirect=true
$(document).on('knack-form-submit.view_2520', function(event, view, data) {
  let createData = {"KnackID":data.id,"Stockbook Number":data.field_5388_raw, "VSB Location":data.field_5389_raw, "Registration Number":data.field_4941_raw, "Update Order":data.field_5669_raw, "Dealer":data.field_4943_raw[0].identifier,"Source Of Payload" : "knack direct"}; 
  callPostHttpRequest("https://hook.integromat.com/19yebbskfb7538eng623jbunr1f5gzoi",deleteEmpty(createData) ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to GET Used Vehicle Order for Showroom OR Enquiry Max Order {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to Re-Check for Completed Customer Part Exchange Appraisal {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/73105399?redirect=true
$(document).on('knack-form-submit.view_2807', function(event, view, data) { 
  var createData = {"KnackID":data.id,"Dealer Name":handlIndex(data.field_4943_raw, "0", "identifier"), "Part Ex Reg 1":data.field_5581_raw,"Part Ex Reg 2":data.field_5582_raw,"Part Ex Reg 3":data.field_5583_raw, "Source Of Payload": "knack direct"};
  callPostHttpRequest("https://hook.integromat.com/5q48r2313pbwq6u7onb6fru0r9gh2qm7",deleteEmpty(createData) ,"Used Deal File TRIGGER INTEGROMAT UPON – *Instant Trigger to Re-Check for Completed Customer Part Exchange Appraisal {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Trigger for Integromat to Recheck HPI once vehicle checked in to clear finance {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/75692824?redirect=true
$(document).on('knack-form-submit.view_3089', function(event, view, data) { 
  var createData = {"Knack Vehicle ID":data.id,"Mileage":data.field_4942_raw, "Reg":data.field_4941_raw,"Dealer":handlIndex(data.field_4943_raw, "0", "identifier"),"Source Of Payload" : "knack direct"} ;
  callPostHttpRequest("https://hook.integromat.com/dr13cfc5jaftorg3d2yw7252pglsr7w6",deleteEmpty(createData) ,"Used Deal File TRIGGER INTEGROMAT UPON – *Trigger for Integromat to Recheck HPI once vehicle checked in to clear finance {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Used Deal File - Sign Online Feature Activated {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/112696446?redirect=true
$(document).on('knack-form-submit.view_4194', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/17ik6dj95ukjdf7i7wtbos6dpq4dssut", {"Record ID":data.id, "Source Of Payload" : "knack direct"},"Used Deal File TRIGGER INTEGROMAT UPON – *Used Deal File - Sign Online Feature Activated {(Deal File) Used Vehicle Deal File}");
});

// Used Deal File TRIGGER INTEGROMAT UPON – *Used Deal File - Zip Folder of Customer Docs Email to Customer {(Deal File) Used Vehicle Deal File} Replaces https://zapier.com/app/editor/108173439?redirect=true
$(document).on('knack-form-submit.view_3915', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/3a7d6avwzo86miynac55zdsrrgy7pwjs", {"Record ID":data.id, "Source Of Payload": "knack direct"},"Used Deal File TRIGGER INTEGROMAT UPON – *Used Deal File - Zip Folder of Customer Docs Email to Customer {(Deal File) Used Vehicle Deal File}");
});

// Parts Hub TRIGGER INTEGROMAT UPON – *Trigger Integromat to run Maxoptra Scenario {(GENERAL) Dealer Specific Information} Replaces https://zapier.com/app/editor/109470901/nodes/109470901
$(document).on('knack-form-submit.view_3935', function(event, view, data) { 
  // check if the date fields are blank
  if (typeof data.field_6365_raw.date_formatted === "undefined" || data.field_6365_raw.date_formatted === null){

    alert("Please specify Start date!");
    return;
  } else if (typeof data.field_6365_raw.to === "undefined" || data.field_6365_raw.to === null){

    alert("Please specify End date!");
    return;
  }
  // --Date and time of Picks--
        // converts the minutes for the start time of the Pick
        var numFrom = data.field_6365_raw.time;
        var hoursFrom = (numFrom / 60);
        var rhoursFrom = Math.floor(hoursFrom);
        var minutesFrom = (hoursFrom - rhoursFrom) * 60;
        var rminutesFrom = Math.round(minutesFrom);
        var timeFrom =  rhoursFrom.toString().padStart(2, '0') + ":" + rminutesFrom.toString().padStart(2, '0');
        //retrieves the date for the start pick
        var dateFrom = data.field_6365_raw.date_formatted;
        //converts the minutes for the end time of the Pick
        var numTo = data.field_6365_raw.to.time;
        var hoursTo = (numTo / 60);
        var rhoursTo = Math.floor(hoursTo);
        var minutesTo = (hoursTo - rhoursTo) * 60;
        var rminutesTo = Math.round(minutesTo);
        var timeTo =  rhoursTo.toString().padStart(2, '0') + ":" + rminutesTo.toString().padStart(2, '0');
        //retrieves the date for the end pick
        var dateTo = data.field_6365_raw.to.date_formatted;
        // combine the date and time for start and end pickup
        if(dateFrom === dateTo){
            var dateTime = dateFrom + " " + timeFrom + " to " + timeTo;
        }else{
            var dateTime = dateFrom + " " + timeFrom + " to " + dateTo + " " + timeTo;
        }
        // --Excluded AR code--
        //converts the boolean to yes/no
        var convertedValue = "No";
        if(data.field_6661_raw){
            convertedValue = "Yes";
        }

      var createData = {"Knack Dealer ID":data.id, "Date and time of Picks":dateTime, "Autoline Company Code": data.field_2443_raw,"Excluded AR":convertedValue, "Source Of Payload": "knack direct"};
      
  callPostHttpRequest("https://hook.integromat.com/3w3qq7yggjrgrc5pgof3k4ln3m1r2ph5", deleteEmpty(createData),"Parts Hub TRIGGER INTEGROMAT UPON – *Trigger Integromat to run Maxoptra Scenario {(GENERAL) Dealer Specific Information}");
});

// Part Exhange Appraisal TRIGGER INTEGROMAT UPON – *Trigger to resize P/X RETAIL APPRAISAL and send to Integromat {(P/X) Part Exchange Vehicles} Replaces https://zapier.com/app/editor/69807699?redirect=true
$(document).on('knack-form-submit.view_346', function(event, view, data) { 
  var createData = {"Knack ID":data.id, "Front 3/4 Photo": handlSRC(handlAll(data.field_532_raw, "url")), "Rear 3/4 Photo": handlSRC(handlAll(data.field_5373_raw, "url")), 
          "Side Profile": handlSRC(handlAll(data.field_5372_raw, "url")), "Interior Photo": handlSRC(handlAll(data.field_5374_raw, "url")), "Source Of Payload": "knack direct"};
  callPostHttpRequest("https://hook.integromat.com/lmaksb2o9ziepugv7vxuaem341utdpky", deleteEmpty(createData),"Part Exhange Appraisal TRIGGER INTEGROMAT UPON – *Trigger to resize P/X RETAIL APPRAISAL and send to Integromat {(P/X) Part Exchange Vehicles}");
});

// Part Exhange Appraisal TRIGGER INTEGROMAT UPON – *Trigger to resize P/X TRADE OR OFFSITE APPRAISAL and send to Integromat {(P/X) Part Exchange Vehicles} Replaces https://zapier.com/app/editor/69875590?redirect=true
$(document).on('knack-form-submit.view_348', function(event, view, data) { 
  if(data.field_800_raw[0]["identifier"] !== "Trade Appraisal (Vehicle Not Present)" && data.field_800_raw[0]["identifier"] !== "Retail Appraisal (Vehicle Not Present)") {
    var createData = {"Knack ID":data.id, "Front 3/4 Photo": handlSRC(handlAll(data.field_532_raw, "url")), "Rear 3/4 Photo": handlSRC(handlAll(data.field_5373_raw, "url")),
              "Side Profile": handlSRC(handlAll(data.field_5372_raw, "url")), "Interior Photo": handlSRC(handlAll(data.field_5374_raw, "url")), "Source Of Payload" : "knack direct"};
    callPostHttpRequest("https://hook.integromat.com/24a1c91x31e3eix3hq3wue5kcd4aoshq", deleteEmpty(createData),"Part Exhange Appraisal TRIGGER INTEGROMAT UPON – *Trigger to resize P/X RETAIL APPRAISAL and send to Integromat {(P/X) Part Exchange Vehicles}");	
  }
});

// Used Deal File Automated Comms - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Approved {(Deal File) Profit Sheet} Replaces https://zapier.com/app/editor/111449060?redirect=true
$(document).on('knack-form-submit.view_4067', function(event, view, data) { 
  if(data.field_6449_raw){
    var createData = {"P&L Record ID":data.id,"Deal file ID":data.field_6454_raw, "Source Of Payload" : "knack direct"};
    callPostHttpRequest("https://hook.integromat.com/qb810ofl9jwfvemwhvmvc6zjxqfgob9g", deleteEmpty(createData),"Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Approved {(Deal File) Profit Sheet}");	
    var createData1 = {"Record ID":data.field_6454_raw,"Trigger":"Profit & Loss Approved","Source Of Payload" : "knack direct"};
    callPostHttpRequest("https://hook.integromat.com/kg86nmpzd5lec8kjtlsfben4zlkcgjf1", deleteEmpty(createData1),"Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File Automated Comms - Profit & Loss Approved {(Deal File) Profit Sheet}");	
  }
});

// Enquiry Max – **Instant trigger from RETAIL P/X appraisal completion to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles} - Replaces https://zapier.com/app/editor/80334038?redirect=true
$(document).on('knack-form-submit.view_426', function(event, view, data) { 
  var createData = {"Knack UID":data.id, "VRM":data.field_257_raw, "Odometer":data.field_258_raw, "Main Image":handlAll(data.field_532_raw, "url"),
          "URL to Access Valuation":"https://www.robinsandday.co.uk/digital#new-appraisal/offsite-or-trade-valuation/" + data.id + "/","Valuation":("£" + data.field_753_raw).replace("undefined", "0.00"),
          "Enquiry Max Dealer UID":data.field_5799_raw, "Enquiry Max Enquiry UID":data.field_5800_raw, "Rear 3/4 Photo":handlAll(data.field_5373_raw, "url"), "Interior Photo":handlAll(data.field_5374_raw, "url"), "Dashboard Photo":handlAll(data.field_5723_raw, "url"),
          "Damage Photo 1":handlAll(data.field_716_raw, "url"), "Damage Photo 2":handlAll(data.field_717_raw, "url"), "Damage Photo 3":handlAll(data.field_718_raw, "url"), "Damage Photo 4":handlAll(data.field_720_raw, "url"), "Damage Photo 5":handlAll(data.field_719_raw, "url"), "Damage Photo 6":handlAll(data.field_721_raw, "url"),
          "Side Profile Photo":handlAll(data.field_5372_raw, "url"), "Date Of Last Service":handlDate(data.field_535_raw, "date_formatted"), "Total Refurb Cost":("£" + Math.round(data.field_624_raw)).replace("undefined", "").replace("NaN", ""), "Mechanical Refub Cost": ("£" + Math.round(data.field_622_raw)).replace("undefined", "").replace("NaN", ""), 
          "Aesthetic Refub Cost":("£" + data.field_623_raw).replace("undefined", ""), "Valuation Notes":data.field_4390_raw, "Vehicle Test Driven":data.field_745_raw, "Offer valid Up to":handlAll(data.field_3203_raw, "date_formatted"), 
          "Sales Advisor Refurb Description":(data.field_882_raw + "").replace("undefined", "") + " " + (data.field_883_raw + "").replace("undefined", ""), "Source Of Payload": "knack direct"};
  callPostHttpRequest("https://hook.integromat.com/71nekxpf0if53hc6gauk8j2rc3wqiv7p", deleteEmpty(createData),"Instant trigger from RETAIL P/X appraisal completion to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles}");	
});

// Enquiry Max – **Instant trigger from TRADE Or Offsite P/X appraisal completion to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles} - Replaces https://zapier.com/app/editor/81416151?redirect=true
$(document).on('knack-form-submit.view_370', function(event, view, data) { 
  //CreateData contains the structure of the data that will be sent through the POST
  var createData = {"Knack UID":data.id, "VRM":data.field_257_raw, "Odometer":data.field_258_raw, "Main Image":handlAll(data.field_532_raw, "url"),
    "URL to Access Valuation":"https://www.robinsandday.co.uk/digital#new-appraisal/offsite-or-trade-valuation/" + data.id + "/","Valuation": ("£" + data.field_753_raw).replace("undefined", "0.00"),
    "Enquiry Max Dealer UID":data.field_5799_raw, "Enquiry Max Enquiry UID":data.field_5800_raw, "Offsite Image":handlAll(data.field_4194_raw, "url"), "Valuation Pending On site Inspection":("£" + Math.round(data.field_853_raw)).replace("undefined", "0").replace("NaN", "0"), 
    "Rear 3/4 Photo":handlAll(data.field_5373_raw, "url"), "Interior Photo":handlAll(data.field_5374_raw, "url"), "Dashboard Photo":handlAll(data.field_5723_raw, "url"), "Damage Photo 1":handlAll(data.field_716_raw, "url"), "Damage Photo 2":handlAll(data.field_717_raw, "url"), "Damage Photo 3":handlAll(data.field_718_raw, "url"), 
    "Damage Photo 4":handlAll(data.field_720_raw, "url"), "Damage Photo 5":handlAll(data.field_719_raw, "url"), "Damage Photo 6":handlAll(data.field_721_raw, "url"), "Side Profile Photo":handlAll(data.field_5372_raw, "url"), "Date Of Last Service":handlDate(data.field_535_raw, "date_formatted"), "Total Refurb Cost": ("£" + Math.round(data.field_624_raw)).replace("undefined", "").replace("NaN", ""),
    "Mechanical Refub Cost":("£" + Math.round(data.field_622_raw)).replace("undefined", "").replace("NaN", ""), "Aesthetic Refub Cost":("£" + data.field_623_raw).replace("undefined", ""), "Valuation Notes":data.field_4390_raw, "Vehicle Test Driven":data.field_745_raw, "Offer valid Up to":handlDate(data.field_3203_raw, "date_formatted"), 
    "Sales Advisor Refurb Description":(data.field_882_raw + "").replace("undefined", "") + " " + (data.field_883_raw + "").replace("undefined", ""), "Source Of Payload":"knack direct"};
  callPostHttpRequest("https://hook.integromat.com/71nekxpf0if53hc6gauk8j2rc3wqiv7p", deleteEmpty(createData),"Instant trigger from TRADE Or Offsite P/X appraisal completion to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles}");	
});

// Enquiry Max – **Instant trigger from TRADE Or Offsite P/X appraisal MANAGER VALUATION OVERRIDE to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles} - Replaces https://zapier.com/app/editor/81423357/nodes/81423358/fields
$(document).on('knack-form-submit.view_396', function(event, view, data) { 
  var createData = {"Knack UID":data.id, "VRM":data.field_257_raw, "Odometer":data.field_258_raw, "Main Image":handlAll(data.field_532_raw, "url"),
  "URL to Access Valuation":"https://www.robinsandday.co.uk/digital#new-appraisal/offsite-or-trade-valuation/" + data.id + "/", "Valuation":("£" + data.field_753_raw).replace("undefined", "0.00"),
  "Enquiry Max Dealer UID":data.field_5799_raw, "Enquiry Max Enquiry UID":data.field_5800_raw, "Offsite Image":handlAll(data.field_4194_raw, "url"), "Valuation Pending On site Inspection":("£" + Math.round(data.field_853_raw)).replace("undefined", "0").replace("NaN", "0"),
   "Manger Override Valuation Pending Onsite Valuation":("£" + data.field_866_raw).replace("undefined", ""), "Date Of Last Service":handlDate(data.field_535_raw, "date_formatted"), "Total Refurb Cost":("£" + Math.round(data.field_624_raw)).replace("undefined", "").replace("NaN", ""), "Mechanical Refub Cost":("£" + Math.round(data.field_622_raw)).replace("undefined", "").replace("NaN", ""), 
   "Aesthetic Refub Cost":("£" + data.field_623_raw).replace("undefined", ""), "Vehicle Test Driven":data.field_745_raw, "Offer valid Up to":handlDate(data.field_3203_raw, "date_formatted"), "Valuation Notes":data.field_4390_raw, "Sales Advisor Refurb Description":(data.field_882_raw + "").replace("undefined", "") + " " + (data.field_883_raw + "").replace("undefined", ""), 
   "Source Of Payload":"knack direct"};
  callPostHttpRequest("https://hook.integromat.com/71nekxpf0if53hc6gauk8j2rc3wqiv7p", deleteEmpty(createData),"Instant trigger from TRADE Or Offsite P/X appraisal MANAGER VALUATION OVERRIDE to Integromat to return data to Enquiry Max {(P/X) Part Exchange Vehicles}");
});

//**Part exchange appraisal retail mechanical (Master App)
$(document).on('knack-form-submit.view_407', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/ztjcyglouzfis5l4wktkui7htszs6615", {"Record ID":data.id , "Source Of Payload":"knack direct"},"Part exchange appraisal retail mechanical (Master App)");
});

//User data update
$(document).on('knack-form-submit.view_5', function(event, view, data) {
  callPostHttpRequest("https://api.apify.com/v2/acts/davidmale~auth/runs?token=jP5rS2dPuuxTGiEige3fCWp8D", {"action": "replicate_users"},"User data update");   
});

//Valeting check out (Master App)
$(document).on('knack-form-submit.view_4504', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/j5s5ksuxtqjd4jcwh41qm5gy2afujni3", {"Record ID":data.id},"Valeting check out (Master App)");  
});

//(used deal file) - trigger intergromat to cancel used deal file
$(document).on('knack-form-submit.view_3562', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/vq733xr47qnzl4cb86q9ccmqoxvl62t1", {"Record ID":data.id},"(used deal file) - trigger intergromat to cancel used deal file");  
});

//Description - Used Deal File Profit Sheet - Franchise Selection
$(document).on('knack-form-submit.view_4589', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/ca4xgxoccrc4zfzbotr3f3y2f65312ve", {"Record ID":data.id},"Description - Used Deal File Profit Sheet - Franchise Selection");
});

// Description - Used Deal File Profit Sheet - Franchise Selection
$(document).on('knack-form-submit.view_4589', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/0s2n28ijchplc7orwld2r7nqw6lh7mm8", {"Knack Record ID":data.id},"Description - Used Deal File Profit Sheet - Franchise Selection");
});


// Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Digital P&L V2 when Approved {(Deal File) Profit Sheet} 
$(document).on('knack-form-submit.view_4573', function(event, view, data) { 
  if(data.field_6449_raw){
    callPostHttpRequest("https://hook.integromat.com/95plblxsob2nkputlodx6htsykvfmi7v", {"Record ID":data.id,"Form":"Digital P&L"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Digital P&L when Approved {(Deal File) Profit Sheet} ");
    callPostHttpRequest("https://hook.integromat.com/3q2btvigi1w229klrxitmlnluedv9v3c", {"Record ID":data.id,"Form":"Digital P&L"},"Used Deal File - Capture PDFs TRIGGER INTEGROMAT UPON – *Used Deal File PDF - Digital P&L when Approved {(Deal File) Profit Sheet} ");
  }
});
    
//Valeting check in/out (Master App)
$(document).on('knack-form-submit.view_4733', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/j5s5ksuxtqjd4jcwh41qm5gy2afujni3", {"Record ID":data.id},"Valeting check in out (Master App)")
});

// Refresh the table on WALL-E's status page         
$(document).on('knack-scene-render.scene_1417', function(event, scene) {
 recursivecallWallePage();
});

function recursivecallWallePage(){
 setTimeout(function () { if($("#view_4579").is(":visible")==true){ Knack.views["view_4579"].model.fetch();recursivecallWallePage();} }, 10000);
}

//Trigger Integromat to Unreserve Vehicle via Updates to Website/AutoTrader From Used Stock Management - Edit Adverts 
$(document).on('knack-form-submit.view_4857', function(event, view, data) { 
  var createData = ({"Record ID":data.id,"Reg No":data.field_2694_raw, "Stock ID":data.field_5713_raw, 
                                             "Peugeot Dealer ID":data.field_4161_raw, "Citroen Dealer ID":data.field_4162_raw, 
                                             "DS Dealer ID":data.field_4163_raw, "Vauxhall Dealer ID":data.field_5931_raw, "DID for Used Stock FTP":data.field_4623_raw});
  callPostHttpRequest("https://hook.integromat.com/n04o2rpxiiodil3pf91sn2b6khppbjlx", deleteEmpty(createData),"Trigger Integromat to Unreserve Vehicle via Updates to Website/AutoTrader From Used Stock Management - Edit Adverts")
});
    
//Add Valet (manually) PAGE
//Restrict Available Times for adding a valet to 8am - 7pm

var view_names = ["view_4510"]; ///add view numbers as necessary

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

    //Hides All Day and Repeat from Time/Date selection
    $('div[id="kn-input-field_7259"]>div[style="margin-top: 5px;"]').hide();
  });
}

//General function, needs to be copied to other apps JS files if needed
  function getFieldForRowID(view, field, id){
    try {
      if (Knack.views[view] && Knack.views[view].model){
        let record = Knack.views[view].model.data.models.find(function(el){
          return el.id === id;
        });
        if (record){
          return record.attributes[field];
        }
      }
    } catch (ex) { console.log('getFieldForRowID',ex);}
  }

  $(document).on('knack-view-render.view_1149', function (event, view, data) {

    //This part is for tooltip of another field above field in list
    //This part of code hides field_330 from the list and then adds it as mouse over to field 380
    //It needs function "getFieldForRowID", also the field_330 NEEDS to be included in the list
    //start
	  //this code works for hover message without inline editing
    $('th[class="field_7215"]').hide();
    $('td[class*="field_7215"]').hide();
    $('div[id="view_1149"] table>tbody>tr').each(function(){
      $(this).find('td[data-field-key="field_3155"]').attr('data-tooltip',getFieldForRowID('view_1149','field_7215',$(this).attr('id')));
      $(this).find('td[data-field-key="field_3155"]').addClass('tooltip-bottom');
  });
});


//**Used Deal Files - Submit Additional Product Certificates Uploaded
$(document).on('knack-form-submit.view_3321', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/3umnr247redycud7ind5l6xbge6lhq4k", {"Record ID":data.id , "Form":"Used Deal Files - Submit Additional Product Certificates Uploaded"},"Used Deal Files - Submit Additional Product Certificates Uploaded")
});


//**Used Deal Files - View Additional Product Certificates Uploaded
$(document).on('knack-form-submit.view_3324', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/3umnr247redycud7ind5l6xbge6lhq4k", {"Record ID":data.id , "Form":"Used Deal Files - View Additional Product Certificates Uploaded"},"Used Deal Files - View Additional Product Certificates Uploaded")
});

//*********** Consolidated HANDOVER PACK *************//
// Used Deal File - Customer Signed Consolidated Handover Pack - Update Documents and Trigger PDF Capture
$(document).on('knack-form-submit.view_5326', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/a7it4j5b5uxjwthdhk64bif7adrfp4az",{"Record ID":data.id},"Used Deal File - Customer Signed Consolidated Handover Pack - Update Documents and Trigger PDF Capture");  
});


/*
  Checks data acording to refreshData structure and updates views
  This is structure describing the page, consisting of different views, updated with different background processes
  Each record in refreshData represents one background update process
  Field mainField is knack fields on first view of views array and this field is used for checking if the background process finished it run and updated the record, so the update process needs ALWAYS give some value to this field!
  Function updates all views in views property of record, if field mainField is blank, till there is some value in mainField 
  !mainField needs to be on first View in array!
  runAfter is function, which is run after the data are loaded to the view

  This is just example
  let refreshData = [
          //mainField needs to be on first View in array
          {
              mainField : 'field_4',
              views:['75','78']   
          },{
              mainField : 'field_74',
              views:['76'],
              runAfter : functionName
          }
        ]
*/
function sceneRefresh(refreshData, startTime = null, runCounter = 1, stats = null){
  console.log('sceneRefresh');
  try {
    if (!startTime){
      startTime = new Date();
      stats = {startTime:startTime, log:[]}
      //console.log('startTime', startTime);
    } else {
      //console.log('elapsed',new Date() - startTime);
    }
    let recheck = false;
    for (one of refreshData){
        //console.log(one);
        //console.log('main field val',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
        if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
            let mainReloaded = false; 
            for (oneView of one.views){
                mainReloaded = refreshView(oneView, mainReloaded);
            }
            //console.log('main field val2',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
            if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
                recheck = true;
                if (runCounter===1){
                  for (oneView of one.views){
                    fillLoading(oneView);
                  }
                }
            } else {
              if (one.runAfter && !one.runAfterDone){
                setTimeout(one.runAfter,100);
                one.runAfterDone = true;
              }
            }
        } else {
          if (one.runAfter && !one.runAfterDone){
            setTimeout(one.runAfter,100);
            one.runAfterDone = true;
          }
          
          let statsLogFound = stats.log.find(function(el){return el.one === one.name});
          if (!statsLogFound) {
            stats.log.push({one:one.name,finishTime:new Date(),duration : (new Date() - stats.startTime)/1000});
          }
        }
    }
    if (recheck && (new Date() - startTime)<120000){
        console.log('needs recheck')
        setTimeout(function(){
            sceneRefresh(refreshData, startTime, runCounter + 1, stats);
        }, (runCounter<3?1500:2500));
    } else if ((new Date() - startTime)>120000){
      console.log('ending refresh without all done');
      for (one of refreshData){
        if (!one.runAfterDone){
          for (oneView of one.views){
            refreshView(oneView, true);
          }
        }
      }
    } else {
      if (runCounter!==1){
        console.log('everything checked, reload views just for sure');
        stats.finishTime = new Date();
        stats.duration = (stats.finishTime - stats.startTime)/1000;
        console.log('stats', stats);
        for (one of refreshData){
          if (!one.runAfterDone){
            for (oneView of one.views){
              refreshView(oneView, true);
            }
          }
        }
        setTimeout(function () { location.hash = location.hash + "#"; }, 100);
      }
    }
  } catch (e){
    console.log('sceneRefresh fail', refreshData, e)
  }
}

//This function refreshes view acording viewId, what is just view number!
//Can be called from scene render, view render
function refreshView(viewID, reload = false){
  try {
    var currModel = JSON.stringify(Knack.views['view_'+viewID].model.attributes);
    const a = {}
    a.success = function () {
      //if the mainField has value, refresh the view in browser
      if ((currModel !== JSON.stringify(Knack.views['view_'+viewID].model.attributes)) || reload){
      //if (Knack.views['view_'+mainFieldView].model.attributes[mainField]!==''){
        //refresh view on page
        setTimeout(function(){
          Knack.views['view_'+viewID].render();
          fillLoading(viewID);
        }, 50);
        return true;
      } else {
        return false;
      }
    };
    //reload data from database
    Knack.views['view_'+viewID].model.fetch(a);
  } catch (e){
    console.log('error refreshing view', viewID, e)
  }
}

function formatDateGB(date){
return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
}

function fillLoading(viewID){
$('div[class*="view_'+viewID+'"] div[class*="field_"]>div[class="kn-detail-body"]').each(function(){
  if ($(this).text().trim()===''){
    $(this).html('<img src="https://github.com/robinsandday/robinsandday.github.io/raw/main/imagesStore/loading.gif"> Loading...')
  }
});
}

// Webhook to Trigger Silent Salesman Scenario to update Deposit for Finance PDF https://www.integromat.com/scenario/2554226/edit
$(document).on('knack-form-submit.view_4985', function(event, view, data) { 
  var createData = {"VRM":data.field_2694_raw, "Vehicle Stock Record ID":data.id, "Sales Channel Record ID":data.field_4886_raw, "Price":data.field_2725_raw,
  "CAP ID":data.field_3257_raw, "Current Mileage":data.field_2693_raw, "Registration Date": handlAll(data.field_2695_raw, "date_formatted"), "Vehicle Type":data.field_2586_raw,
  "VAT Status":handlAll(data.field_2689_raw, "1"),"Deposit":data.field_7394_raw};
  callPostHttpRequest("https://hook.integromat.com/8dyychx6lyitshvxjep1l699zc5wym37", deleteEmpty(createData),"Webhook to Trigger Silent Salesman Scenario to update Deposit for Finance PDF https://www.integromat.com/scenario/2554226/edit")
});


//  Trigger Integromat following Photo Upload At Used Vehicle Check In
$(document).on('knack-form-submit.view_2281', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/xakduhf9nvro3xoa1o7p56c3q53sxl9u", {"Record ID":data.id},"Trigger Integromat following Photo Upload At Used Vehicle Check In")
});

// Used Stock Management - Update Autorola Trade Price
$(document).on('knack-form-submit.view_5048', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/vigtgktsw7fh3meswwm37ybgie0fc8p8", {"Record ID":data.id},"Used Stock Management - Update Autorola Trade Price")
});

// Used Stock Management - "Update Advert" details form
$(document).on('knack-form-submit.view_3280', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/p2wmxq4dqix476cf4npkqij9k7cos4vi", {"Record ID":data.id},"Used Stock Management - Update Advert details form")
});

// Used Stock Management - Auto Price Settings Updated - Update Advert Price
$(document).on('knack-form-submit.view_5354', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/bn722cnc3pyfuhbfxug1v8hbyozs2rzd", {"Record ID":data.id},"Used Stock Management - Auto Price Settings Updated - Update Advert Price")
});

/*Collapse purchasing MFL service Table 
$(document).on('view_5029 > section > div > div:nth-child(3) > div > div > div.kn-label-none.field_7242', function(event, view, data){
    addGroupExpandCollapse(view);
})
*/ 

/* testing autotrader multiple choice check box in table*/
// Function that adds checkboxes
var addCheckboxes = function(view) {
  // Add the checkbox to to the header to select/unselect all
  $('#' + view.key + '.kn-table thead tr').prepend('<th><input type="checkbox"></th>');
  $('#' + view.key + '.kn-table thead input').change(function() {
    $('.' + view.key + '.kn-table tbody tr input').each(function() {
      $(this).attr('checked', $('#' + view.key + '.kn-table thead input').attr('checked') != undefined);
    });
  });
  // Add a checkbox to each row in the table body
  $('#' + view.key + '.kn-table tbody tr').each(function() {
    $(this).prepend('<td><input type="checkbox"></td>');
  });
}
// Add checkboxes to a specific table view (view_1). Replace view_1 with your view key
$(document).on('knack-view-render.view_5055', function (event, view) {
  addCheckboxes(view);
});
// Cycle through selected checkboxes. Use this in any code that needs to get the checked IDs
$('#view_5055 tbody input[type=checkbox]:checked').each(function() {
  // add code here to get record id or row value
  var id = $(this).closest('tr').attr('id'); // record id
});

//Trigger Auth Actor password sync when user resets password
$(document).on('knack-form-submit.view_1141', function(event, view, data) {
  callPostHttpRequest("https://api.apify.com/v2/acts/davidmale~auth/runs?token=jP5rS2dPuuxTGiEige3fCWp8D", {"action":"replicate_users", "userEmail":data.field_3_raw.email},"Call Auth Actor Password Sync")
});

function handlAll(valueA, fieldName){ 
  return (valueA? valueA[fieldName]:null);
}
function handlDate(valueB, fieldDate){
  return (valueB? valueB[fieldDate]: null); // if the date is undefined it will return null
}
function handlSRC (valueC){
  return (valueC? "<img src=" + "\"" + valueC + "\"" + " />": null);
}
function handlIndex(valueA, indexA, fieldName){ 
  return (valueA? valueA[indexA][fieldName]:"");//This tests if valueA is not null or undefined, if yes it returns empty string, otherwise it returns property of fieldName of valueA
}
function deleteEmpty(objectA){   
  for (const [key, value] of Object.entries(objectA)) {
      if (value === undefined || value === null || value === ""){
          delete objectA[key];
      }
  }
  return objectA;
}

function callPostHttpRequest(url, payloadObject, callName){
  try{
    let commandURL = url ;
    let dataToSend = JSON.stringify(payloadObject) ;
    var rData = $.ajax({
      url: commandURL,
      type: 'POST',
      contentType: 'application/json',
      data: dataToSend,
      async: false
    }).responseText;
    return rData;
  } catch(exception) {
    sendErrorToIntegromat(exception, callName);
  }
}

function sendErrorToIntegromat(exception, name){
  console.log("error");
  const today = new Date();
  const date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;

  let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
  let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": name,
  "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
  var rData = $.ajax({
     url: commandURL,
     type: 'POST',
     contentType: 'application/json',
     data: dataToSend,
     async: false
  }).responseText;
}

$(document).on('knack-scene-render.scene_960', function (event, view, data) {
	const iH = IsInHomeScreen();
  console.log('IsInHomeScreen', iH);
  //$('[class="kn-current-user-intro"]').text((iH?'H':(iH===null?'N':'B'))+' - Logged in as');
  $('[class="kn-mobile-account-name"]').text((iH?'H':(iH===null?'N':'B'))+' - '+$('[class="kn-mobile-account-name"]').text())
});





