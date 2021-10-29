//Please use the code bellow if there will never be an empty field as there is not code to deal with blank fields

$(document).on('knack-form-submit.view_3324', function(event, view, data) { 
    
    try{
    
        let commandURL = "https://hook.integromat.com/3umnr247redycud7ind5l6xbge6lhq4k";
        let dataToSend = JSON.stringify({"Record ID":data.id , "Form":data.field_2694_raw, "Form1":"My text"});

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

========================================================================================================================================================================

//Please use the code bellow if there will be an empty field as there is code to deal with blank fields

$(document).on('knack-form-submit.view_4857', function(event, view, data) { 

    try{

            let commandURL = "https://hook.integromat.com/n04o2rpxiiodil3pf91sn2b6khppbjlx" ;
            var createData = ({"Record ID":data.id,"Reg No":data.field_2694_raw, "Stock ID":data.field_5713_raw, 
                                             "Peugeot Dealer ID":data.field_4161_raw, "Citroen Dealer ID":data.field_4162_raw, 
                                             "DS Dealer ID":data.field_4163_raw, "Vauxhall Dealer ID":data.field_5931_raw, "DID for Used Stock FTP":data.field_4623_raw});
            
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
        let dataToSend = JSON.stringify({"Source":"Javascript error", "Function": "Scenario DESCRIPTION for webhook",
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
