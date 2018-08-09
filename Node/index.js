//JSON Service Libraries
var http    = require('http'),
	express = require('express'),
	parser  = require('body-parser');

//Ethereum Libraries	
var Web3 		= require('web3'),
	util 		= require('ethereumjs-util'),
	tx 			= require('ethereumjs-tx'),
	lightwallet = require('eth-lightwallet');

var txutils = lightwallet.txutils;
var web3 = new Web3(
    new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/<your api key>')
);
var address = '<your wallet address>';
var key = '<your wallet private key>';
var bytecode = '608060405234801561001057600080fd5b506040516020806108f1833981018060405281019080805190602001909291905050508060018190555060008060146101000a81548160ff0219169083600181111561005857fe5b0217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f7ff1e4c6c32bbd541564d15dee3855ad8bc4db23e6ea62912c248ebdc1a802a260405160405180910390a150610818806100d96000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631dc45248146100bf5780633b3a96a2146100ea5780633fdb571f1461011557806360f96a8f1461014257806387cb15f714610199578063a96b2dc0146101c6578063b5e7bc98146101f1578063c19d93fb14610232578063f31fe9821461026b578063f5b828a614610298578063fab1c894146102c3578063fe1bae8314610304575b600080fd5b3480156100cb57600080fd5b506100d4610331565b6040518082815260200191505060405180910390f35b3480156100f657600080fd5b506100ff61033e565b6040518082815260200191505060405180910390f35b34801561012157600080fd5b5061014060048036038101908080359060200190929190505050610344565b005b34801561014e57600080fd5b50610157610452565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a557600080fd5b506101c460048036038101908080359060200190929190505050610477565b005b3480156101d257600080fd5b506101db610563565b6040518082815260200191505060405180910390f35b3480156101fd57600080fd5b5061021c60048036038101908080359060200190929190505050610570565b6040518082815260200191505060405180910390f35b34801561023e57600080fd5b50610247610593565b6040518082600181111561025757fe5b60ff16815260200191505060405180910390f35b34801561027757600080fd5b50610296600480360381019080803590602001909291905050506105a6565b005b3480156102a457600080fd5b506102ad610691565b6040518082815260200191505060405180910390f35b3480156102cf57600080fd5b506102ee60048036038101908080359060200190929190505050610697565b6040518082815260200191505060405180910390f35b34801561031057600080fd5b5061032f600480360381019080803590602001909291905050506106ba565b005b6000600380549050905090565b60025481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561039f57600080fd5b60018060018111156103ad57fe5b600060149054906101000a900460ff1660018111156103c857fe5b1415156103d457600080fd5b816001819055506000600281905550600360006103f191906107a6565b600460006103ff91906107a6565b60008060146101000a81548160ff0219169083600181111561041d57fe5b02179055507f7ff1e4c6c32bbd541564d15dee3855ad8bc4db23e6ea62912c248ebdc1a802a260405160405180910390a15050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d257600080fd5b60008060018111156104e057fe5b600060149054906101000a900460ff1660018111156104fb57fe5b14151561050757600080fd5b60038290806001815401808255809150509060018203906000526020600020016000909192909190915055507fc8f931b28dff413fbbb2f28853f168549714e919ca03e84ec86ce26dc00d949160405160405180910390a15050565b6000600480549050905090565b60038181548110151561057f57fe5b906000526020600020016000915090505481565b600060149054906101000a900460ff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561060157600080fd5b600080600181111561060f57fe5b600060149054906101000a900460ff16600181111561062a57fe5b14151561063657600080fd5b816002819055506001600060146101000a81548160ff0219169083600181111561065c57fe5b02179055507f50a6deeb5311023df215ae0cc091601aa482ceb1bc6de97e5ef59ff38261900560405160405180910390a15050565b60015481565b6004818154811015156106a657fe5b906000526020600020016000915090505481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561071557600080fd5b600080600181111561072357fe5b600060149054906101000a900460ff16600181111561073e57fe5b14151561074a57600080fd5b60048290806001815401808255809150509060018203906000526020600020016000909192909190915055507f182311f07cc2635d7a6c872d130ecce72773943e2cba47b585d7dfc0e4e67ebd60405160405180910390a15050565b50805460008255906000526020600020908101906107c491906107c7565b50565b6107e991905b808211156107e55760008160009055506001016107cd565b5090565b905600a165627a7a723058204891bd4f226a6545a8a31b08ee8ff20f529cff2ada9a5f335f60e10a5be053be0029';
var interface = [ { "constant": true, "inputs": [], "name": "getMoveCount", "outputs": [ { "name": "moveCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "endGroundTimeStamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_timeGround", "type": "uint256" } ], "name": "reGround", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "parent", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_timeMove", "type": "uint256" } ], "name": "move", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCallCount", "outputs": [ { "name": "callCount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "moveTimeStamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "state", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_timeEnd", "type": "uint256" } ], "name": "endGround", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "startGroundTimeStamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "callTimeStamp", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_timeCall", "type": "uint256" } ], "name": "callforhelp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_timeGround", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [], "name": "groundStarted", "type": "event" }, { "anonymous": false, "inputs": [], "name": "groundEnded", "type": "event" }, { "anonymous": false, "inputs": [], "name": "moved", "type": "event" }, { "anonymous": false, "inputs": [], "name": "calledforhelp", "type": "event" } ];

// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.set('port', process.env.PORT || 5000);

// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to Kid Grounder Wrapper</p></body></html>');
});

// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});

//Endpoint: http://127.0.0.1:5000/startground
app.post('/startground', function (req,res) {
	
	var startTx = {
		nonce: web3.toHex(web3.eth.getTransactionCount(address)),
		gasLimit: web3.toHex(800000),
		gasPrice: web3.toHex(20000000000),
		data: '0x' + bytecode + '00000000000000000000000000000000000000000000000000000' + Date.now().toString(16)
	};

	sendStartGroundRaw(startTx, res);
});

function sendStartGroundRaw(rawTx, res) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
			console.log(err);
			var obj = {"transactionid":"-1"};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
        } else {
			console.log(result);
			transactionid = result;  
			var obj = {"transactionid":result};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
        }
    });
}

//Endpoint: http://127.0.0.1:5000/getcontract
app.post('/getcontract', function (req,res) {
	if (typeof req.body.transactionid !== 'undefined'){
		var transactionid = req.body.transactionid;
		try{
			var receipt = web3.eth.getTransactionReceipt(transactionid);
			var obj = {"contractaddress":receipt.contractAddress};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
		}
		catch (err) {
			var obj = {"contractaddress":-1};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));;
		}
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in transaction id'}));
	}
});

//Endpoint: http://127.0.0.1:5000/endground
app.post('/endground', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		try{
			var txOptions = {
				nonce: web3.toHex(web3.eth.getTransactionCount(address)),
				gasLimit: web3.toHex(800000),
				gasPrice: web3.toHex(20000000000),
				to: contractaddress
			}
			var endTx = txutils.functionTx(interface, 'endGround', [Date.now()], txOptions);
			sendTransactionRaw(endTx, res);
		}
		catch (err) {
			console.log(err);
			var obj = {"transactionid":"-1"};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
		}
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/callforhelp
app.post('/callforhelp', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		try{
			var txOptions = {
				nonce: web3.toHex(web3.eth.getTransactionCount(address)),
				gasLimit: web3.toHex(800000),
				gasPrice: web3.toHex(20000000000),
				to: contractaddress
			}
			var endTx = txutils.functionTx(interface, 'callforhelp', [Date.now()], txOptions);
			sendTransactionRaw(endTx, res);
		}
		catch (err) {
			console.log(err);
			var obj = {"transactionid":"-1"};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
		}
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/move
app.get('/move', function (req,res) {
        if (typeof req.query.contractaddress !== 'undefined'){
                var contractaddress = req.query.contractaddress;
                try{
                        var txOptions = {
                                nonce: web3.toHex(web3.eth.getTransactionCount(address)),
                                gasLimit: web3.toHex(800000),
                                gasPrice: web3.toHex(20000000000),
                                to: contractaddress
                        }
                        var endTx = txutils.functionTx(interface, 'move', [Date.now()], txOptions);
                        sendTransactionRaw(endTx, res);
                }
                catch (err) {
                        console.log(err);
                        var obj = {"transactionid":"-1"};
                        res.setHeader('Content-Type', 'application/json');
                        res.status(200).send(JSON.stringify(obj));
                }
        }
        else {
                res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract addres$
        }       
});

//Endpoint: http://127.0.0.1:5000/reground
app.post('/reground', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		try{
			var txOptions = {
				nonce: web3.toHex(web3.eth.getTransactionCount(address)),
				gasLimit: web3.toHex(800000),
				gasPrice: web3.toHex(20000000000),
				to: contractaddress
			}
			var endTx = txutils.functionTx(interface, 'reGround', [Date.now()], txOptions);
			sendTransactionRaw(endTx, res);
		}
		catch (err) {
			console.log(err);
			var obj = {"transactionid":"-1"};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
		}
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

function sendTransactionRaw(rawTx, res) {
    var privateKey = new Buffer(key, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
    '0x' + serializedTx, function(err, result) {
        if(err) {
			console.log(err);
			var obj = {"transactionid":"-1"};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
        } else {
			console.log(result);
			var obj = {"transactionid":result};
			res.setHeader('Content-Type', 'application/json');
			res.status(200).send(JSON.stringify(obj));
        }
    });
}

//Endpoint: http://127.0.0.1:5000/getcallcount
app.post('/getcallcount', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		var contract = web3.eth.contract(interface);
		var instance = contract.at(contractaddress);
		instance.getCallCount.call(function(err, result) {
			if(err) {
				console.log(err);
				var obj = {"callcount":"-1"};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			} else {
				console.log(result);
				var obj = {"callcount":result};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			}
		});
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/getmovecount
app.post('/getmovecount', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		var contract = web3.eth.contract(interface);
		var instance = contract.at(contractaddress);
		instance.getMoveCount.call(function(err, result) {
			if(err) {
				console.log(err);
				var obj = {"movecount":"-1"};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			} else {
				console.log(result);
				var obj = {"movecount":result};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			}
		});
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/startgroundtimestamp
app.post('/startgroundtimestamp', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		var contract = web3.eth.contract(interface);
		var instance = contract.at(contractaddress);
		instance.startGroundTimeStamp.call(function(err, result) {
			if(err) {
				console.log(err);
				var obj = {"startgroundtimestamp":"-1"};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			} else {
				console.log(result);
				var obj = {"startgroundtimestamp":convertDateTime(result)};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			}
		});
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/endgroundtimestamp
app.post('/endgroundtimestamp', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		var contract = web3.eth.contract(interface);
		var instance = contract.at(contractaddress);
		instance.endGroundTimeStamp.call(function(err, result) {
			if(err) {
				console.log(err);
				var obj = {"endgroundtimestamp":"-1"};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			} else {
				console.log(result);
				var obj = {"endgroundtimestamp":convertDateTime(result)};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			}
		});
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

//Endpoint: http://127.0.0.1:5000/calltimestamp
app.post('/calltimestamp', function (req,res) {
	if (typeof req.body.contractaddress !== 'undefined'){
		var contractaddress = req.body.contractaddress;
		var at = req.body.at;
		var contract = web3.eth.contract(interface);
		var instance = contract.at(contractaddress);
		instance.callTimeStamp(0).call(function(err, result) {
			if(err) {
				console.log(err);
				var obj = {"calltimestamp":"-1"};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			} else {
				console.log(result);
				var obj = {"calltimestamp":convertDateTime(result)};
				res.setHeader('Content-Type', 'application/json');
				res.status(200).send(JSON.stringify(obj));
			}
		});
	}
	else {
		res.setHeader('Content-Type', 'application/json');
    	res.status(400).send(JSON.stringify({'result' : 'error', 'msg' : 'Please fill in contract address'}));
	}	
});

function convertDateTime(datetime){
	var d2 = new Date();
	d2.setTime(datetime);
	return d2;
}