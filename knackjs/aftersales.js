//ultility functions for webhooks data

//function to prevent error when indexing an undefined object
const handlAll = (valueA, fieldName) => (valueA? valueA[fieldName]:null)

//function to handel data if img src is undefined
const handlSRC  = valueC => (valueC? "<img src=" + "\"" + valueC + "\"" + " />": null)

//function to handle indexing and searching for a key in a undefined object
const handlIndex = (valueA, indexA, fieldName) => (valueA? valueA[indexA][fieldName]:"")

//function to iterate through object and delete empty keys
const deleteEmpty = (objectA) => {
  Object.entries(objectA).forEach(([key, value]) => {
    if(!value || value === ""){
      delete objectA[key];
    }     
});
return objectA
}



//HIDE THE LOGO AND logged in user in all pages
$(document).on('knack-view-render.any', function (event, view, data) {
	$('[class="kn-container"]').hide();
	$('[class="kn-info kn-container"]').hide();
  submitUserLoginForm();
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

function getTokenFromURL(url){
  if (url.indexOf('token=')!==-1){
    let tokenS = url.substring(url.indexOf('token=')+6);
    if (tokenS.indexOf('&')!==-1){
      tokenS = tokenS.substring(tokenS,tokenS.indexOf('&'));
    } 
    return decodeURIComponent(tokenS);
  } else { return null}
}

var submitUserLoginForm = function() {
  if ($('[id="email"]').length===0){ 
    return;
  }
    var url = window.location.href;
    
    var token = getTokenFromURL(url);

    console.log('token', token, 'url',url);
    
    token = atob(token);
    if (!token.includes('#')){
      console.log('Wrong token');
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

/*//MASTER/SLAVE CONNECT
//Scenes where the App is accessed from the Master App and needs to login
var loginSceneNames = ["scene_20","scene_32","scene_38","scene_44","scene_52","scene_57","scene_111","scene_73","scene_74","scene_224","scene_340"]; ///add scene numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    //console.log(selector_scene)
    submitUserLoginForm();
  });
}*/

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_31').keyup(function() {
      this.value = this.value.toUpperCase().replace(new RegExp(' ','g'),'').replace(new RegExp('	','g'),''); 
  });
});

// function to create the weeb hooks for knack
function callPostHttpRequest(url, payloadObject, callName){
  try{
    let commandURL = url ;
    let dataToSend = JSON.stringify(deleteEmpty(payloadObject)) ;
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
        console.log('startTime', startTime);
      } else {
        console.log('elapsed',new Date() - startTime);
      }
      let recheck = false;
      for (one of refreshData){
          console.log(one);
          console.log('main field val',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
          if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
              let mainReloaded = false; 
              for (oneView of one.views){
                  mainReloaded = refreshView(oneView, mainReloaded);
              }
              console.log('main field val2',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
              if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
                  recheck = true;
                  if (runCounter===1){
                    console.log('fillLoading');
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
              refreshView(oneView, true, true);
            }
          }
        }
      } else {
        if (runCounter!==1){
          console.log('everything checked, reload views just for sure');
          stats.finishTime = new Date();
          stats.duration = (stats.finishTime - stats.startTime)/1000;
          console.log('stats', stats);
          saveStats(stats);
          for (one of refreshData){
            if (!one.runAfterDone){
              for (oneView of one.views){
                refreshView(oneView, true, true);
              }
            }
          }
        }
      }
    } catch (e){
      console.log('sceneRefresh fail', refreshData, e)
    }
}

//This function refreshes view acording viewId, what is just view number!
//Can be called from scene render, view render
function refreshView(viewID, reload = false, clearLoading = false){
    try {
      var currModel = JSON.stringify(Knack.views['view_'+viewID].model.attributes);
      const a = {}
      a.success = function () {
        if ((currModel !== JSON.stringify(Knack.views['view_'+viewID].model.attributes)) || reload){
          setTimeout(function(){
            Knack.views['view_'+viewID].render();
            if (clearLoading) {stopLoading(oneView);} //else {fillLoading(viewID);}
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

function stopLoading(viewID){
  $('div[class*="view_'+viewID+'"] div[class*="field_"]>div[class="kn-detail-body"]').each(function(){
    if ($(this).text().trim().includes('Loading...')){
      $(this).html('');
    }
  });
}

function saveStats(stats){
  console.log('saveStats');
  let commandURL = "https://hook.integromat.com/cqqou5f36rhra151jzixw3mmhm5fxf1a" ;
  let textFromStats = 'Duration: '+stats.duration.toLocaleString("en-GB", { maximumFractionDigits: 1, minimumFractionDigits: 0 });
  for (let i = 0;i<stats.log.length;i++){
    textFromStats += ', ' + stats.log[i].one + ': '+stats.log[i].duration.toLocaleString("en-GB", { maximumFractionDigits: 1, minimumFractionDigits: 0 });
  }
  let dataToSend = {"knackId":recordId,"stats":stats, 'statsText':textFromStats}; 
  console.log(dataToSend);
  $.ajax({
    url: commandURL,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(dataToSend),
    async: true
  })
}

function generateTyres(){
  try {
    console.log('GenerateTyres');
    let tyresJSON = JSON.parse(Knack.views['view_374'].model.attributes['field_250']);
    tyresJSON = tyresJSON.filter(function(el){
      return el['a:StockPolicy'][0] === 'ACTIVE' && el['a:Winter'][0] === 'N'
    })
    console.log('tyresJSON.length filtered',tyresJSON.length);
    tyresJSON = tyresJSON.sort(function(a,b){
      return (a['a:TotalFittedRetailPriceIncVAT'][0] > b['a:TotalFittedRetailPriceIncVAT'][0]?1:(a['a:TotalFittedRetailPriceIncVAT'][0] < b['a:TotalFittedRetailPriceIncVAT'][0]?-1:0));
    })
    let outputTables = [{name:'Budget'},{name:'Medium'},{name:'Premium'}];
    let recordsPerTableWhole = Math.floor(tyresJSON.length/outputTables.length);
    let remainderOfRecords = tyresJSON.length % outputTables.length;
    for (let i = 0;i<outputTables.length;i++){
      outputTables[i].count = recordsPerTableWhole;
      if (remainderOfRecords>0) {
        outputTables[i].count += 1;
        remainderOfRecords = remainderOfRecords - 1;
      }
    }
	  
    let jsonPosition = 0;
    for (let i = 0;i<outputTables.length;i++){
      outputTables[i].text = '<table><tr><th>Manufacturer type</th><th>Price</th></tr>';
      for (let j = jsonPosition;j<jsonPosition + (outputTables[i].count<5?outputTables[i].count:5);j++){
        outputTables[i].text += '<tr title="Available: '+tyresJSON[j]['a:AvailableQuantity'][0]+'; SOR: '+tyresJSON[j]['a:SORQuantity'][0]+'; Delivery date: '+formatDateGB(new Date(tyresJSON[j]['a:DeliveryDate'][0]))+'"><td bgcolor="'+tyreRowColor(tyresJSON[j]['a:AvailableQuantity'][0],tyresJSON[j]['a:SORQuantity'][0])+'">'+tyresJSON[j]['a:ManufacturerName'][0]+' '+tyresJSON[j]['a:StockDesc'][0]+'</td><td>£'+tyresJSON[j]['a:TotalFittedRetailPriceIncVAT'][0]+'</td></tr>';
      }
      jsonPosition += outputTables[i].count;
      outputTables[i].text += '</table>';
    }
    let output = '<table><tr>';
    for (let i =0;i<outputTables.length;i++){
      output += '<td>' + outputTables[i].name + '<br />'+outputTables[i].text+'</td>';
    }
    output += '</tr></table>';

    $('div[class*="field_250"]').html(output);
    $('div[class*="field_250"]').show();
  } catch (e){
    console.log('Error Generating tires',e);
  }
}

function generateTyres1(){
  try {
    console.log('GenerateTyres1');
    let tyresJSON = JSON.parse(Knack.views['view_1477'].model.attributes['field_250']);
    tyresJSON = tyresJSON.filter(function(el){
      return el['a:StockPolicy'][0] === 'ACTIVE' && el['a:Winter'][0] === 'N'
    })
    console.log('tyresJSON.length filtered',tyresJSON.length);
    tyresJSON = tyresJSON.sort(function(a,b){
      return (a['a:TotalFittedRetailPriceIncVAT'][0] > b['a:TotalFittedRetailPriceIncVAT'][0]?1:(a['a:TotalFittedRetailPriceIncVAT'][0] < b['a:TotalFittedRetailPriceIncVAT'][0]?-1:0));
    })
    let outputTables = [{name:'Budget'},{name:'Medium'},{name:'Premium'}];
    let recordsPerTableWhole = Math.floor(tyresJSON.length/outputTables.length);
    let remainderOfRecords = tyresJSON.length % outputTables.length;
    for (let i = 0;i<outputTables.length;i++){
      outputTables[i].count = recordsPerTableWhole;
      if (remainderOfRecords>0) {
        outputTables[i].count += 1;
        remainderOfRecords = remainderOfRecords - 1;
      }
    }	  
	  
    let jsonPosition = 0;
    for (let i = 0;i<outputTables.length;i++){
      outputTables[i].text = '<table><tr><th>Manufacturer type</th><th>Price</th></tr>';
      for (let j = jsonPosition;j<jsonPosition + (outputTables[i].count<5?outputTables[i].count:5);j++){
        outputTables[i].text += '<tr title="Available: '+tyresJSON[j]['a:AvailableQuantity'][0]+'; SOR: '+tyresJSON[j]['a:SORQuantity'][0]+'; Delivery date: '+formatDateGB(new Date(tyresJSON[j]['a:DeliveryDate'][0]))+'"><td bgcolor="'+tyreRowColor(tyresJSON[j]['a:AvailableQuantity'][0],tyresJSON[j]['a:SORQuantity'][0])+'">'+tyresJSON[j]['a:ManufacturerName'][0]+' '+tyresJSON[j]['a:StockDesc'][0]+'</td><td>£'+tyresJSON[j]['a:TotalFittedRetailPriceIncVAT'][0]+'</td></tr>';
      }
      jsonPosition += outputTables[i].count;
      outputTables[i].text += '</table>';
    }
    let output = '<table><tr>';
    for (let i =0;i<outputTables.length;i++){
      output += '<td>' + outputTables[i].name + '<br />'+outputTables[i].text+'</td>';
    }
    output += '</tr></table>';

    $('div[class*="field_250"]').html(output);
    $('div[class*="field_250"]').show();
  } catch (e){
    console.log('Error Generating tyres',e);
  }
}



function tyreRowColor(stockCount, SORCount){
  if (SORCount>=4){
    return '#00ff00';
  } else if (stockCount>=4){
    return '#56ff56';
  } else if (stockCount>0){
    return '#ffff00';
  } else {
    return '#ff0000';
  }
}

function createServiceScheduleClick(){
  var serviceScheduleLabel = document.getElementsByClassName('field_72')[0];

  serviceScheduleLabel.style.cursor = 'pointer';
  serviceScheduleLabel.onclick = function() {
    let servS = document.getElementById("serviceSchedule");
    if (servS.style.display === "none" || servS.style.display === ""){
      servS.style.display = "inline";
    } else {
      servS.style.display = "none";
    }
  };
}

function formatScene24(){
  /*
  let sceneEl = document.getElementById('kn-scene_24');
  let sections = document.createElement('div');
  sections.setAttribute("id", "sections");
  let sectionLeft = document.createElement('div');
  sectionLeft.setAttribute("id", "sectionLeft");
  let sectionCenter = document.createElement('div');
  sectionCenter.setAttribute("id", "sectionCenter");
  let sectionRight = document.createElement('div');
  sectionRight.setAttribute("id", "sectionRight");
  sceneEl.prepend(sections);
  sections.prepend(sectionRight)
  sections.prepend(sectionCenter)
  sections.prepend(sectionLeft)
  sectionLeft.appendChild(document.getElementById('view_95'));
  sectionLeft.appendChild(document.getElementById('view_98'));
  sectionLeft.appendChild(document.getElementById('view_131'));
  sectionLeft.appendChild(document.getElementById('view_148'));
  sectionLeft.appendChild(document.getElementById('view_170'));
  sectionCenter.appendChild(document.getElementById('view_97'));
  sectionCenter.appendChild(document.getElementById('view_114'));
  sectionCenter.appendChild(document.getElementById('view_121'));
  sectionCenter.appendChild(document.getElementById('view_122'));
  sectionCenter.appendChild(document.getElementById('view_117'));
  sectionCenter.appendChild(document.getElementById('view_149'));
  sectionRight.appendChild(document.getElementById('view_96'));
  sectionRight.appendChild(document.getElementById('view_133'));
  sectionRight.appendChild(document.getElementById('view_115'));
  */
  //Hide service tooltips field
  $('div[class="field_325"]').hide();
}

let shownTooltipId = null;
function serviceVisitsTooltips(){
  //console.log('serviceVisitsTooltips');
  $('div[id*="tooltip"]').each(function(){
    $(this).attr("style","background: white; position: fixed; display:none;");
  });
  $('div[id="view_324"]').on("mouseleave", function (e) {
    //console.log('HIDE AFTER LEAVE')
    $('div[id="tooltip_'+shownTooltipId+'"]').hide();
  });

  //console.log('table',$('table[id="serviceVisitsTable"]'));
  //$('table[id="serviceVisitsTable"]').on("mousemove", function (e) {
  $('div[id="view_324"]').on("mousemove", function (e) {
      //console.log('on move');
      let partOfTable = document.elementFromPoint(e.pageX, e.pageY - document.documentElement.scrollTop);
      let trUnderMouse = null;
      if (partOfTable){
        if (partOfTable.nodeName==='TD'){
          trUnderMouse = partOfTable.parentElement;
        }
        if (partOfTable.nodeName==='TR'){
          trUnderMouse = partOfTable;
        }
      }
      if (trUnderMouse && trUnderMouse.id){
        $('div[id="tooltip_'+trUnderMouse.id+'"]').show();
        //$('div[id="tooltip_'+trUnderMouse.id+'"]').offset({ left: e.pageX+10, top: e.pageY });
        $('div[id="tooltip_'+trUnderMouse.id+'"]').offset({ left: document.getElementById('serviceVisitsTable').getBoundingClientRect().left-250, top: 50 + document.documentElement.scrollTop });
        if (shownTooltipId !== trUnderMouse.id && shownTooltipId !== null){
            $('div[id="tooltip_'+shownTooltipId+'"]').hide();
        }
        shownTooltipId = trUnderMouse.id;
      }
  });
  setTimeout(function(){
    $('div[class="field_325"]').show();
  }, 100);
}

$(document).on("knack-scene-render.scene_105", function(event, scene, data) {
  //formatScene24();
  setTimeout(function(){
    refreshScene24();
  }, 100);
});

function refreshScene24(){
  let refreshData = [
    {
      name : 'Autoline - Owner',
      mainField : 'field_278', //Autoline - type of bussines - first Autoline save
      views:['377','326','344','327']
    },{
      name : 'Autoline - Vehicle summary',
      mainField : 'field_318', //Autoline - vehicle summary - second Autoline save
      views:['325','375','324'],
    },{
      name : 'EMAC Service plan',
      mainField : 'field_312', //EMAC - service plan Summary = Service plan
      views:['376']
    },{
      name : 'EMAC Service plan - offer',
      mainField : 'field_348', //EMAC - service plan Summary = Service plan
      views:['378']
    },{
      name : 'Tyres',
      mainField : 'field_247', //Tyres - Front = Stapletons
      views:['330'],
      //runAfter : generateTyres
    },{
      name : 'VHC',
      mainField : 'field_302', //VHC - exists = VHC
      views:['328']
    },{
      name : 'Autoline - email valid',
      mainField : 'field_316', //Autoline - is email valid - last Autoline save
      views:['379']   
    },{
      name : 'Autoline - service visits',
      mainField : 'field_325', //Autoline - service visits tooltips
      views:['380'],
      runAfter : serviceVisitsTooltips
    },{	    
      name : 'Recalls',
      mainField : 'field_70', //Recalls Oustanding
      views:['329','332']
    },{
      name : 'Service schedule',
      mainField : 'field_350', //Vehicle details
      views:['332']
    }
  ]
  sceneRefresh(refreshData);
}

$(document).on("knack-scene-render.scene_118", function(event, scene, data) {
  let refreshData = [
    {
        mainField : 'field_72', //Service Schedule
        views:['369']
    }
  ]
  sceneRefresh(refreshData);
});

$(document).on("knack-scene-render.scene_508", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_250', //Tyres
          views:['1477'],
          runAfter : generateTyres1 
      }
    ]
    sceneRefresh(refreshData);
});

$(document).on("knack-scene-render.scene_119", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_250', //Tyres
          views:['374'],
          runAfter : generateTyres 
      }
    ]
    sceneRefresh(refreshData);
  //generateTyres();
});

  var recordId = '';
  $(document).on('knack-form-submit.view_71', function(event, view, data) { 
    let commandURL = "https://hook.integromat.com/53yx2tuy820lvzuobdqex8jem2utgwil" ;
    let dataToSend = Object.assign({"source":"NEWRECORD"}, data); 
    recordId = data.id;
    console.log(dataToSend);
    var rData = $.ajax({
      url: commandURL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(dataToSend),
      async: false
    }).responseText;
    console.log(rData);
  });

  $(document).on('knack-view-render.view_324', function (event, view, data) {
    function showHideMoreServiceVisits(){
      let newV = (document.querySelector('.more').style.display==="none"?"":"none");
      document.querySelectorAll('.more').forEach(function(el) {
         el.style.display = newV;
      });
      if (newV==='none'){
        document.getElementById("showHideMoreServiceVisits").innerText = "Show more";
      } else {
        document.getElementById("showHideMoreServiceVisits").innerText = "Hide more";
      }
    }
    if (document.getElementById("showHideMoreServiceVisits")){
      document.getElementById("showHideMoreServiceVisits").onclick = showHideMoreServiceVisits;
      showHideMoreServiceVisits();
    }
  });

  $(document).on('knack-view-render.view_140', function (event, view, data) {
    let button0 = document.createElement('button');
    button0.innerHTML = 'In Stock at All Hubs';
    button0.setAttribute("class", "kn-button");
    button0.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_342%22%2C%22operator%22%3A%22higher%20than%22%2C%22value%22%3A%220%22%2C%22field_name%22%3A%22Total%20Available%20Quantity%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button0)
    let button1 = document.createElement('button');
    button1.innerHTML = 'With BON Raised';
    button1.setAttribute("class", "kn-button");
    button1.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_336%22%2C%22operator%22%3A%22is%20not%20blank%22%2C%22field_name%22%3A%22Power%20Supply%20Notfication%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button1)
    let button2 = document.createElement('button');
    button2.innerHTML = 'In Stock at Own Hub';
    button2.setAttribute("class", "kn-button");
    button2.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_345%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%22Yes%22%2C%22field_name%22%3A%22Has%20Hub%20In%20Stock%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button2)
    let button3 = document.createElement('button');
    button3.innerHTML = 'BO’s with Actions';
    button3.setAttribute("class", "kn-button");
    button3.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_344%22%2C%22operator%22%3A%22is%20not%22%2C%22value%22%3A%22None%22%2C%22field_name%22%3A%22Order%20Processing%20Status%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button3)
    let button4 = document.createElement('button');
    button4.innerHTML = 'In Stock at Own Hub, with BON Raised';
    button4.setAttribute("class", "kn-button");
    button4.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_336%22%2C%22operator%22%3A%22is%20not%20blank%22%2C%22field_name%22%3A%22Power%20Supply%20Notfication%22%7D%2C%7B%22field%22%3A%22field_345%22%2C%22operator%22%3A%22is%22%2C%22value%22%3A%22Yes%22%2C%22field_name%22%3A%22Has%20Hub%20In%20Stock%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button4)
    let button5 = document.createElement('button');
    button5.innerHTML = 'In Stock at All Hubs, with BON Raised';
    button5.setAttribute("class", "kn-button");
    button5.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_342%22%2C%22operator%22%3A%22higher%20than%22%2C%22value%22%3A%220%22%2C%22field_name%22%3A%22Total%20Available%20Quantity%22%7D%2C%7B%22match%22%3A%22and%22%2C%22field%22%3A%22field_336%22%2C%22operator%22%3A%22is%20not%20blank%22%2C%22field_name%22%3A%22Power%20Supply%20Notfication%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button5)
    let button6 = document.createElement('button');
    button6.innerHTML = 'In Stock at All Hubs with BON Raised excluding +++';
    button6.setAttribute("class", "kn-button");
    button6.onclick = function(){
      let token = getTokenFromURL(document.location.href);
      document.location = "https://www.stellantisandyou.co.uk/aftersales#powersupply-orders/?token="+token+"&view_139_page=1&view_139_sort=field_334|desc&view_139_filters=%7B%22match%22%3A%22and%22%2C%22rules%22%3A%5B%7B%22field%22%3A%22field_342%22%2C%22operator%22%3A%22higher%20than%22%2C%22value%22%3A%220%22%2C%22field_name%22%3A%22Total%20Available%20Quantity%22%7D%2C%7B%22match%22%3A%22and%22%2C%22field%22%3A%22field_336%22%2C%22operator%22%3A%22is%20not%20blank%22%2C%22field_name%22%3A%22Power%20Supply%20Notfication%22%7D%2C%7B%22match%22%3A%22and%22%2C%22field%22%3A%22field_354%22%2C%22operator%22%3A%22is%20not%22%2C%22value%22%3A%22%2B%2B%2B%22%2C%22field_name%22%3A%22Power%20Supply%20Reliability%22%7D%5D%7D"
      return false;
    };
    document.getElementById('view_140').appendChild(button6)
  });

  //General function, needs to be copied to other apps JS files if needed
  function getFieldForRowID(view, field, id){
    try {
      if (Knack.views[view] && Knack.views[view].model){
        let record = Knack.views[view].model.data.models.find(function(el){
          return el.id === id
        })
        if (record){
          return record.attributes[field];
        }
      }
    } catch (ex) { console.log('getFieldForRowID',ex)}
  }

  //Parts Power Supply - scene 32 - Power Supply Orders view
  $(document).on('knack-view-render.view_139', function (event, view, data) {
    $('td[class="field_334"]').each(function(){$(this).text($(this).text().trim().substr(0,6)+$(this).text().trim().substr(8,2));});

    //This part is for tooltip of another field above field in list
    //This part of code hides field_330 from the list and then adds it as mouse over to field 380
    //It needs function "getFieldForRowID", also the field_330 NEEDS to be included in the list
    //start
    $('th[class="field_330"]').hide();
    $('td[class*="field_330"]').hide();
    $('div[id="view_139"] table>tbody>tr').each(function(){
      $(this).find('td[data-field-key="field_380"]').attr('data-tooltip',getFieldForRowID('view_139','field_330',$(this).attr('id')));
      $(this).find('td[data-field-key="field_380"]').addClass('tooltip-right');
    });
    //end

    //This part is for column headers
    //Column headers
    $('th[class="field_380"]').attr('title','This is the location of the Parts Warehouse');
    $('th[class="field_381"]').attr('data-tooltip','Quantity and part number on backorder');
    $('th[class="field_381"]').addClass('tooltip-bottom')
  });

  $(document).on('knack-scene-render.scene_38', function(event, scene) {
    refresh('151', 'TITLE', 'TEXT $field_351');
   });

  //PART OF THE CODE FOR NOTIFICATION AND REFRESH OF LIST
  // START
  // Usage - to the scene where there is the view with list add this code 
  // refresh('151', 'TITLE', 'TEXT $field_351');
  // 151 is the view number, and in text you can use any fields in the view with $
  var refreshList = [];

  function refreshWithData(viewID, notifTitle, notifText, field, data = null){
    //console.log('refreshWithData', viewID, 'data',data,'field',field,Knack.views["view_"+viewID].model.data.models[0].attributes);
    //askNotifications();
    if (Knack.views["view_"+viewID]){
      if (data===null){
        if (refreshList.find(el => el === viewID)){
          console.log('already registered');
          return;
        }
        refreshList.push(viewID);
        data = {'value':Knack.views["view_"+viewID].model.data.models[0].attributes[field]};
      } else {
        //console.log(Knack.views["view_"+viewID].model.data);
        if (data.value<Knack.views["view_"+viewID].model.data.models[0].attributes[field]){
          console.log('change up');
          showNotification('Virtual reception','','New Aftersales Virtual Reception Message')
        }
      }
      data.value = Knack.views["view_"+viewID].model.data.models[0].attributes[field];
    }
    setTimeout(function () { if($("#view_"+viewID).is(":visible")==true){viewFetchWithData(viewID, notifTitle, notifText, field, data);} }, 6000);
   }

  function refresh(viewID, notifTitle, notifText, data = null){
    console.log('refresh', viewID);
    askNotifications();
    if (Knack.views["view_"+viewID]){
      if (data===null){
        if (refreshList.find(el => el === viewID)){
          console.log('already registered');
          return;
        }
        refreshList.push(viewID);
        data = {};
      } else {
        console.log(Knack.views["view_"+viewID].model.data.total_records);
        if (data.total_records!== Knack.views["view_"+viewID].model.data.total_records){
          console.log('NEW RECORD');
          let newRec = Knack.views["view_"+viewID].model.data.models.filter(function(el){
            return data.records.filter(function(el2){
              return el2 === el.id;
            }).length===0
          })
          console.log('newRec', newRec)
          if (newRec.length>0){
            for (newRecOne of newRec){
              showNotification(notifTitle,'',fillTextFromData(notifText, newRecOne.attributes))
            }
          } else {
            showNotification(notifTitle,'','Detail not on current list page')
          }
        }
      }
      data.total_records = Knack.views["view_"+viewID].model.data.total_records;
      data.records = Knack.views["view_"+viewID].model.data.models.map(function(el){ return el.id});
    }
    setTimeout(function () { if($("#view_"+viewID).is(":visible")==true){viewFetch(viewID, notifTitle, notifText, data);} }, 15000);
   }

  function viewFetchWithData(viewID, notifTitle, notifText, field, data = null){
    Knack.views["view_"+viewID].model.fetch();
    setTimeout(function () { refreshWithData(viewID, notifTitle, notifText, field, data); }, 500);
   }

   function viewFetch(viewID, notifTitle, notifText, data = null){
    Knack.views["view_"+viewID].model.fetch();
    setTimeout(function () { refresh(viewID, notifTitle, notifText, data); }, 500);
   }

   function fillTextFromData(pattern, data){
      if (!pattern.includes('$')) return pattern;
      for (let varP in data) {
        pattern = pattern.replace('$'+varP,data[varP]);
      }
      return pattern;
   }

   function showNotification(title, icon = '', body){   
    var notification = new Notification(title, {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: body,
      requireInteraction: true
     });
     notification.onclick = function() {
      notification.close();
     };
   }

   function askNotifications(){
    if (Notification.permission !== 'granted') Notification.requestPermission();
    if (Notification.permission === 'denied') alert('NOTIFICATION DENIED, enable notification for this site, chrome://settings/content/siteDetails?site=https%3A%2F%2Fwww.robinsandday.co.uk%2F');
    console.log(Notification.permission);
   }

   //END OF CODE FOR NOTIFICATION AND REFRESH OF LIST


  
$(document).on('knack-form-submit.view_338', function(event, view, data) { 
  let commandURL = "https://hook.integromat.com/82cg83yb0g9ekakjvn4ep8k8xh27kyps" ;
  let dataToSend = Object.assign({"source":"EMACOfferRefresh"}, data); 
  recordId = data.id;
  console.log(dataToSend);
  var rData = $.ajax({
    url: commandURL,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(dataToSend),
    async: false
  }).responseText;
  console.log(rData);

  refreshView('378', true);
  setTimeout(function(){
    let refreshData = [
      {
        name : 'EMAC Service plan - offer',
        mainField : 'field_348', //EMAC - service plan Summary = Service plan
        views:['378']
      }
    ]
    sceneRefresh(refreshData);
  }, 1000);
});


//trigger Maxoptra webhook v2

$(document).on('knack-form-submit.view_225', function(event, view, data) {

try{

    let commandURL = "https://hook.integromat.com/hbenwdqwud64hds9kjcz7hc5x13ciioy";
    let dataToSend = JSON.stringify({"Record ID":data.id});

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
    let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION what for the error webhook",
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

//trigger Aftersales Tyre dealer Stock Lookup

/*$(document).on('knack-form-submit.view_1474', function(event, view, data) {

try{

    let commandURL = "https://hook.eu1.make.celonis.com/95g8pth4f57ytmkkh6i4cei4ks9df5a8";
    let dataToSend = JSON.stringify({"Record ID":data.id, "REG":data.field_31, "POS":data.field_443});

    var rData = $.ajax({
        url: commandURL,
        type: 'POST',
        contentType: 'application/json',
        data: dataToSend,
        async: false
    }).responseText;    

    //let refreshData = [
   //   {
    //      mainField : 'field_605', //Tyres
   //       views:['229']
   //  }
   // ]
    sceneRefresh(refreshData);
}catch(exception){
    console.log("error");
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    let commandURL = "https://hook.integromat.com/bxfn25wkj67pptq9bniqmpvvjg868toi";
    let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION what for the error webhook",
    "Payload": data, "userName": Knack.getUserAttributes().name, "userEmail": Knack.getUserAttributes().email, "Exception": exception.message, "dateTime": dateTime});
    var rData = $.ajax({
       url: commandURL,
       type: 'POST',
       contentType: 'application/json',
       data: dataToSend,
       async: false
    }).responseText;
}
}); */

//trigger get tyres and prices from customer job card
$(document).on('knack-form-submit.view_1474', function(event, view, data) { 
    
    try{
        

        let commandURL = "https://hook.eu1.make.celonis.com/f3xcida5tqk6fybgpkga8p9gn7ek6e7o";
        let dataToSend = JSON.stringify({"Record ID":data.id, "REG":data.field_31, "POS":data.field_443, "Dealer":data.field_411});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Trigger get tyres and prices from customer job card");
    }
});

//auto reload Clear tyres in customer & vehicle look up /precalls
$(document).on('knack-record-update.view_243', function(event, view, data) {
  
  setTimeout(function () { location.hash = location.hash + "#"; }, 100);

  Knack.showSpinner();
  
});

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



//**Trigger Text To Customer To Complete Exit Survey At Workshop "Check Out"
$(document).on('knack-form-submit.view_318', function(event, view, data) { 
    
    try{
        

        let commandURL = "https://hook.integromat.com/wio8wmbeqg4p81kwshmegg7h7fsfawz7";
        let dataToSend = JSON.stringify({"Record ID":data.id});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Trigger Text To Customer To Complete Exit Survey At Workshop \"Check Out\"");
    }
});


//**Trigger Aftersales - Follow Up call - Text. 
$(document).on('knack-form-submit.view_646', function(event, view, data) { 
    
    try{
        

        let commandURL = "https://hook.integromat.com/vkginb5nf78dhi268ujtexqrctayfuab";
        let dataToSend = JSON.stringify({"Record ID":data.id});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Aftersales - Follow Up Call Email");
    }
});

//**Trigger Aftersales - Exit Survey Email From Insecure (Customer Phone)
$(document).on('knack-form-submit.view_310', function(event, view, data) { 
    
    try{
        

        let commandURL = "https://hook.integromat.com/8k4weh9vuci1ffkk2ber72azmqjhmbvv";
        let dataToSend = JSON.stringify({"Record ID":data.id});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Aftersales - Exit Survey Email from Insecure (customer phone)");
    }
});


// ----------  refresh customer account applications table every 60 seconds but not the page itself  ----------
// ----------  efresh customer account applications report every 60 seconds but not the page itself  ----------

$(document).on('knack-scene-render.scene_111', function(event, scene) {
 recursivecallscene_111();
});

function recursivecallscene_111(){
 setTimeout(function () { if($("#view_359").is(":visible")==true){ Knack.views["view_359"].model.fetch();}if($("#view_634").is(":visible")==true){ Knack.views["view_634"].model.fetch();}recursivecallscene_111(); }, 100000);
}

//trigger Tarot API
$(document).on('knack-form-submit.view_1106', function(event, view, data) {

try{

    let commandURL = "https://hook.integromat.com/fjr9e2gme5skt4qael5h5f63kupx1kfg";
    let dataToSend = JSON.stringify({"Record ID":data.id});

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
    let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION what for the error webhook",
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

//Trigger tarot v2 (Second column)
$(document).on('knack-form-submit.view_1298', function(event, view, data) {

try{

    let commandURL = "https://hook.eu1.make.celonis.com/a45crmnl4nnfws8iww60ro6teti10t7g";
    let dataToSend = JSON.stringify({"Record ID":data.id});

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
    let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION what for the error webhook",
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



//trigger aftersales - wip management notes to update

$(document).on('knack-form-submit.view_654', function(event, view, data) {

try{

    let commandURL = "https://hook.integromat.com/s8j9klwniouvc81742i1hy8yxtc822ut";
    let dataToSend = JSON.stringify({"Record ID":data.id, "Manager's Notes":data.field_1015_raw, "userName": Knack.getUserAttributes().name, "NOM_WIP_REG":data.field_978_raw, "Nom_wip":data.field_558_raw});

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
    let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION what for the error webhook",
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


// ----------  refresh status of tarot upload ----------

$(document).on('knack-scene-render.scene_224', function(event, scene) {
 recursivecallscene_224();
});

function recursivecallscene_224(){
 setTimeout(function () { if($("#view_638").is(":visible")==true){ Knack.views["view_638"].model.fetch();recursivecallscene_224();} }, 30000);
}

// Trigger Customer Incident Form

$(document).on('knack-form-submit.view_781', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/gmtkedwe7nxktiqm6qi4rg5apeno73an", {"Record ID":data.id},"Send Pre Visit Digital Customer Incident Form")
});

$(document).on('knack-form-submit.view_834', function(event, view, data) {
  callPostHttpRequest("https://hook.eu1.make.celonis.com/nm7ndnq4ixrw3r5lx2slrimrxwg4g9ht", {"Record ID":data.id,"Origin":data.field_1107,"Auto Increment":data.field_1064},"Completed Engine Pre Visit Digital Customer Incident Form")
});

$(document).on('knack-form-submit.view_1394', function(event, view, data) {
  callPostHttpRequest("https://hook.eu1.make.celonis.com/e681sgmbzwk1hgugd3ph4kr34addh61o", {"Record ID":data.id,"Origin":data.field_1815},"Pre Visit Digital Customer Incident Form DEV")
});

$(document).on('knack-form-submit.view_834', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/gmtkedwe7nxktiqm6qi4rg5apeno73an", {"Record ID":data.id},"Pre Visit Digital Customer Incident Form")
});

//Submit form for GDPR preferences update in Check-in process
$(document).on('knack-form-submit.view_732', function(event, view, data) { 
  callPostHttpRequest("https://hook.integromat.com/iovfpyqnj3d9pihhmhm1wcgtu5dosv0b", {"Record ID":data.id, "Service GDPR PHONE":data.field_1048_raw, "Service GDPR EMAIL":data.field_1050_raw, "Service GDPR POST":data.field_1051_raw,
  "Service GDPR SMS":data.field_1052_raw, "Sales GDPR PHONE":data.field_1054_raw, "Sales GDPR EMAIL":data.field_1055_raw,"Sales GDPR POST":data.field_1056_raw, "Sales GDPR SMS":data.field_1057_raw, "Customer Magic Number":data.field_1006_raw.replace(/[^0-9]/g,'')},"Submit form for GDPR preferences update in Check-in process")
});


//change the text color based on the input value
$(document).on('knack-view-render.view_375', function(event, view, data) {

  $("#view_375 .kn-details-group.column-2.columns .kn-detail-body span span").each(function() {
	      //green color style
        const greenStyle = {
          color: "#228B22",
          textShadow: "0 0 7px #fff,  0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa"
        }
        //red color style
        const redStyle = {
          color: "#cc0000",
          textShadow: "0 0 7px #fff,  0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ffcccc, 0 0 82px #ffcccc, 0 0 92px #ffcccc, 0 0 102px #ffcccc, 0 0 151px #ffcccc"
        }
    //choose color style based on input
    let textColor = ($(this).text().trim() === "No") ? redStyle : greenStyle;
	  //apply the css changes
    $(this).css(textColor);
    
    })
});

//Submit form for Vehicle Check-in
$(document).on('knack-form-submit.view_736', function(event, view, data) { 

  callPostHttpRequest("https://hook.eu1.make.celonis.com/jcvomnieu3i0k2a5bkce88csho75et9s", {"Record ID":data.id, "Summary Of Work That Has Been Booked In": data.field_1116_raw,
 "Date / Time Collection Time agreed With Customer At Check in":handlAll(data.field_1117_raw, "date"), "Parking Bay That Customer Vehicle Is Currently Parked In":data.field_1118_raw,
 "Alternative Mobile Phone Number To Use whilst vehicle is with us Instead Of Stored Contact numbers": handlAll(data.field_1119_raw, "formatted"), "Would Customer Like Us To Make This New Number The Default For Future Communication": data.field_1120_raw,
  "Customer Signature At Check in":data.field_1122_raw, "Labour Summary":data.field_432_raw, "Customer & Advisor Job Card Notes":data.field_446_raw, "Autoline - customer email":data.field_277_raw,
  "Use Autoline - Customer Phone 1":data.field_782_raw, "Use Autoline - Customer Phone 2":data.field_783_raw, "Use Autoline - Customer Phone 3":data.field_784_raw, "Use Autoline - Customer Phone 3":data.field_785_raw},"Submit form for Vehicle Check-in")

});

  //Wip Management hide values from view
  $(document).on('knack-view-render.view_596', function (event, view, data) {

	  //hide VIN from table
	    $('th[class="field_73"]').hide();
    $('td[class*="field_73"]').hide();
	  	  //hide reg
	  $('th[class="field_31"]').hide();
    $('td[class*="field_31"]').hide();
	  
	  //hide wip num
	  $('th[class="field_441"]').hide();
    $('td[class*="field_441"]').hide();
	  
	  //hide account num
	  $('th[class="field_756"]').hide();
    $('td[class*="field_756"]').hide();
	  
	   //hide connected dealer
	  $('th[class="field_411"]').hide();
    $('td[class*="field_411"]').hide();
	  
	   //hide parts on V.I.C.S
	  $('th[class="field_985"]').hide();
    $('td[class*="field_985"]').hide();
	  
	  //hide record id
	  $('th[class="field_1601"]').hide();
    $('td[class*="field_1601"]').hide();
	  
	    //hide labour not invoiced
	  $('th[class="field_1150"]').hide();
    $('td[class*="field_1150"]').hide();
	  
	    //hide prepick
	  $('th[class="field_914"]').hide();
    $('td[class*="field_914"]').hide();
	  
	    //hide ccrecov + Diag
	  $('th[class="field_1046"]').hide();
    $('td[class*="field_1046"]').hide();
	  
	    //hide ccrecov
	  $('th[class="field_896"]').hide();
    $('td[class*="field_896"]').hide();
	  
	    //hide ccdiag
	  $('th[class="field_983"]').hide();
    $('td[class*="field_983"]').hide();
	  
	    //hide blue light
	  $('th[class="field_984"]').hide();
    $('td[class*="field_984"]').hide();
	  
	    //hide back order status
	  $('th[class="field_1472"]').hide();
    $('td[class*="field_1472"]').hide();
	  
	    //hide repeat repair
	  $('th[class="field_1140"]').hide();
    $('td[class*="field_1140"]').hide();
	  
	    //hide c/d
	  $('th[class="field_1139"]').hide();
    $('td[class*="field_1139"]').hide();

	    //hide courtesy car
	  $('th[class="field_1137"]').hide();
    $('td[class*="field_1137"]').hide();
	  
	    //hide Customer Waiting
	  $('th[class="field_1136"]').hide();
    $('td[class*="field_1136"]').hide();
	  
	    //hide road test
	  $('th[class="field_447"]').hide();
    $('td[class*="field_447"]').hide();
	  
	    //hide loan car status
	  $('th[class="field_1158"]').hide();
    $('td[class*="field_1158"]').hide();
	  
	  //hide Labour complete
	  $('th[class="field_1681"]').hide();
    $('td[class*="field_1681"]').hide();
	  
	  //hide parts time intially in stock
	  $('th[class="field_1243"]').hide();
    $('td[class*="field_1243"]').hide();
	  
	   //hide parts/labour complete
	  $('th[class="field_1717"]').hide();
    $('td[class*="field_1717"]').hide();
	  
	   //hide parts ave, labour incomplete
	  $('th[class="field_1791"]').hide();
    $('td[class*="field_1791"]').hide();
	  
	    //hide Parts all here v2 ( parts available - ready to invoice)
	    $('th[class="field_1876"]').hide();
    $('td[class*="field_1876"]').hide();
	  
    //This part is for column headers
    //Column header
    $('th[class="field_1108"]').attr('title','F = First Clocked Date L = Last Clocked Date');
    $('th[class="field_982"]').attr('data-tooltip','Medkit = CCDIAG Truck = CCRECOV');
    $('th[class="field_982"]').addClass('tooltip-bottom')
 $('th[class="field_1022"]').attr('title','Time Allowed For jobs NOT Completed');
	   $('th[class="field_1021"]').attr('title','Time Taken For Jobs NOT completed');
	  $('th[class="field_1111"]').attr('title','No of Days Since Checked In');

    if ($('div[class="kn-table kn-view view_596"]')){
      let rows = $('div[class="kn-table kn-view view_596"] table tr');
      console.log('rows',rows.length);
      for (i = 1; i < rows.length; i++) {
        let currentRow = rows[i];
        const createClickHandler = function(row) {
          return function() {
            var cell = row.id;
            console.log('cell',cell);
            callPostHttpRequest("https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8", {"Record ID":cell, "Scenario":"vehicle customer look up" },"Aftersales- update individual LIVE WIPS 'touched today' and UPDATE Parts & Labour v4");
          };
        };
        if (currentRow.id!==''){
          currentRow.children[3].onclick = createClickHandler(currentRow);
        }
      }
    }

    //move icons
    if ($('div[class="kn-table kn-view view_596"]')){
      let rows = $('div[class="kn-table kn-view view_596"] table>tbody>tr[id]');
      for (i = 0; i < rows.length; i++) {
        $('div[id="view_596"] table>tbody>tr[id]').eq(i).find('span[class="col-9"]>a').appendTo($('div[id="view_596"] table>tbody>tr[id]').eq(i).find('span[class="col-9"]').parent())
        $('div[id="view_596"] table>tbody>tr[id]').eq(i).find('span[class="col-7"]>a').appendTo($('div[id="view_596"] table>tbody>tr[id]').eq(i).find('span[class="col-7"]').parent())
      }
    }
  });
//hide vin from last clocked vs invoice table
  $(document).on('knack-view-render.view_244', function (event, view, data) {
	  
	    $('th[class="field_622"]').hide();
    $('td[class*="field_622"]').hide();
});

  //Wip Management - Customer No Show 
  $(document).on('knack-view-render.view_973', function (event, view, data) {

	  //hide VIN from table
	    $('th[class="field_73"]').hide();
    $('td[class*="field_73"]').hide();
	  	  //hide reg
	  $('th[class="field_31"]').hide();
    $('td[class*="field_31"]').hide();
	  
	  //hide wip num
	  $('th[class="field_441"]').hide();
    $('td[class*="field_441"]').hide();
	  
	  //hide account num
	  $('th[class="field_756"]').hide();
    $('td[class*="field_756"]').hide();	  
	
	
   });



// ----------  Refresh Customer Incident Form table every 60 seconds but not the page itself  ---------- //
// Refresh Virtual Reception table on Pre Visit Page  

$(document).on('knack-scene-render.scene_91', function(event, scene) {
  refreshWithData('1188', 'TITLE', 'TEXT $field_351', 'field_1518');
});


//Recall Recheck Spinner on Vehicle Checkin

$(document).on("knack-scene-render.scene_267", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_1189', //recall-recheck
          views:['905']
      }
    ]
    sceneRefresh(refreshData);
  });


// AFTERSALERS CHECK IN PROCESS
  // --- Aftersales vehicle check-in ---
$(document).on('knack-view-render.view_735', function(event, view) {
  //get the vin value from the table
 //const vinNumber = $(".col-2").text().trim()
 //send a http request with the vin an record id
/*
 const triggerRecord = (event2) => {
  console.log('webhook call',event2.view.app_id,vinNumber)
   callPostHttpRequest("https://hook.eu1.make.celonis.com/a5dm1fsf5mjyar2wjno8qjb2grjuj1nf", {"VIN": vinNumber },"Aftersales- will triger during vehicle check-in");
 }
 //add an event listner to the arrow table element
 $(".fa-wrench").on("click", triggerRecord);
*/
 if ($('div[class="kn-view kn-table view_735"]')){
  let rows = $('div[class="kn-view kn-table view_735"] table tr');
  for (i = 1; i < rows.length; i++) {
    let currentRow = rows[i];
    const createClickHandler = function(row) {
      return function() {
        var cell = row.id;
        let vin = row.querySelector('.col-2').innerText;
        console.log('rowId',cell, 'vin',vin);
        callPostHttpRequest("https://hook.eu1.make.celonis.com/a5dm1fsf5mjyar2wjno8qjb2grjuj1nf", {"Record ID":cell, "VIN": vin},"Aftersales- will triger during vehicle check-in");
      };
    };
    currentRow.children[6].onclick = createClickHandler(currentRow);
  }
}
});

//******* Live Character Count on Aftersales Vehicle Check In for WIP Notes Tab *******
$(document).on("knack-view-render.view_736", function(event, view, data) {
$( document ).ready(function() {
$(".kn-form.kn-view.view_736 form #field_1766")
.after( "<p class='typed-chars'>0 out of 120 Characters</p>" );

$(".kn-form.kn-view.view_736 form #field_1766").on('input',function(e){
var $input = $(this);
$input.siblings('.typed-chars').text($input.val().length + " out of 120 Characters");
});
});
});

// Refresh the Vehicle Check In Status Table       


$(document).on('knack-scene-render.scene_94', function(event, scene) {
 recursivecallscene_94();
});

function recursivecallscene_94(){
 setTimeout(function () { if($("#view_1337").is(":visible")==true){ Knack.views["view_1337"].model.fetch();recursivecallscene_94();} }, 10000);
}

// ----------  Refresh Aftersales Customer Exit Survey Results table every 60 seconds but not the page itself  ---------- //

$(document).on('knack-scene-render.scene_148', function(event, scene) {
 recursivecallscene_148();
});

function recursivecallscene_148(){
 setTimeout(function () { if($("#view_423").is(":visible")==true){ Knack.views["view_423"].model.fetch();recursivecallscene_148();} }, 100000);
}

// Exit Survey E-mails webhook to trigger – 
$(document).on('knack-form-submit.view_307', function(event, view, data) { 
    let createData = {"Record ID":data.id};
    callPostHttpRequest("https://hook.integromat.com/a7w9c122du5khow3a9ufyoezq7zdnh0x",deleteEmpty(createData),"Aftersales - Exit Survey Email from Tablet");    
  });

// ------------ Refresh Aftersales Wip Management Table every 20 mins but not the page itself -----------------------//
$(document).on('knack-scene-render.scene_152', function(event, scene) {
 recursivecallscene_152();
});

function recursivecallscene_152(){
 setTimeout(function () { if($("#view_596").is(":visible")==true){ Knack.views["view_596"].model.fetch();recursivecallscene_152();} }, 1200000);
}

// Refresh the Parts Hubs Pre Pick List         

$(document).on('knack-scene-render.scene_340', function(event, scene) {
 recursivecallscene_340();
});

function recursivecallscene_340(){
 setTimeout(function () { if($("#view_947").is(":visible")==true){ Knack.views["view_947"].model.fetch();recursivecallscene_340();} }, 300000);
}

//Trigger failed Quality check (QC) emails to workshop controller/ manager

$(document).on('knack-form-submit.view_1006', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/2tfc5ujqwtit3x3r60it41o6vmczrd0t", {"Record ID":data.id},"Failed Quality Check (QC)")
});

//Trigger failed Quality check (QC) emails to workshop controller/ manager

$(document).on('knack-form-submit.view_1182', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/2tfc5ujqwtit3x3r60it41o6vmczrd0t", {"Record ID":data.id},"Failed Quality Check (QC)")
});

//Trigger failed Quality check (QC) emails to workshop controller/ manager

$(document).on('knack-form-submit.view_1260', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/2tfc5ujqwtit3x3r60it41o6vmczrd0t", {"Record ID":data.id},"Failed Quality Check (QC)")
});

//Trigger failed Quality check (QC) emails to workshop controller/ manager

$(document).on('knack-form-submit.view_1261', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/2tfc5ujqwtit3x3r60it41o6vmczrd0t", {"Record ID":data.id},"Failed Quality Check (QC)")
});

// Trigger Update To VR (Virtual Reception) Status

$(document).on('knack-form-submit.view_1177', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/3b7aqxlblay6r5egi5rev56ql8qiy4g2", {"Record ID":data.id},"Aftersales VR Update")
});

// Trigger When VR (Virtual Reception) Message Manually Added From Aftersales App

$(document).on('knack-form-submit.view_1180', function(event, view, data) {
  callPostHttpRequest("https://hook.integromat.com/f1k56q7sd97mlqn37v37y9s759it9ghn", {"Record ID":data.id},"Aftersales VR New Message")
});

//Refresh Virtual Reception table on Vehicle lookup page         

$(document).on('knack-scene-render.scene_20', function(event, scene) {
  refreshWithData('1168', 'TITLE', 'TEXT $field_351', 'field_1518');
 });

 $(document).on('knack-view-render.view_1168', function(event, view) {
  if (Notification.permission !== 'granted') {
    const para = document.createElement("p");
    para.classList.add('label');
    para.classList.add('kn-label');
    para.style = 'color:red;';
    para.setAttribute("id", "enableDesktopNotif");
    para.innerHTML = "To enable Desktop Pop-Up Notifications when new VR Messages appear, please go to your Account Settings and click “Allow” Notifications";

    const element = document.querySelector("div[id='view_1168']");
    element.appendChild(para);
  }
 });


// Refresh Virtual Reception table on Vehicle Checkout Page        

$(document).on('knack-scene-render.scene_95', function(event, scene) {
  refreshWithData('1189', 'TITLE', 'TEXT $field_351', 'field_1518');
});

// Refresh Virtual Reception table on Post Visit Page         

$(document).on('knack-scene-render.scene_90', function(event, scene) {
  refreshWithData('1190', 'TITLE', 'TEXT $field_351', 'field_1518');
});



  // --- Aftersales vehicle look up 'vehicle on site' ---
$(document).on('knack-view-render.view_1223', function(event, view) {
  //get the vin value from the table
 const vinNumber = $(".col-5").text().trim()
 //send a http request with the vin an record id

 /*const triggerRecord = (event2) => {
  console.log(event2.taget);
  console.log("Test106")
   console.log(event2.view.app_id)
   console.log(event2.view.Knack)
   let k = Object.assign({},event2.view.Knack);
   console.log(event2.view.Knack.hash_parts)
   console.log(k.hash_parts)
   console.log(event2.view.Knack.scene_hash)
   console.log(event2.view.Knack.google_loading)
   console.log(event2.view.Knack.domain)
  
   callPostHttpRequest("https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8", {"Record ID":event2.view.app_id, "VIN": vinNumber, "Scenario":"vehicle customer look up" },"Aftersales- update individual LIVE WIPS 'touched today' and UPDATE Parts & Labour v4");
 }
    //add an event listner to the arrow table element
    $(".fa-search").on("click", triggerRecord);*/

 
 // trigger a webhook from a action link - Aftersales - update live individual wip from Reg & Status Lookup for Vehicles Onsite

    if ($('div[class="kn-view kn-table view_1223"]')){
      let rows = $('div[class="kn-view kn-table view_1223"] table tr');
      for (i = 1; i < rows.length; i++) {
        let currentRow = rows[i];
        const createClickHandler = function(row) {
          return function() {
            var cell = row.id;
            console.log('cell',cell);
            callPostHttpRequest("https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8", {"Record ID":cell, "VIN": vinNumber, "Scenario":"vehicle customer look up" },"Aftersales- update individual LIVE WIPS 'touched today' and UPDATE Parts & Labour v4");
          };
        };
        currentRow.children[5].onclick = createClickHandler(currentRow);
      }
    }
	});


//hide record id from vehicle look up table 
 $(document).on('knack-view-render.view_1223', function (event, view, data) {
	  
	    $('th[class="field_1601"]').hide();
    $('td[class*="field_1601"]').hide();
});


  // --- Aftersales Virtual reception update job card ---
$(document).on('knack-view-render.view_1169', function(event, view) {
	//hide record id
	  $('th[class="field_1601"]').hide();
    $('td[class*="field_1601"]').hide();
	
  //get the vin value from the table
/* const vinNumber = $(".col-8").text().trim()
 
     if ($('div[class="kn-view kn-table view_1169"]')){
      let rows = $('div[class="kn-view kn-table view_1169"] table tr');
      for (i = 1; i < rows.length; i++) {
        let currentRow = rows[i];
        const createClickHandler = function(row) {
          return function() {
            var cell = row.id;
            console.log('cell',cell);
            callPostHttpRequest("https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8", {"Record ID":cell, "VIN": vinNumber, "Scenario":"vehicle customer look up" },"Aftersales- update individual LIVE WIPS 'touched today' and UPDATE Parts & Labour v4");
          };
        };
        currentRow.children[5].onclick = createClickHandler(currentRow);
      }
    }
    */
	});
 


//trigger update live wip from VR 
$(document).on('knack-form-submit.view_1229', function(event, view, data) { 
    
    try{
        

        let commandURL = "https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8";
        let dataToSend = JSON.stringify({"Record ID":data.id});

        var rData = $.ajax({
            url: commandURL,
            type: 'POST',
            contentType: 'application/json',
            data: dataToSend,
            async: false
        }).responseText;
    }catch(exception){
        sendErrorToIntegromat(exception, "Aftersales - trigger update live wip from VR");
    }
});

//WIP Refresh Spinner upon search

$(document).on("knack-scene-render.scene_105", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_987', //Autoline WIP Details
          views:['1175']
      }
    ]
    sceneRefresh(refreshData);
  });

//trigger update live wip from wip management reminders table
$(document).on('knack-view-render.view_1212', function (event, view, data) {

	    if ($('div[class="kn-view kn-table view_1212"]')){
      let rows = $('div[class="kn-view kn-table view_1212"] table tr');
      for (i = 1; i < rows.length; i++) {
        let currentRow = rows[i];
        const createClickHandler = function(row) {
          return function() {
            var cell = row.id;
            console.log('cell',cell);
            callPostHttpRequest("https://hook.eu1.make.celonis.com/a61ljkqf5jw5d643274gixjtqdx5hgo8", {"Record ID":cell, "VIN": vinNumber, "Scenario":"vehicle customer look up" },"Aftersales- update individual LIVE WIPS 'touched today' and UPDATE Parts & Labour v4");
          };
        };
        currentRow.children[4].onclick = createClickHandler(currentRow);
      }
    }
	});

//refresh MOT Details in VR piece
$(document).on("knack-scene-render.scene_105", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_1646', //Autoline WIP Details
          views:['1175']
      }
    ]
    sceneRefresh(refreshData);
  });

//manually trigger hub to hub swap
$(document).on('knack-view-render.view_1248', function(event, view) {

	  //get the vin value from the table
 const vinNumber = $(".col-2").text().trim()
 //send a http request with the vin an record id

 const triggerRecord2 = (event2) => {
  console.log("Test106")
   console.log(event2.view.app_id)
   console.log(event2.view.Knack)
   let k = Object.assign({},event2.view.Knack);
   console.log(event2.view.Knack.hash_parts)
   console.log(k.hash_parts)
   console.log(event2.view.Knack.scene_hash)
   console.log(event2.view.Knack.google_loading)
   console.log(event2.view.Knack.domain)
  
   callPostHttpRequest("https://hook.eu1.make.celonis.com/311tdiov4qlsg7g84pvialsggdawolta", {"Record ID":event2.view.app_id, "VIN": vinNumber },"Parts - Hub to hub v2");
 }
 //add an event listner to the arrow table element
 $(".fa-exchange").on("click", triggerRecord2)
});

// ------------ Refresh Hub to Hub transfer every 2 mins but not the page itself -----------------------//
$(document).on('knack-scene-render.scene_439', function(event, scene) {
 recursivecallscene_439();
});

function recursivecallscene_439(){
 setTimeout(function () { if($("#view_1248").is(":visible")==true){ Knack.views["view_1248"].model.fetch();recursivecallscene_439();} }, 120000);
}


// ------------ Refresh WIP Reporting status but not the page itself -----------------------//
$(document).on('knack-scene-render.scene_152', function(event, scene) {
 recursivecallscene_152();
});

function recursivecallscene_152(){
 setTimeout(function () { if($("#view_1285").is(":visible")==true){ Knack.views["view_1285"].model.fetch();recursivecallscene_439();} }, 120000);
}

$(document).on('knack-view-render.view_1297', function (event, view, data) {
  $('div[class*="field_1687"]>div[class="kn-detail-body"]>span').hide();
  var sound      = document.createElement('audio');
  sound.id       = 'audio-player';
  sound.controls = 'controls';
  sound.src      = $('div[class*="field_1687"]>div[class="kn-detail-body"]>span').text();
  document.querySelector('div[class*="field_1687"]').appendChild(sound);
})

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

$(document).on('knack-scene-render.any', function(event, scene) {
   //**************************************************************************************************************
//****** Hynek's Code to check version on user Browser with what is stored in Apify. If version is different, 
//Browser will refresh and add new version to Cookies. Added 01/12/2020 ******************************************

  	//version check on Apify
  	var versionTimeCheck = readCookie('RDDigitalAftersalesVersionTime');
  	var versionC = readCookie('RDDigitalAftersalesVersion');
  	console.log('versionC',versionC);
    if (!versionC){
      	console.log('set cookie');
      	createCookie('RDDigitalAftersalesVersion',appVersionID,365);
    }
    
   	if (!versionTimeCheck || (Date.now()-versionTimeCheck)>600000){ 
      createCookie('RDDigitalAftersalesVersionTime',Date.now(),365);
      console.log('check version');
      var appVersionID = getVersionFromApify();
      if (versionC!==appVersionID && appVersionID!==''){
          console.log('not same');
          createCookie('RDDigitalAftersalesVersion',appVersionID,365);
          window.location.reload(false);
      }
    }
  
  //version check every day
  var versionRefreshTime = readCookie('RDDigitalAftersalesVersionRefreshTime');
  if (!versionRefreshTime){
    createCookie('RDDigitalAftersalesVersionRefreshTime',Date.now(),1);
  } else {
    var todayS = new Date(Date.now());
    todayS = todayS.toDateString();
    var versionRefreshTimeS = new Date(parseInt(versionRefreshTime));
    versionRefreshTimeS = versionRefreshTimeS.toDateString();
    if (todayS!==versionRefreshTimeS){
      console.log('first day');
      createCookie('RDDigitalAftersalesVersionRefreshTime',Date.now(),1);
      window.location.reload(false);
    }
  }
});

