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
function timeCalculator(timeSinceTweet) {
      time = "";
      switch (true) {
      case (timeSinceTweet < 3600000):
        time = Math.floor(timeSinceTweet / 60000) + " mins ago";
        break;
      case (timeSinceTweet < 7200000):
        time = "1 hour ago";
        break;
      case (timeSinceTweet < 604800000):
        time = Math.floor(timeSinceTweet / 3600000) + " hours ago";
        break;
      default:
        time = Math.floor(timeSinceTweet / 6048000000) + " weeks ago"
    }
    return time;
}

  function createTweetElement(data) {
    let timeSinceTweet = Date.now() - `${data['created_at']}`
    timeCalculator(timeSinceTweet)

    $('#mainTweetBody').prepend(`
    <section class="tweet">
      <article>
        <header>
          <img src=${escape(data['user']['avatars']['small'])}><p>${escape(data['user']['name'])}</p><span>${escape(data['user']['handle'])}</span>
        </header>
          <p>${escape(data['content']['text'])}</p>
        <footer>
          <p>${time}</p>
        </footer>
      </article>
    </section>`)
    let $tweet = $('<article>').addClass('tweet');
  };


  $( "form" ).submit(function( event ) {
    $('.noChar').hide();
    $('.tooMany').hide();
    event.preventDefault();
    let stringInput = $('form').serialize();
    if (stringInput.length > 5 && stringInput.length <= 145) {
      $.ajax('/tweets', {data: stringInput, method: 'POST' })
      .done((response) => {
        loadTweets();
      })
      .fail(() => {
        console.log('The call failed');
      })
    } else if (stringInput.length <= 5){
      $('.noChar').slideToggle(400, function () {
        $('this, textarea').select();
      });
    } else {
      $('.tooMany').slideToggle(400, function () {
        $('this, textarea').select();
      });
    }
    $('textarea').val('');
  })


  function loadTweets () {
    $('#mainTweetBody').empty()
    $.getJSON("/tweets", function(result){
      $.each(result, function(i, field){
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