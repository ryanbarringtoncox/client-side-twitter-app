var main = function() {
  
  $(".input-button").click(function() {
    
    //console.log($(".input-text")[0].value); 
    
    var terms = $(".input-text")[0].value;

    //create ctwitter object
    var twitter = new ctwitter.CTwitter();
    
    //start the stream of tweets
    twitter.stream("statuses/filter", { lang:"en", track:[terms] }, function (stream) {
      stream.on("data", function (tweet) {
  
        console.log(tweet.text);
        
      });    
    });
  });
};

$(document).ready(main);