//**Used Deal Files - View Additional Product Certificates Uploaded
$(document).on('knack-form-submit.view_3324', function(event, view, data) { 
    
    try{
    
        let commandURL = "https://hook.integromat.com/3umnr247redycud7ind5l6xbge6lhq4k";
        let dataToSend = JSON.stringify({"Record ID":data.id , "Form":"Used Deal Files - View Additional Product Certificates Uploaded"});

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
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Used Deal Files - View Additional Product Certificates Uploaded",
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
