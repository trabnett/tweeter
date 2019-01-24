$(document).ready(function() {



$("form textarea").on('keyup', function() {
    let currentLength = $(this).val().length;
    let charactersLeft = 140 - currentLength;
    if (charactersLeft < 0) {
      $(this).siblings(".counter").text(charactersLeft).css('color', 'red');
    } else {
        $(this).siblings(".counter").text(charactersLeft).css('color', 'black');
    }
});
























});