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
    if (!url.indexOf('digital-aftersales?') === 0) {
        alert("Invalid URL");
        return;
    }

    var params = new URLSearchParams( window.location.search);
    
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

var loginSceneNames = ["scene_20"]; ///add view numbers as necessary

loginSceneNames.forEach(functionName);
function functionName(selector_scene){
  $(document).on("knack-scene-render." + selector_scene, function(event, scene, data) {
    //console.log(selector_scene)
    submitUserLoginForm();
  });
}

function lookupSceneRefresh(){
    console.log('lookupSceneRefresh');
    let refreshData = [
        //mainField needs to be on first View in array
        {
            mainField : 'field_4',
            views:['75','78']   
        },{
            mainField : 'field_74',
            views:['76']
        }
    ]
    let recheck = false;
    for (one of refreshData){
        console.log(one);
        console.log('main field val',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
        if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
            for (oneView of one.views){
                refreshView(oneView);
            }
            console.log('main field val2',Knack.views['view_'+one.views[0]].model.attributes[one.mainField])
            if (Knack.views['view_'+one.views[0]].model.attributes[one.mainField]===''){
                recheck = true;
            }
        }
    }
    if (recheck){
        console.log('needs recheck')
        setTimeout(function(){
            lookupSceneRefresh();
        }, 2500);
    }
}

function refreshView(viewID){
    console.log('refresh view', viewID)
    const a = {}
    a.success = function () {
        Knack.views['view_'+viewID].render()
    };
    Knack.views['view_'+viewID].model.fetch(a)
}

$(document).on("knack-scene-render.scene_22", function(event, scene, data) {
    console.log('set refresh')
    setTimeout(function(){
        lookupSceneRefresh();
    }, 3000);
  });