var main = function() {
  
  $(".input-button").click(function() {
    console.log($(".input-text")[0].value);  
    //console.log($(".input-text").value);
  });
};

$(document).ready(function() {
  main();
});