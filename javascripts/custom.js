var main = function () {

  $(".input-button").click(function () {
    
    //get x number of tweets and append to airport array...  count, wait
    
    //when you have x number then go to airport display
    
  	$("div#demo_step2").textAnimation({
  	    mode:"step",
  	    minsize:20,            //minimum font size[integer]
  	    maxsize:60,            //maximum font size[integer]
  	    upper:false,           //is upper step? [boolean]
  	    fixed:"top",           //which fixed top or bottom ["top","bottom"]
  	    stuff:2.2,             //font stuff quantity[float]
  	    delay:200,             //delay for between charactors animation
  	    interval:0,            //interval for between animation
  	    duration:250          //animation duration
  	});    
    
            
    var terms = $(".input-text").val();
    
    //add function to split array based on spaces?
    
    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
  
        console.log(tweet.text);
        $("div#demo_step2").html(tweet.text, function() {
          console.log("here's the callback");
        });
        
      });    
    });
    
    
    
  });
};

$(document).ready(main);