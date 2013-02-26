var main = function () {

  $(".input-button").click(function () {
    
    var tweetCounter = 1;
    
    //get user input        
    var terms = $(".input-text").val()
    
    //convert to english for user feedback
    var termsInEnglish = "";
    var terms = terms.split(" ");
    
    for (var i = 1; i <= terms.length; i++) {
      termsInEnglish += ("'" + terms[i-1] + "'");
      if (i != terms.length) {
        termsInEnglish += " or ";
      }
    }
    
    //slide up user-input div, change h2 text
    $("#user-input").slideUp();
    $("h2").html("Tweets containing " + termsInEnglish);
    
    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
        
        //diff animation color for tweets
        var shine = "#FF0000";
        if (tweetCounter%2 == 0) {
          shine = "#FFD700";
        }
         if (tweetCounter%3 == 0) {
          shine = "#34D0BA";
        }       
        
        //append tweet text
        $("#results").append("<div class='tweet tweet-" + tweetCounter + "'>" + tweet.text + "</div>");
                
        //apply animation
        $(".tweet-"+tweetCounter).textAnimation({
            mode: "highlight",
            baseColor: "#111111",
            highlightColor: shine
          });     
        
        //slide away the old tweets
        if (tweetCounter > 14) {
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