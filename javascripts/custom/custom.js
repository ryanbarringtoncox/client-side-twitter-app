var main = function () {

  $(".input-button").click(function () {
    
    var tweetCounter = 1;
    
    //get user input        
    var terms = $(".input-text").val()
    
    //slide up user-input div, change h2 text
    $("#user-input").slideUp();
    $("h2").html("Tweets containing '" + terms + "'");
    
    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
        
        //remove results div if exists
        $("#tweet").remove();
        
        //append tweet text in a di
        $("#results").append("<div class='tweet'>" + tweet.text + "</div>");
                
        //apply animation
        $(".tweet").textAnimation({
            mode:"highlight",
            baseColor:"#111111",
          });     
        
        if (tweetCounter > 12) {
          $(".tweet:first").slideUp("slow", function() {
            $(this).remove();
          })
        }  
          
        tweetCounter++;  
      });    
    })   
  });
};

$(document).ready(main);