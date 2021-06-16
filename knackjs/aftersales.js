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

var loginSceneNames = ["scene_20"]; ///add view numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    //console.log(selector_scene)
    submitUserLoginForm();
  });
}

$(document).on('knack-view-render.any', function (event, view, data) {
  //  ---------Auto Capitalise Regestration input-------------
  $('input#field_31').keyup(function() {
      this.value = this.value.toUpperCase();
  });
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
function sceneRefresh(refreshData, startTime = null, runCounter = 1){
    console.log('sceneRefresh');
    try {
      if (!startTime){
        startTime = new Date();
        //console.log('startTime', startTime);
      } else {
        //console.log('elapsed',new Date() - startTime);
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
          }
      }
      if (recheck && (new Date() - startTime)<240000){
          console.log('needs recheck')
          setTimeout(function(){
              sceneRefresh(refreshData, startTime, runCounter + 1);
          }, (runCounter<3?1500:2500));
      } else if ((new Date() - startTime)>240000){
        console.log('ending refresh without all done');
      } else {
        if (runCounter!==1){
          console.log('everything checked, reload views just for sure');
          for (one of refreshData){
            if (!one.runAfterDone){
              for (oneView of one.views){
                refreshView(oneView, true);
              }
            }
            /*
            if (one.runAfter){
              setTimeout(one.runAfter,300);
            }*/
          }
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

function generateTyres(){
  try {
    console.log('GenerateTyres');
    let tyresJSON = JSON.parse(Knack.views['view_119'].model.attributes['field_250']);
    tyresJSON = tyresJSON.filter(function(el){
      return el['a:StockPolicy'][0] === 'ACTIVE' && el['a:Winter'][0] === 'N'
    })
    console.log('tyresJSON.length filtered',tyresJSON.length);
    tyresJSON = tyresJSON.sort(function(a,b){
      return (a['a:TotalFittedRetailPriceIncVAT'][0] < b['a:TotalFittedRetailPriceIncVAT'][0]?1:(a['a:TotalFittedRetailPriceIncVAT'][0] > b['a:TotalFittedRetailPriceIncVAT'][0]?-1:0));
    })
    let outputTables = [{name:'Premium'},{name:'Medium'},{name:'Budget'}];
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
  sectionCenter.appendChild(document.getElementById('view_97'));
  sectionCenter.appendChild(document.getElementById('view_114'));
  sectionCenter.appendChild(document.getElementById('view_121'));
  sectionCenter.appendChild(document.getElementById('view_122'));
  sectionCenter.appendChild(document.getElementById('view_117'));
  sectionRight.appendChild(document.getElementById('view_96'));
  sectionRight.appendChild(document.getElementById('view_133'));
  sectionRight.appendChild(document.getElementById('view_115'));
}

$(document).on("knack-scene-render.scene_24", function(event, scene, data) {
  formatScene24();
  setTimeout(function(){
      let refreshData = [
        {
            mainField : 'field_278', //Autoline - type of bussines - first Autoline save
            views:['95','97']   
        },{
          mainField : 'field_318', //Autoline - vehicle summary - second Autoline save
          views:['97','95','98','96'],
          //runAfter : createServiceScheduleClick
        },{
          mainField : 'field_312', //EMAC - service plan Summary = Service plan
          views:['131']
        },{
          mainField : 'field_247', //Tyres - Front = Stapletons
          views:['122'],
          //runAfter : generateTyres
        },{
          mainField : 'field_302', //VHC - exists = VHC
          views:['115']
        },{
          mainField : 'field_70', //Recalls Oustanding
          views:['121']
        },{
          mainField : 'field_316', //Autoline - is email valid - last Autoline save
          views:['95']   
        },{
          mainField : 'field_325', //Autoline - service visits tooltips
          views:['133'],
          runAfter : serviceVisitsTooltips
      }
      ]
      sceneRefresh(refreshData);
  }, 100);
});

let shownTooltipId = null;
function serviceVisitsTooltips(){
  $('div[id*="tooltip"]').each(function(){
    $(this).attr("style","background: white; position: fixed; display:none;");
  });
  $('table[id="serviceVisitsTable"] tr').on("mouseleave", function (e) {
    console.log('HIDE AFTER LEAVE')
    $('div[id="tooltip_'+shownTooltipId+'"]').hide();
  });

  $('table[id="serviceVisitsTable"]').on("mousemove", function (e) {
      let partOfTable = document.elementFromPoint(e.pageX, e.pageY);
      let trUnderMouse = null;
      if (partOfTable.nodeName==='TD'){
        trUnderMouse = partOfTable.parentElement;
      }
      if (partOfTable.nodeName==='TR'){
        trUnderMouse = partOfTable;
      }
      if (trUnderMouse && trUnderMouse.id){
        $('div[id="tooltip_'+trUnderMouse.id+'"]').show();
        $('div[id="tooltip_'+trUnderMouse.id+'"]').offset({ left: e.pageX+10, top: e.pageY });
        if (shownTooltipId !== trUnderMouse.id && shownTooltipId !== null){
            $('div[id="tooltip_'+shownTooltipId+'"]').hide();
        }
        shownTooltipId = trUnderMouse.id;
      }
  });
}

$(document).on("knack-scene-render.scene_28", function(event, scene, data) {
  let refreshData = [
    {
        mainField : 'field_72', //Service Schedule
        views:['118']
    }
  ]
  sceneRefresh(refreshData);
});

$(document).on("knack-scene-render.scene_29", function(event, scene, data) {
    let refreshData = [
      {
          mainField : 'field_250', //Tyres
          views:['119'],
          runAfter : generateTyres 
      }
    ]
    sceneRefresh(refreshData);
  //generateTyres();
});

$(document).on("knack-scene-render.scene_22", function(event, scene, data) {
    setTimeout(function(){
        let refreshData = [
          {
              mainField : 'field_240', //VHC - last mileage = VHC
              views:['78']   
          },{
            mainField : 'field_72', //Service schedule table = Service schedule and recall - service schedule save
            views:['82'],
            runAfter : createServiceScheduleClick
          },{
            mainField : 'field_307', //Owner name = Autoline - first save of basic details 
            views:['100']
          },{
            mainField : 'field_278', //Customer type of bussiness = Autoline - save of complete details
            views:['84','91','75','100','92'] 
          },{
            mainField : 'field_247', //Tyres - Front = Stapletons
            views:['88'],
            runAfter : generateTyres
          },{
            mainField : 'field_30', //MOT expiry date = DVLA, MOT, Service Plan
            views:['81','92','76','80']
        }
        ]
        sceneRefresh(refreshData);
    }, 100);
  });

  $(document).on('knack-form-submit.view_71', function(event, view, data) { 
    let commandURL = "https://hook.integromat.com/53yx2tuy820lvzuobdqex8jem2utgwil" ;
    let dataToSend = Object.assign({"source":"NEWRECORD"}, data); 
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

  $(document).on('knack-view-render.view_96', function (event, view, data) {
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

  
  