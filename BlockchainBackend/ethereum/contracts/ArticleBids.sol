pragma solidity ^0.4.17;
// import "http://github.com/oraclize/ethereum-api/oraclizeAPI_0.4.sol";
// import "https://github.com/oraclize/ethereum-api/blob/master/oraclizeAPI_0.4.sol";

contract ArticleBids{

    struct Voter {
        address ad;
        uint bid;
    }
    struct Article {
        string url;
        uint upvotes;
        uint downvotes;
        Voter[] upvoters;
        Voter[] downvoters;
        int status;
    }
    struct PermArticle {
        string url;
    }
    event NewsEvent(
       string name
    );

    mapping(address => Voter) voters;
    Article[] articles;
    PermArticle[] perm_articles;
    uint count = 0;
    Article rahul;

    function getArticlesBids() returns (string response){
      if(count != articles.length){
        uint c = count;
        count+=1;
        return articles[c].url;
      }
      count = 0;
      return "bob";
    }
    function getArticlesSize() returns (uint response){
      return articles.length;
    }

    function getPermArticles() returns (string response){
        response = "";
        var delimeter = "~";
        var supersmash = "`";
        for (uint y = 0; y < perm_articles.length; y++){
            string memory num = bytes32ToString(bytes32(y));
            response = strConcat(response, num);
            response = strConcat(response, supersmash);
            response = strConcat(response, perm_articles[y].url);
            response = strConcat(response, delimeter);
        }
        return response;
    }

    function repopulate() returns(string response){
        string[] urls;
        urls[urls.length++] = "http://www.foxnews.com/entertainment/2018/03/10/nun-involved-in-katy-perry-convent-lawsuit-dies-after-court-collapse.html";
        urls[urls.length++] = "http://www.breitbart.com/big-government/2018/03/10/donald-trump-reveals-re-election-slogan-cant-say-make-america-great-already/";
        urls[urls.length++] = "https://www.infowars.com/cnn-reports-on-controversial-satanism-inside-clinton-campaign/#disqus_thread";
        for (uint a = 0; a < urls.length; a++){

            rahul.url = urls[a];
            articles[articles.length++] = rahul;
            NewsEvent("http://www.foxnews.com/entertainment/2018/03/10/nun-involved-in-katy-perry-convent-lawsuit-dies-after-court-collapse.html");
        }

        response = "Success!";
        return response;
    }

    function repopulate_perm(){
        string[] urls;
        urls.push("http://www.foxnews.com/entertainment/2018/03/10/nun-involved-in-katy-perry-convent-lawsuit-dies-after-court-collapse.html");
        urls.push("http://www.breitbart.com/big-government/2018/03/10/donald-trump-reveals-re-election-slogan-cant-say-make-america-great-already/");
        urls.push("https://www.infowars.com/cnn-reports-on-controversial-satanism-inside-clinton-campaign/#disqus_thread");
        for (uint a = 0; a < urls.length; a++){
            PermArticle asdf;
            asdf.url = urls[a];
            perm_articles.push(asdf);
        }
    }

    function clearPerm(){
        delete perm_articles;
    }

    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

    function bytes32ToString (bytes32 data) returns (string) {
        bytes memory bytesString = new bytes(32);
        for (uint j=0; j<32; j++) {
            byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[j] = char;
            }
        }
        return string(bytesString);
    }

    /*function callThisToStart(){
        oraclize_query(600, "URL", "");
    }

    function _callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        for(uint x = 0; x < articles.length; x++)
        {
            returnPayout(x);
            if (articles[x].status > 0){
                PermArticle temp;
                temp.url = articles[x].url;
                perm_articles.push(temp);
            }
        }
        delete articles;
        callThisToStart();
    }*/

    function expire(uint256 toArticle){
        for(uint x = 0; x < articles.length; x++)
        {
            returnPayout(x);
            if (articles[x].status > 0){
                PermArticle temp;
                temp.url = articles[x].url;
                perm_articles.push(temp);
            }
        }
        delete articles;
    }

    /// Create a new ballot with $(_numProposals) different proposals.
    function ArticleBids(uint8 _numProposals) public {
        // voters[chairperson].weight = 1;
        articles.length = _numProposals;
    }

    /// Give $(toVoter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    // function giveRightToVote(address toVoter) public {
    //     if (msg.sender != chairperson || voters[toVoter].voted) return;
    //     voters[toVoter].weight = 1;
    //
    /// Delegate your vote to the voter $(to).
    // function delegate(address to) public {
    //     Voter storage sender = voters[msg.sender]; // assigns reference
    //     if (sender.voted) return;
    //     while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
    //         to = voters[to].delegate;
    //     if (to == msg.sender) return;
    //     sender.voted = true;
    //     sender.delegate = to;
    //     Voter storage delegateTo = voters[to];
    //     if (delegateTo.voted)
    //         proposals[delegateTo.vote].voteCount += sender.weight;
    //     else
    //         delegateTo.weight += sender.weight;
    // }

    /// Give a single vote to proposal $(toProposal).
    function vote(uint256 toArticle, uint typ) public payable {
        //Voter storage sender = voters[msg.sender];

        if(articles.length-toArticle < 10)
        {
            articles.length += 10;
        }
        if(typ < 0)
        {
            articles[toArticle].downvotes += 1;
            Voter memory u;
            u.ad = msg.sender;
            u.bid = msg.value;
            articles[toArticle].downvoters[articles[toArticle].downvotes] = u;
        }
        else
        {
            articles[toArticle].upvotes +=1;
            Voter memory v;
            v.ad = msg.sender;
            v.bid = msg.value;
            articles[toArticle].upvoters[articles[toArticle].upvotes] = v;
        }
    }
    function returnPayout(uint256 toArticle) public payable {
        if(articles[toArticle].upvotes >= articles[toArticle].downvotes)
        {
            articles[toArticle].status = 1;
            uint tot = 0;
            for(uint j = 0; j < articles[toArticle].downvoters.length; j++)
            {
                tot+=(articles[toArticle].downvoters[j].bid);
            }
            uint winnings = tot/(articles[toArticle].downvoters.length);
            for(uint jj = 0; jj < articles[toArticle].upvoters.length; jj++)
            {
                articles[toArticle].upvoters[jj].ad.transfer(articles[toArticle].upvoters[jj].bid + winnings);
            }
        }
        else
        {
            articles[toArticle].status = -1;
            uint tott = 0;
            for(uint ii = 0; ii < articles[toArticle].upvoters.length; ii++)
            {
                tott+=(articles[toArticle].upvoters[ii].bid);
            }
            winnings = tott/(articles[toArticle].upvoters.length);
            for(uint iii = 0; iii < articles[toArticle].downvoters.length; iii++)
            {
                articles[toArticle].downvoters[iii].ad.transfer(articles[toArticle].downvoters[iii].bid + winnings);
            }
        }
    }

    // function winningProposal() public constant returns (uint8 _winningProposal) {
    //     uint256 winningVoteCount = 0;
    //     for (uint8 prop = 0; prop < proposals.length; prop++)
    //         if (proposals[prop].voteCount > winningVoteCount) {
    //             winningVoteCount = proposals[prop].voteCount;
    //             _winningProposal = prop;
    //         }
    // }
}
