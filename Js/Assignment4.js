function MenuChoice(selection)
{
    
    document.getElementById("customerlist").style.visibility = "hidden";
    document.getElementById("createcustomer").style.visibility = "hidden";
    document.getElementById("deletecustomer").style.visibility = "hidden";
    
    switch (selection)
    {
        case "customerlist":
            document.getElementById("customerlist").style.visibility = "visible";
            GetAllCustomers();
            break;
        case "createcustomer":
            document.getElementById("createcustomer").style.visibility = "visible";
            break;
        case "deletecustomer":
            document.getElementById("deletecustomer").style.visibility = "visible";
            break;
        case "None":
            break;
        default:
            alert("Please select a different menu option");
    }
}

function GetAllCustomers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function GenerateOutput(result)
    {
            var display ="<table><tr><th></th><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
            var count = 0;
            var customername = "";
            var customerid = "";
            var customercity = "";
            for (count = 0; count < result.GetAllCustomersResult.length; count ++)
            {
               customerid = result.GetAllCustomersResult[count].CustomerID;
               customername = result.GetAllCustomersResult[count].CompanyName;
               customercity = result.GetAllCustomersResult[count].City;
                              
               display += '<tr><td><button onclick="DeleteCustomer(' + "'" + customerid + "')" + '">Delete This Customer</button></td><td>' + customerid + "</td><td>" + customername + "</td><td>" + customercity + "</td></tr>"; 
            }
            display +="</table>";
            document.getElementById("customerinfo").innerHTML = display;
            
    }
}

function DeleteCustomer(customerid)
{
   var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    url += customerid;

    var confirmdeletion = confirm("Do you want to delete this Customer ID?\nCustomer ID:  " + customerid);
    
    if (confirmdeletion)
    {
      
        objReq.onreadystatechange = function() {
            if (objReq.readyState == 4 && objReq.status == 200) {
                var test1 = objReq.responseText;
                var output = JSON.parse(objReq.responseText);
                DeleteCustomerOutput(output);
            }
            if (objReq.readyState == 4 && objReq.status != 200) {
                alert("There was an error sending the request!  readyState = " +
                    objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
            }
        }
    
    
        objReq.open("GET", url, true);
        objReq.send();
    } 
}


function DeleteCustomerOutput(outputResult) {
    
    var displayText = "";
    
    if (outputResult.DeleteCustomerResult.WasSuccessful == 1) {
        displayText = alert("The customer was deleted successfully!");
        
        
    }
    else
    {
        displayText = alert("There was an error deleting the customer.\n"+ "Error Message: " + outputResult.DeleteCustomerResult.Exception);
        
    }
    MenuChoice("deletecustomer");
    MenuChoice("customerlist");
     
    
}


function AddCustomerbyInput()
{
 var objRequest = new XMLHttpRequest();
 var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";


 var customerid = document.getElementById("customerid1").value;
 var customername = document.getElementById("customername1").value;
 var customercity = document.getElementById("customercity1").value;
 
 
 var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'","City":"' + customercity + '"}';


 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
    {
    var result = JSON.parse(objRequest.responseText);
    OperationResult(result);
    }
 }


 objRequest.open("POST", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send(newcustomer);

}
function OperationResult(output)
{
if (output.WasSuccessful == 1)
    {
    alert("The operation was successful!");
    MenuChoice("customerlist");
    }
 else
    {
    alert("The operation was not successful!\n" + output.Exception);
    MenuChoice("customerlist");
    }
}




function DeleteCustomerbyInput()
{
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    
    var customerid2 = document.getElementById("customerid2").value;
       
    if (customerid2 == "") {
        alert("Please enter a customer ID.");
        document.getElementById("customerid2").focus();
        return;
    }
    
    url += customerid2;

    var confirmdeletion = confirm("Do you want to delete this Customer ID?\nCustomer ID:  " + customerid2);
    
    if (confirmdeletion)
    {
      
        objReq.onreadystatechange = function() {
            if (objReq.readyState == 4 && objReq.status == 200) {
                var test1 = objReq.responseText;
                var output = JSON.parse(objReq.responseText);
                DeleteCustomerbyInputOutput(output);
            }
            if (objReq.readyState == 4 && objReq.status != 200) {
                alert("There was an error sending the request!  readyState = " +
                    objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
            }
        }
    
    
        objReq.open("GET", url, true);
        objReq.send();
    } 
}


function DeleteCustomerbyInputOutput(outputResult) {
    
    var displayText = "";
    
    if (outputResult.DeleteCustomerResult.WasSuccessful == 1) {
        displayText = alert("The customer was deleted successfully!");
        document.getElementById("customerid2").value = "";
        document.getElementById("customerid2").focus();
        MenuChoice("customerlist");
    }
    else
    {
        displayText = alert("There was an error deleting the customer."+ '<br>'+ "Error Message: " + outputResult.DeleteCustomerResult.Exception);
        document.getElementById("customerid2").focus();
    }
    
    
}

