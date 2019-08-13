$(document).ready(function() {
  $("textarea").keydown( function(){
    let length = $(this).val().length;
    let chars = 140 - length;
   
    if(chars < 0){
      $(this).parent().children(".counter").removeClass("dark-text").addClass("red-text");
    }else{
      $(this).parent().children(".counter").removeClass("red-text").addClass("dark-text");
    }
  
   $(this).parent().children(".counter").html(chars);
  });
});