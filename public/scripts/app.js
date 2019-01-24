/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  function createTweetElement(data) {
    $('#mainTweetBody').prepend(`
      <section class="tweet">
        <article>
          <header>
            <img src=${escape(data['user']['avatars']['small'])}><p>${escape(data['user']['name'])}</p><span>${escape(data['user']['handle'])}</span>
          </header>
            <p>${escape(data['content']['text'])}</p>
          <footer>
            <p>${escape(data['created_at'])}</p>
          </footer>
        </article>
      </section>`)
      let $tweet = $('<article>').addClass('tweet');
  };


  $( "form" ).submit(function( event ) {
    $('.noChar').hide()
    $('.tooMany').hide()
    event.preventDefault();
    let stringInput = $('form').serialize()
    if (stringInput.length > 5 && stringInput.length <= 145) {
      $.ajax('/tweets', {data: stringInput, method: 'POST' })
      .done((response) => {
        console.log('posting new tweet from app.js--check')
        loadTweets()
      })
      .fail(() => {
        console.log('The call failed')
      })
    } else if (stringInput.length <= 5){
      $('.noChar').slideToggle(400, function () {
        $('this, textarea').select()
      });
    } else {
      $('.tooMany').slideToggle(400, function () {
        $('this, textarea').select()
      });
    }
    $('textarea').val('')
  })


  function loadTweets () {
    console.log('app.js load tweets-check')
    $('#mainTweetBody').empty()
    $.getJSON("/tweets", function(result){
      $.each(result, function(i, field){
        console.log("prepending-check")
        $("body").prepend(createTweetElement(field));
      });
    });
  };

  $("#nav-bar button").on('click', function() {
    $('.new-tweet').slideToggle(400, function () {
    $('this, textarea').select()
    });
  });



loadTweets()





// Test / driver code (temporary)
 // to see what it looks like
});