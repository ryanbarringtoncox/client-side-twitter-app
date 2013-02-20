var main = function () {

  $(".input-button").click(function () {
    
    $("#results").airport([ 'does it work...', 'with whole long sentences?', '...and yet i wonder.' ]);
        
    var terms = $(".input-text").val();
    
    //add function to split array based on spaces?
    
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