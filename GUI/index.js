(function () {

	var contractaddress = "0x86C9D3aBF13D25CED87C0D00331667AC44c04a89";
	//var contractaddress = "";
	var server = "http://35.209.171.26:5000";
	var startgroundtransactionid = "";
	
	function getcontract(transactionid){
		var JSONObject = {
            "transactionid": transactionid,
         };
		
		$.ajax({
            url: server + "/getcontract",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.contractaddress == "-1"){
					$("#txtMessage").html("Contract not found. Probably still getting written to the block. Try again in a while.");
				}
				else {
					$("#txtMessage").html("Contract Executed. Contract ID: " + arr.contractaddress);
					contractaddress = arr.contractaddress;
					getstartgroundtime(contractaddress);
					getcallcount(contractaddress);
					getmovecount(contractaddress);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}
	
	function getstartgroundtime(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/startgroundtimestamp",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.startgroundtimestamp == "-1"){
					$("#txtMessage").html("Start Ground Timing not found. Do you have a running smart contract?");
				}
				else {
					$("#txtStartGround").html(arr.startgroundtimestamp);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}

	function getendgroundtime(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/endgroundtimestamp",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.startgroundtimestamp == "-1"){
					$("#txtMessage").html("End Ground Timing not found. Do you have a running smart contract?");
				}
				else {
					$("#txtEndGround").html(arr.endgroundtimestamp);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}
	
	function getcallcount(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/getcallcount",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.callcount == "-1"){
					$("#txtMessage").html("Call Count not found. Do you have a running smart contract?");
				}
				else {
					$("#txtCallForHelp").html(arr.callcount);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}

	function getmovecount(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/getmovecount",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.movecount == "-1"){
					$("#txtMessage").html("Move Count not found. Do you have a running smart contract?");
				}
				else {
					$("#txtMoved").html(arr.movecount);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}

	function endground(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/endground",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.transactionid == "-1"){
					$("#txtMessage").html("Cannot End Ground. Do you have a running smart contract?");
				}
				else {
					$("#txtMessage").html("Contract Executed. Transaction ID: " + arr.transactionid);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}

	function reground(contractaddress){
		var JSONObject = {
            "contractaddress": contractaddress,
         };
		
		$.ajax({
            url: server + "/reground",
            type: 'POST',
            dataType: 'json',
			data: JSONObject,
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.transactionid == "-1"){
					$("#txtMessage").html("Cannot Restart Ground. Do you have a running smart contract?");
				}
				else {
					getcallcount(contractaddress);
					getmovecount(contractaddress);
					getstartgroundtime(contractaddress);					
					getendgroundtime(contractaddress);
					$("#txtMessage").html("Contract Executed. Transaction ID: " + arr.transactionid);
				}
            },
            error: function () {
                alert("Server is down");
            }
        });	
	}
	
	function startground(){
		startgroundtransactionid = "";
		contractaddress = "";
    	$.ajax({
            url: server + "/startground",
            type: 'POST',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded",
            success: function (arr) {
				if (arr.transactionid == "-1"){
					$("#txtMessage").html("Contract not Executed. Are you pressing too fast?");
				}
				else {
					startgroundtransactionid = arr.transactionid;
					$("#txtMessage").html("Contract Executed. Transaction ID: " + arr.transactionid);					
				}
            },
            error: function () {
                alert("Server is down");
            }
        });
    }

    $(document).ready(function () {
    	$("#btnStartGround").click(function() {
  			startground();
		});   

		$("#btnEndGround").click(function() {
			if (contractaddress !== ""){
				endground(contractaddress);
			}
			else {
				$("#txtMessage").html("No contract. Have you Started Grounding the Kid?");				
			}
		}); 
		
		$("#btnGetContract").click(function() {
			if (startgroundtransactionid !== ""){
				getcontract(startgroundtransactionid);
			}
			else {
				$("#txtMessage").html("No Transaction. Have you Started Grounding the Kid?");
			}
		}); 

		$("#btnRestartGround").click(function() {
			if (contractaddress !== ""){
				reground(contractaddress);
			}
			else {
				$("#txtMessage").html("No contract. Have you Started Grounding the Kid?");				
			}			
		});
		
		$("#btnRefresh").click(function() {
			if (contractaddress !== ""){
				getcallcount(contractaddress);
				getmovecount(contractaddress);
				getstartgroundtime(contractaddress);
				getendgroundtime(contractaddress);
			}
			else {
				$("#txtMessage").html("No contract. Have you Started Grounding the Kid?");
			}
		}); 
		
    });
} )();
	