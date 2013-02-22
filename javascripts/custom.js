function delayedRemoval() {
  timeoutID = window.setTimeout(removeTweetDiv, 5000);
}

function removeTweetDiv() {
   $("#tweet").remove();
}

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
        
        var tweet_array = tweet.text.split(" ");
        console.log(tweet_array);
        if (tweet_array.length > 15) {
          console.log("Need to add line break");
          var slice1 = tweet_array.slice(0, 14);
          var slice1 = slice1.join(" ");
          var slice2 = tweet_array.slice(15, 99);
          var slice2 = slice2.join(" ");
          console.log(slice1 + "\n" + slice2);
          tweet.text = slice1 + "<br>" + slice2;
        }
        
        //remove results div if exists
        $("#tweet").remove();
        
        //append tweet text in a di
        $("#results").append("<div id='tweet'>" + tweet.text + "</div>");
         
        //console.log(tweet.text);
       
        //apply animation
        $("#tweet").textAnimation({
            mode:"step",
            minsize:22,   //minimum font size[integer]
            maxsize:22,   //maximum font size[integer]
            upper:false,  //is upper step? [boolean]
            fixed:"top",  //which fixed top or bottom ["top","bottom"]
            stuff:2.2,    //font stuff quantity[float]
            delay:20,     //delay for between charactors animation
            interval:0,   //interval for between animation
            duration:700  //animation duration
          });     
        
        //wait for animation... the remove tweet div
        delayedRemoval();      
      });    
    })   
  });
};

$(document).ready(main);