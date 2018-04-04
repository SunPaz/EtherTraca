var currentAccount = "";
var bindedContract = [];
var knownHash = [];
var preferences;

function accountUpdate(account)
{
	if(currentAccount != account)
	{
		currentAccount = account;

		if(typeof account == 'undefined')
		{
			toast("Please unlock account");
			$("#main").load("./views/locked.html")
			$("#navbarNavAltMarkup").find("#cntAsAccount").text("User : Locked");
			return;
		}
		else
			$("#main").load("./views/main.html")

		provider.eth.defaultAccount = account;
		$("#navbarNavAltMarkup").find("#cntAsAccount").text("User : " + account.substring(0, 10) + "[...]");
		reloadPreference();
	}
}

function startDapp(provider) {
	if (!provider.isConnected()) {
		toast("Not connected")
		//Metamask needed 
		$('#main').replaceWith('<div><a href="https://metamask.io/"><img src="./img/metamask-required.png" /></a></div>');
		return;
	}

	//Account refresh
	setInterval(() => {
	web3.eth.getAccounts((err, accounts) => {
		console.log("Refresh account ...");
		if (err) return
		accountUpdate(accounts[0]);
	})
	}, 3000);	

        provider.sendAsync = Web3.providers.HttpProvider.prototype.send;
}

function reloadPreference()
{
	toast("Reloading preferences...");
	getUserPreference(currentAccount);
}


function toast(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function generateHash() {
	let codeToHash = $("#strToHash").val();
	let hashed = keccak256(codeToHash);
	knownHash.push({hash: hashed, plain:codeToHash});
	console.log(knownHash);
}