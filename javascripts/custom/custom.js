var main = function () {

  $(".input-button").click(function () {
    
    //get user input        
    var terms = $(".input-text").val()
    
    //slide up user-input div
    $("#user-input").slideUp();
    
    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
        
        //remove results div if exists
        $("#tweet").remove();
        
        //append tweet text in a di
        $("#results").append("<div id='tweet'>" + tweet.text + "</div>");
                
        //apply animation
        $("#tweet").textAnimation({
            mode:"highlight",
            minsize: 20
          });     
        
        //wait for animation... the remove tweet div
        //delayedRemoval();      
      });    
    })   
  });
};

$(document).ready(main);