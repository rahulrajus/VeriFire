var smart_contract = null;
var account_balance = null;
var coin_base = null;

var index = 0;
var arr = [];

var TOTAL_CALLBACKS = 4;
var numCallbacks = 0;
var finished = false;

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'static/contractAbi.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            checkCallback();
            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
    checkCallback();
    // Do Something with the response e.g.
    jsonresponse = JSON.parse(response);
    smart_contract = new web3.eth.Contract(jsonresponse, '0x2F48CEDFc92E116659329a9AA6a161f31d30e17C');
    console.log(smart_contract);
    smart_contract.events.NewsEvent({fromBlock: 0, toBlock: 'latest'}, function(error, event){ console.log(event); });
    smart_contract.methods.repopulate().call(function(error, result) {
        if (!error) {
            console.log(result);
        } else
            console.log(error);
        
    });
});

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/I7ZBA1Dyv6i1WLOGfndw"));
}
web3.eth.getCoinbase(function(err, cb) { 
    console.log(cb);
    coin_base = cb;
    checkCallback();
    web3.eth.getBalance(cb, function(e, bal){
        console.log(bal);
        account_balance = bal;
        checkCallback();
    });
});

function checkCallback()
{
  numCallbacks++;
  if(numCallbacks == TOTAL_CALLBACKS)
  {
      finished = true;
      $('#upvote-button').removeClass('is-loading')
      $('#downvote-button').removeClass('is-loading')
      console.log("ALL DONE!");
  }
}

//article
//type=1
function chooseUpVote()
{
    var id = 1;
    if(!$('#upvote-button').hasClass('is-loading')) {
        if(account_balance < 100000000000000000) {
            alert("You don't have enough Ether to vote!");
        } else {
            alert("You have enough Ether to vote!");
            // using the callback
            smart_contract.methods.vote(id, 1).call(function(error, transactionHash){
                console.log(transactionHash);
            });
            web3.eth.sendTransaction({
                from: coin_base,
                gas: 21000,
                gasPrice: 1000000000,
                to: smart_contract._address,
                value: '100000000000000000'
            })
            .then(function(receipt){
                console.log(receipt);
            });
        }
    }
}

//type=-1
function chooseDownVote()
{
    var id = 0;
    if(!$('#downvote-button').hasClass('is-loading')) {
        if(account_balance < 100000000000000000) {
            alert("You don't have enough Ether to vote!");
        } else {
            alert("You have enough Ether to vote!");
            smart_contract.methods.vote(id, -1).call(function(error, transactionHash){
                console.log(transactionHash);
            });
            web3.eth.sendTransaction({
                from: coin_base,
                gas: 21000,
                gasPrice: 1000000000,
                to: smart_contract._address,
                value: '100000000000000000'
            })
            .then(function(receipt){
                console.log(receipt);
            });
        }
    }
}

//smart_contract.once('resultEvent', {}, function(error, event){ console.log(event); });

function addProduct(productVariable){
    smart_contract.methods.getArticlesBids().call(function(error, result) {
        if (!error) {
            console.log(result);
            arr.push(result);
            addNextProduct();
        } else
             console.log(error);
    });
}
  
function addNextProduct()
{
      index++; 
      if(arr[index-1] != "bob")
        addProduct()
} 
  
   
//id,article,id,article
function getArticlesBids() 
{
    /*
    smart_contract.methods.getArticlesBids().call(function(error, result) {
        if (!error) {
            console.log(result);
        } else
            console.log(error);
    });
    */
    return ["http://www.foxnews.com/entertainment/2018/03/10/nun-involved-in-katy-perry-convent-lawsuit-dies-after-court-collapse.html",
    "http://www.breitbart.com/big-government/2018/03/10/donald-trump-reveals-re-election-slogan-cant-say-make-america-great-already/",
    "https://www.infowars.com/cnn-reports-on-controversial-satanism-inside-clinton-campaign/#disqus_thread"]
}

function getArticlesSize() 
{
    smart_contract.methods.getArticlesSize().call(function(error, result) {
        if (!error) {
            console.log(result);
        } else
            console.log(error);
    });
}

//id,article,id,article
function getPermArticles()
{
    smart_contract.methods.getPermArticles().call(function(error, result) {
        if (!error) {
            console.log(result);
        } else
             console.log(error);
    });
}