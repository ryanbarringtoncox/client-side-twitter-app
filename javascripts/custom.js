function delayedRemoval() {
  timeoutID = window.setTimeout(removeTweetDiv, 4000);
}

function removeTweetDiv() {
   $("#tweet").remove();
}

var main = function () {

  $(".input-button").click(function () {
    
    //get user input        
    var terms = $(".input-text").val()
    
    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
        
        //append tweet text in a div
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