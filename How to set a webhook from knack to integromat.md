//Please use the code bellow if there will never be an empty field as there is not code to deal with blank fields

    // Used Deal File TRIGGER INTEGROMAT UPON – 
    $(document).on('knack-form-submit.view_2966', function(event, view, data) { 
        let createData = {"Knack Deal File UID":data.id};
        callPostHttpRequest("WEBHOOK URL",deleteEmpty(createData),"THE SCENARIO NAME");    
      });

========================================================================================================================================================================

