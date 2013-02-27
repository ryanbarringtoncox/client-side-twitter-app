var main = function () {

  "use strict";

  var $ = window.$,
    tweetCounter = 1,
    termsInEnglish = "",
    i = 1,
    twitter = new window.ctwitter.CTwitter();

  $(".input-button").click(function () {
    
    //get user input        
    var terms = $(".input-text").val();
    
    //convert to english for user feedback
    terms = terms.split(" ");
    
    for (i; i <= terms.length; i = i+1) {
      termsInEnglish += ("'" + terms[i-1] + "'");
      if (i !== terms.length) {
        termsInEnglish += " or ";
      }
    }
    
    //slide up user-input div, change h2 text
    $("#user-input").slideUp();
    $("h2").html("Tweets containing " + termsInEnglish);
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
        
        //diff animation color for tweets
        var shine = "#FF0000";
        if (tweetCounter%2 === 0) {
          shine = "#FFD700";
        }
         if (tweetCounter%3 === 0) {
          shine = "#34D0BA";
        }       
        
        //append tweet text
        $("#results").append("<div class='tweet tweet-" + tweetCounter + "'>" + tweet.text + "</div>");
                
        //apply animation
        $(".tweet-"+tweetCounter).textAnimation({
            mode: "highlight",
            baseColor: "#111111",
            highlightColor: shine,
            repeat: false 
          });     
        
        //slide away the old tweets
        if (tweetCounter > 14) {
          $(".tweet:first").slideUp("slow", function() {
            $(this).remove();
          });
        }  
          
        tweetCounter = tweetCounter+1;  
      });    
    });   
  });
};

window.$(document).ready(main);